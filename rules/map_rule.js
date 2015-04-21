//var Rule = require("./rule");
var SingleRule = require("./single_rule");

var uuid = require("../node_modules/node-uuid");


function MapRule (config, onComplete, id) {
    this.id = id;
    this.resultMap = {};
    this.result = true;

    this.name = config.name;
    this.onComplete = onComplete || function () {
        console.warn(this.name, "complete, with result:", arguments, ", but no one care");
    }
    //Rule.apply(this, name);
    //config: self  prop
    var idSelf = uuid.v4();
    this.selfRules = new SingleRule(config.self, this.collectResult, idSelf);
    this.selfRules.onComplete = this.collectResult.bind(this);
    //propRules map<string, Rule>
    this.propRules = {};
    Object.keys(config.prop).forEach(function (k) {
        var idProp = uuid.v4();
        this.propRules[k] = new SingleRule(config.prop[k], this.collectResult, idProp);
        this.propRules[k].onComplete = this.collectResult.bind(this);
    }, this);
}

MapRule.prototype.go = function(data) {
    this.data = data;
    this.selfRules.go(data);
    this.resultMap[this.selfRules.id] = false;
    Object.keys(data).forEach(function (k) {
        var pr = this.propRules[k];
        pr.go(data[k]);
        this.resultMap[pr.id] = false;
    }, this);
};

MapRule.prototype.collectResult = function(id, result, data, rule) {
    this.result = this.result && result;
    if (result === false) {
        console.log("fial", result);
    }
    var map = this.resultMap;
    map[id] = true;
    if (Object.keys(this.resultMap).reduce(function (p, c) {
        return map[p] && map[c];
    })) {
        this.onComplete(id, this.result, this.data, this);
    }
};

module.exports = MapRule;