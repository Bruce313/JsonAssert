var Rule = require("./rule");

function ArrayRule (config, onComplete) {
    Rule.call(this, config, onComplete);

    var parse = require("../parse").parse;
    this.selfRule = parse(config.self, this.collectResult.bind(this));
    this.elementRule = parse(config.ele, this.collectResult.bind(this));
    this.resultMap[this.selfRule.id] = this.resultMap[this.elementRule.id] = null;
    this.eleIndexRules = {};
    Object.keys(config.elIndex).forEach(function (k) {
        var eleIndexId = uuid.v4();
        this.eleIndexRules[k] = parse(config.elIndex[k], this.collectResult.bind(this), eleIndexId);
        this.resultMap[eleIndexId] = null;
    }, this);
}
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