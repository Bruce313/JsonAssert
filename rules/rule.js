var Event = require("events").EventEmitter;
var uuid = require("node-uuid");
var mixin = require("../_util.js").mixin;


function Rule (config) {
    mixin(this, Event);
    this.id = uuid.v4();

    this.name = config.name;
    this.onComplete = onComplete || function () {
        console.warn(this.name, " complete but no one care");
    };

    this.resultMap = {};
}
//stack {[Stack]}
Rule.prototype.collectResult = function(id, result, errors, name) {
    var self = this;
    this.resultMap[id] = {
        result: result,
        errors: errors,
        name: name
    };
    var map = this.resultMap;
    if (Object.keys(map).reduce(function (p, c) {
        return !!map[p] && !!map[c];
    })) {
        if (this.reduceResult()) {
            this.emit("pass", this.data, this.name);
        } else {
            var errors = Object.keys(self.resultMap)
            .map(function (k) {return self.resultMap[k]})
            .filter(function(res) {return !res.result;})
            .map(function(res) {return res.errors;});
            var thisErr = {
                id: this.id,
                name: this.name,
                data: this.data,
                errors: errors
            };

            this.emit("fail", this.id, thisErr, this.name);
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

