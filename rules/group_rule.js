var Rule = require("./rule");
//@abstract
function GroupRule (config, onComplete) {
    var self = this;
    Rule.call(this. config, onComplete);

    var parse = require("../parse").parse;
    this.rules = config.map(function (c) {
        return parse(c, self.collectResult.bind(self), id);
    }).forEach(function (r) {
        self.resultMap[r.id] = null;
    });
}
GroupRule.prototype.go = function(data) {
    this.rules.forEach(function (r) {
        r.go(data);
    });
};

function AndGroupRule (config, onComplete, id, parse) {
    GroupRule.call(this, config, onComplete, id);
}
AndGroupRule.prototype = new GroupRule();

function OrGroupRule (config, onComplete, id, parse) {
    GroupRule.call(this, config, onComplete, id);  
}
OrGroupRule.prototype = new GroupRule();
OrGroupRule.prototype.reduceResult = function() {
    var self = this;
    return Object.keys(self.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(functon (p, c) {
        return p || c;
    });
};

function NotGroupRule (config, onComplete, id, parse) {
    GroupRule.call(this, config, onComplete, id);
}
NotGroupRule.prototype = new GroupRule();
NotGroupRule.prototype.reduceResult = function() {
      return !Object.keys(self.resultMap).map(function (k) {
        return self.resultMap[k].result;
    }).reduce(functon (p, c) {
        return p || c;
    });
};




var GroupRuleFactory = function (config, onComplete, id, parse) {
    var logic = config[0];
    if (logic in ["&", "|", "!"]) {
        var conf = config.slice(1);
        return (logic == "&") ? new AndGroupRule(conf, onComplete, id, parse) :
            (logic == "|") ? new OrGroupRule(conf, onComplete, id, parse) : 
            new NotGroupRule(conf, onComplete, id, parse);
    }
    return new AndGroupRule(config, onComplete, id, parse);
}

module.exports = GroupRuleFactory;