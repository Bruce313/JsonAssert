function Rule (name, validate, id) {
	this.name = name;
	this.validate = validate || function () {
		console.log("rule " + this.name + " seem to be an empty rule")
	}
	this.id = id;
	//TODO:random id
}

Rule.prototype.validate = function(first_argument) {
	return this.validate(data);
};
