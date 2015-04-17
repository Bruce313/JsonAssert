var is = require("../node_modules/is_js");
var Assert = require("assert");
/** assert to object
 * @class
 * @param {array} srs - selfRules
 * @param {map} pas - propertyRules
 * @property {[ObjectRule]} selfRules - rules assert to property
 * @property {Map<String, [Assert]>} propertyRules - rules assert to properties
 */
function ObjectAssert (obj, srs, pas) {
    if(!is.object(obj)) {
        throw new TypeError("param obj of ObjectAssert must Object");
    }
    var srs = srs || [];
    var pas = pas || {};
    /**
     * @private
     */
    this.selfRules = [];
    /**
     * @private
     */
    this.propertyAsserts = {};

    Object.keys(data).forEach(function (k) {
        this.propertyAsserts[k] = [];
    }, this);

    srs.forEach(this.addSelfRule, this);
    Object.keys(pas).forEach(function (k) {
        this.addPropertyRule(k, pas[k]);
    }, this);
}

//extend from Assert
ObjectAssert.prototype = new Assert();

/**
 * add a rule to object self
 * @function 
 * @param {Rule} rule
 */

ObjectAssert.prototype.addSelfRule = function (rule) {
    //how to inherit a function and instanceof it
    if (!(rule instanceof Function)) {
        throw new TypeError("addSelfRule needs Rule"); 
    }
    this.selfRules.push(rule);
};
ObjectAssert.prototype.addPropertyRule = function (k, assert) {
    if (!(assert instanceof Assert)) {
        throw new TypeError("addPropertyAssert needs Assert"); 
    }
    if (!(k in this.obj)) {
        throw new Error("object to assert has no attribute" + k);
    }
    this.propertyAsserts[k].push(assert);
};
/**
 */
ObjectAssert.prototype.assert = function (obj) {
};
