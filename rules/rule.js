var uuid = require("node-uuid");

function Rule (config, onComplete) {
    this.id = uuid.v4();

    this.name = config.name;
    this.onComplete = onComplete || function () {
        console.warn(this.name, " complete but no one care");
    };

    this.resultMap = {};
}
Rule.prototype.collectResult = function(id, result, data, rule) {
    this.resultMap[id] = {
        result: result,
        data: data,
        rule: rule
    };
    if (result === false) {
        console.error("Rule: ( %s ) failed, data:%s", rule.name, data);
    } else {
    	console.info("Rule: ( %s ) passed", rule.name);
    }
    var map = this.resultMap;
    if (Object.keys(map).reduce(function (p, c) {
        return !!map[p] && !!map[c];
    })) {
        this.onComplete(id, this.reduceResult(), this.data, this);
    }
};

Rule.prototype.reduceResult = function () {
    var self = this;
    return Object.keys(this.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(function (p, c) {
        return p && c;
    });
};

exports = module.exports = Rule;

var empRule = function () {};
empRule.prototype = Rule.prototype;

exports.AbstractRule = empRule;

