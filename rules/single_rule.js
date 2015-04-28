var Rule = require("./rule");
var inherit = require("../_util").inherit;
var validateManager = require("../validate").validateManager;

//basic rule
//validate:  function (data, callback:function (result:boolean, data, rule) )
//note: if give a sync func, this func must have on param only
//config {string}
function SingleRule (config) {
	Rule.call(this, config);
    this.name = config;
    var validate = validateManager.getValidate(config);
    if (validate == null) {
        throw new Error("unimplemented rule:" + config);
    }
    //suport sync
    if (validate.length == 1) {
        this.go = function (data) {
            this.data = data;
            var result = validate(data);
            if(result === true) {
                this.emit("pass", this.id, this.data, this.name);
            } else {
                var err = {
                    id: this.id,
                    name: this.name,
                    errMsg: result || (this.data + " not match rule:" + this.name)
                };
                this.emit("fail", this.id, err, config);
            }
        };
    } else {
        //async
        this.go = function (data) {
            this.data = data;
            this.resultMap["result"] = null;
            validate(data, this.collectResult);
        };
    }
}

SingleRule.prototype.collectResult = function(result, errMsg) {
    if (result) {
        this.emit("pass", this.id, this.data, this.name);
    } else {
        var err = {
            id: this.id,
            name: this.name,
            errMsg: errMsg || (this.data + " not match rule:" + this.name)
        };
        this.emit("fail", this.id, err, this.name);
    }
};

inherit(SingleRule, Rule);

module.exports = SingleRule;
