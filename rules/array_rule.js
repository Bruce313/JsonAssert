var Rule = require("./rule");
var validateManager = require("../validate").validateManager;

function ArrayRule (config, onComplete, id) {
    // Rule.call(this, name);
    //TODO: mv name id on complete to supclass Rule
    this.name = config.name;
    this.id = id;
    this.onComplete = onComplete || function () {
        console.warn(this.name, " complete but no one care");
    };

    this.resultMap = {};

    this.selfRules = validateManager.getValidate(config.self);
    this.elementRules = validateManager.getValidate(config.el);
    this.elIndexRules = {};
    Object.keys(config.elIndex).forEach(function (k) {
        this.elIndexRules[k] = validateManager.getValidate(config.elIndex[k]);
    }, this);
}
ArrayRule.prototype.go = function(data) {
    // body...
};
ArrayRule.prototype.collectResult = function(result) {
    // body...
};