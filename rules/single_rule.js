var validateManager = require("../validate").validateManager;

//basic rule
//validate:  function (data, callback:function (result:boolean, data, rule) )
//note: if give a sync func, this func must have on param only
//config {string}
function SingleRule (config, onComplete, id) {
	this.name = config;
    this.result = true;
    this.onComplete = onComplete || function () {
        console.log("rule: " + this.name + " complete, but on one care");
    };
	this.validate = validateManager.getValidate(config);
	this.id = id;
	//TODO:random id
    //suport sync
    if (this.validate.length == 1) {
        this.go = function (data) {
            this.data = data;
            this.result = this.validate(data);
            this.onComplete(this.id, this.result, this.data, this);
        };
    } else {
        //async
        this.go = function (data) {
            this.data = data;
            this.validate(data, this.collectResult);
        };
    }
}

SingleRule.prototype.collectResult = function(result) {
    this.result = result;
    this.onComplete(this.id, this.result, this.data, this);
};



module.exports = SingleRule;
