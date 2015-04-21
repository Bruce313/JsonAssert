var typeValidates = require("./type_validate");
var validateFactory = require("./validate_factory");

var getValidate = function (valiName) {
    var paras = valiName.split(" ");
    //TODO: trim
    if (paras.length === 1) {
        return validateMap[arguments[0]];
    }
    return getValidateFromFactory.apply(null, paras);
};

var getValidateFromFactory = function () {
    var str = arguments[0];
    var validateFactory = factoryMap[str];
    return validateFactory.apply(null, Array.prototype.slice.call(arguments, 1));
};

var validateMap = {
    "s": typeValidates.isString,
    "n": typeValidates.isNum,
    "int": typeValidates.isInt,
    "float": typeValidates.isFloat
};

var factoryMap = {
    "contain": validateFactory.contain
};

exports.validateManager = {
    getValidate: getValidate
};
