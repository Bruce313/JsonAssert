var Event = require("events").EventEmitter;
var uuid = require("node-uuid");
var mixin = require("../_util.js").mixin;


function Rule (config, onComplete) {
    mixin(this, Event);
    this.id = uuid.v4();

    this.name = config.name;
    this.onComplete = onComplete || function () {
        console.warn(this.name, " complete but no one care");
    };

    this.resultMap = {};
}
//stack {[Stack]}
Rule.prototype.collectResult = function(id, result, stacks, name) {
    var self = this;
    this.resultMap[id] = {
        result: result,
        stacks: stacks,
        name: name
    };
    var map = this.resultMap;
    if (Object.keys(map).reduce(function (p, c) {
        return !!map[p] && !!map[c];
    })) {
        if (this.reduceResult()) {
            this.emit("pass", this.data, this.name);
        } else {
            var stacks = Object.keys(self.resultMap)
            .map(function (k) {return self.resultMap[k]})
            .filter(function(res) {return !res.result;})
            .map(function(res) {return res.stacks;});

            this.emit("fail", this.id, stacks, this.name);
        }
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

