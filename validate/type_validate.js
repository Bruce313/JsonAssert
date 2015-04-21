var is = require("../node_modules/is_js");

exports.isNum = is.number;
exports.isInt = function (data) {
    if(is.number(data)) {
        return (data.toString().indexOf(".") < 0);
    }
    return false;
};

exports.isString = is.string;

exports.isFloat = function (data) {
    if(is.number(data)) {
        return (data.toString().indexOf(".") > -1);
    }
    return false;
};