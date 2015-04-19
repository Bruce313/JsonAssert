var Rule = require("./rule.js");

exports.FactoryRuleIs = function (what) {
    return new Rule("is ===", function (data) {
        return data === what;
    });
};

exports.FactoryRuleLike = function (reg) {
    return new Rule(reg.toString() + ".test(data)", reg.test);
};