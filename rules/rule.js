var Event = require("events").EventEmitter;
var uuid = require("node-uuid");
var mixin = require("../_util.js").mixin;


function Rule (config) {
    mixin(this, Event);
    this.id = uuid.v4();

    this.name = config.name;

    this.resultMap = {};
}
//stack {[Stack]}
Rule.prototype.handleFail = function(id, errors, name) {
    this.collectResult(id, false, errors, name);
};
Rule.prototype.handlePass = function(id, data, name) {
    this.collectResult(id, true, data, name);
};
Rule.prototype.collectResult = function(id, result, errors, name) {
    var self = this;
    this.resultMap[id] = {
    	id: id,
        result: result,
        errors: errors,
        name: name
    };
    var map = this.resultMap;
    if (Object.keys(map).reduce(function (p, c) {
        return p && (!!map[c]);
    }, true)) {
        if (this.reduceResult()) {
            this.emit("pass", this.data, this.name);
        } else {
            var errs = Object.keys(self.resultMap)
            .map(function (k) {return self.resultMap[k]})
            .filter(function(res) {return !res.result;})
            .map(function(res) {return res.errors;});
            var thisErr = {
                id: this.id,
                name: this.name,
                data: this.data,
                errors: errs
            };
            this.emit("fail", this.id, thisErr, this.name);
        }
    }
};

Rule.prototype.reduceResult = function () {
    var self = this;
    return Object.keys(self.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(function (p, c) {
        return p && c;
    });
};
Rule.prototype.addRule = function() {
    Array.prototype.forEach.call(arguments, function (r) {
        r.on("pass", this.handlePass.bind(this));
        r.on("fail", this.handleFail.bind(this));
        this.resultMap[r.id] = null;
    }, this);
};

exports = module.exports = Rule;
