var Rule = require("./rule");
var inherit = require("../_util").inherit;
//@abstract
function GroupRule (config, onComplete) {
    var self = this;
    Rule.call(this, config);

    this.name = config.slice(1).join(" " + config[0] + " ");

    var parse = require("../parse").parse;
    this.rules = config.slice(1).map(function (c) {
        return parse(c, self.collectResult.bind(self));
    });
    this.addRule.apply(this, this.rules);
}
inherit(GroupRule, Rule);
GroupRule.prototype.go = function(data) {
    this.rules.forEach(function (r) {
        r.go(data);
    });
};

function AndGroupRule (config, onComplete) {
    GroupRule.call(this, config, onComplete);
}
inherit(AndGroupRule, GroupRule);

function OrGroupRule (config, onComplete) {
    GroupRule.call(this, config, onComplete);  
}
inherit(OrGroupRule, GroupRule);

OrGroupRule.prototype.reduceResult = function() {
    var self = this;
    return Object.keys(self.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(function (p, c) {
        return p || c;
    });
};

function NotGroupRule (config, onComplete) {
    GroupRule.call(this, config, onComplete);
}
inherit(NotGroupRule, GroupRule);
NotGroupRule.prototype.reduceResult = function() {
      return !Object.keys(self.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(function (p, c) {
        return p || c;
    });
};




var GroupRuleFactory = function (config) {
    var logic = config[0];
    if(logic === "|") {
        return new OrGroupRule(config);
    }
    if (logic === "!") {
        return new NotGroupRule(config);
    }
    if (logic === "&") {
        return new NotGroupRule(config);
    }
    return new AndGroupRule(["&"].concat(config));
}

module.exports = GroupRuleFactory;