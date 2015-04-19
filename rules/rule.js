//basic rule
//validate:  function (data, callback:function (result:boolean, data, rule) )
//note: if give a sync func, this func must have on param only
function Rule (name, validate, onComplete, id) {
	this.name = name;
    this.onComplete = onComplete || function () {
        console.log("rule: " + this.name + " complete, but on one care");
    };
	this.validate = validate || function () {
		console.log("rule: " + this.name + " seems to be an empty rule")
	};
	this.id = id;
	//TODO:random id

    //suport sync
    if (validate.length == 1) {
        this.go = function (data) {
            var res = this.validate(data);
            this.onComplete(res, data, this);
        }
    } else {
        //async
        this.go = function (data) {
            this.validate(data, callback);
        }
    }
}



module.exports = Rule;
