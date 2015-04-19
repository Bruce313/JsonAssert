var is = require("is_js");


export.ruleNum = new Rule("is Number", is.number);

export.ruleInt = new Rule("is Interger", function (data) {
	if(is.number(data)) {
		return (data.toString().indexOf(".") < 0);
	}
	return false;
});