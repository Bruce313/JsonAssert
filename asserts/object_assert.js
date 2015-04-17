/** assert to object
 * @class
 * @param {array} - selfRules
 * @param {map} - propertyRules
 * @property {array} selfRules - rules assert to property
 * @property {map} propertyRules - rules assert to properties
 */
function ObjectAssert (srs, prs) {
    var srs = srs || [];
    var prs = prs || [];
    /**
     * @private
     */
    this.selfRules = [];
    /**
     * @private
     */
    this.propertyRules = {};
    srs.forEach(this.addSelfRule, this);
    Object.keys(prs).forEach(function (k) {
        this.addPropertyRule(k, prs[k]);
    },this);
}

/**
 * add a rule to object self
 * @function 
 * @param {Rule} rule
 */
ObjectAssert.prototype.addSelfRule = function (rule) {
    if (rule instanceof Rule) {
        throw new TypeError("addSelfRule needs rule"); 
    }
    this.selfRules.push(rule);
};
ObjectAssert.prototype.addPropertyRule = function (rule) {
    if (rule instanceof Rule) {
        throw new TypeError("addPropertyRule needs rule"); 
    }
    this.propertyRules.push(rule);
};
/**
 */
ObjectAssert.prototype.assert = function (obj) {
};
