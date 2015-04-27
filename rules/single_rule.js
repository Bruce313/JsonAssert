var Rule = require("./rule");
var AbstractRule = Rule.AbstractRule;
var validateManager = require("../validate").validateManager;

//basic rule
//validate:  function (data, callback:function (result:boolean, data, rule) )
//note: if give a sync func, this func must have on param only
//config {string}
function SingleRule (config, onComplete) {
	Rule.call(this, config, onComplete);
    this.name = config;
	var validate = validateManager.getValidate(config);
    //suport sync
    if (validate.length == 1) {
        this.go = function (data) {
            this.data = data;
            var result = validate(data);
            if(result) {
                this.emit("pass", this.data, this.name);
            } else {
                this.emit("fail", this.id, result, data, config);
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

SingleRule.prototype = new AbstractRule();

SingleRule.prototype.reduceResult = function() {
    return this.resultMap.result.result;
};


module.exports = SingleRule;
