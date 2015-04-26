var Rule = require("./rule");
var AbstractRule = Rule.AbstractRule;
var uuid = require("node-uuid");

function MapRule (config, onComplete) {
    
    Rule.call(this, config, onComplete);

    var parse = require("../parse").parse;//require at this point to avoid circle dependency
    this.selfRule = parse(config.self, this.collectResult.bind(this));
    this.resultMap[this.selfRule.id] = null;

    this.propRules = {};
    Object.keys(config.prop).forEach(function (k) {
        var pr = parse(config.prop[k], this.collectResult.bind(this));
        this.propRules[k] = pr;
        this.resultMap[pr.id] = null;
    }, this);
}

MapRule.prototype = new AbstractRule();

MapRule.prototype.go = function(data) {
    this.data = data;
    this.selfRule.go(data);
    this.resultMap[this.selfRule.id] = null;
    Object.keys(data).forEach(function (k) {
        var pr = this.propRules[k];
        pr.go(data[k]);
        this.resultMap[pr.id] = null;
    }, this);
};



module.exports = MapRule;