var typeValidates = require("./type_validate");
var validateFactory = require("./validate_factory");
var split = require("../_util").split;


//config
// string: 
//      1. "s" - simple simple, just valiname
//      2. "contain a b c" - if params all string, take this for shorthand
// object:
//      1. name
//      2. params:array - not all string
//      
var getValidate = function (config) {
    if ( config instanceof Object) {
        return validateFactory.apply(null, config.name, 
            Object.keys(config)
            .filter(function (k) {
                return k != "name";
            })
            .map(function (k) {
                return config[k];
            }));
    }
    var paras = split(config);
    if (paras.length === 1) {
        return validateMap[arguments[0]];
    }
    return validateFactory.apply(null, paras);
};



var validateMap = {
    "s": typeValidates.isString,
    "n": typeValidates.isNum,
    "int": typeValidates.isInt,
    "float": typeValidates.isFloat
};



exports.getValidate = getValidate;
