var is = require("is_js");
var Rule = require("./rule.js");


exports.ruleNum = new Rule("is Number", is.number);
exports.ruleInt = new Rule("is Interger", function (data) {
	if(is.number(data)) {
		return (data.toString().indexOf(".") < 0);
	}
	return false;
});

exports.ruleString = new Rule("is String", is.string);

exports.ruleFloat = new Rule("is Float", function (data) {
    if(is.number(data)) {
        return (data.toString().indexOf(".") > -1);
    }
    return false;
});



