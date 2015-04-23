var ruleParser = require("../parse");

function GroupRule (config, onComplete, id) {
 //0: and, 1: or, 2:not
    var l = config[0];
    var logic = null;
    var conf = null;
    if (l in ["|", "&", "!"]) {
        logic = l=="&" ? 0 : l == "|" ? 1 : 2;
        conf = config.slice(1);
    } else {
        logic = 0;
        conf = config;
    }

    this.createCollectResult(logic);
}

function AndGroupRule (config, onComplete, id) {

}
function OrGroupRule (config, onComplete, id) {
    
}
function NotGroupRule (config, onComplete, id) {

}

GroupRule.prototype.init = function(config) {
     this.rules = config.map(ruleParser);
};

var GroupRuleFactory = function (config, onComplete, id) {
    var logic = config[0];
    if (logic in ["&", "|", "!"]) {
        var conf = config.slice(1);
        return (logic == "&") ? new AndGroupRule(conf, onComplete, id) :
            (logic == "|") ? new OrGroupRule(conf, onComplete, id) : 
            new NotGroupRule(conf, onComplete, id);
    }
    return new AndGroupRule(config, onComplete, id);
}