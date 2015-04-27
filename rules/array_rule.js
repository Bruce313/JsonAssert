var Rule = require("./rule");
var AbstractRule = Rule.AbstractRule;

function ArrayRule (config) {
    Rule.call(this, config);

    var parse = require("../parse").parse;
    this.selfRule = parse(config.self);
    this.elementRule = parse(config.ele);
    this.selfRule.on("fail", this.collectResult.bind(this));
    this.elementRule.on("fail", this.collectResult.bind(this));

    this.resultMap[this.selfRule.id] = this.resultMap[this.elementRule.id] = null;
    this.eleIndexRules = {};
    Object.keys(config.elIndex).forEach(function (k) {
        this.eleIndexRules[k] = parse(config.elIndex[k]);
        this.eleIndexRules[k].on("fail", this.collectResult.bind(this));
        this.resultMap[eleIndexId] = null;
    }, this);
}
ArrayRule.prototype = new AbstractRule();
ArrayRule.prototype.go = function(data) {
    this.data = data;
    this.selfRule.go(data);
    data.forEach(function (el) { this.elementRule.go(el);});
    Object.keys(this.eleIndexRules).forEach(function (k) {
        var index = parseInt(k);
        this.eleIndexRules[k].go(data[index]);
    });
};
ArrayRule.prototype.reduceResult = function () {
    var self = this;
    return Object.keys(this.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(function (p, c) {
        return p && c;
    });
};

module.exports = ArrayRule;