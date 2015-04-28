var Rule = require("./rule");

var inherit = require("../_util").inherit;

function ArrayRule (config) {
    Rule.call(this, config);

    var parse = require("../parse").parse;

    if (config.self) {
        this.selfRule = parse(config.self);
        this.addRule(this.selfRule);
    }
    if (config.ele) {
        this.elementRule = parse(config.ele);
        this.addRule(this.elementRule);
    }

    this.eleIndexRules = {};

    if (config.eleIndex) {
        Object.keys(config.eleIndex).forEach(function (k) {
            this.eleIndexRules[k] = parse(config.elIndex[k]);
            this.addRule(this.eleIndexRules[k]);
        }, this);
    }
}
inherit(ArrayRule, Rule);
ArrayRule.prototype.go = function(data) {
    this.data = data;
    this.selfRule && this.selfRule.go(data);
    this.elementRule && data.forEach(function (el) { this.elementRule.go(el);});
    
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