var Rule = require("./rule");
var uuid = require("node-uuid");

var inherit = require("../_util").inherit;

function MapRule (config) {
    
    Rule.call(this, config);

    var parse = require("../parse").parse;//require at this point to avoid circle dependency

    if (config.self) {
        this.selfRule = parse(config.self);
        this.addRule(this.selfRule);
    }

    this.propRules = {};
    if (config.prop) {
        Object.keys(config.prop).forEach(function (k) {
            var pr = parse(config.prop[k], this.collectResult.bind(this));
            this.propRules[k] = pr;
            this.addRule(pr);
        }, this);
    }
}

inherit(MapRule, Rule);

MapRule.prototype.go = function(data) {
    this.data = data;
    this.selfRule && this.selfRule.go(data);
    Object.keys(data).forEach(function (k) {
        var pr = this.propRules[k];
        if (pr) {
            pr.go(data[k]);
        }
    }, this);
};



module.exports = MapRule;