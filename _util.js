var console = require("better-console");
exports.trim = function (str) {
    return str.replace(/^\s+|\s$/, "");
};

exports.split = function (str, char) {
    var ch = char || " ";
    return str.split(ch).map(function (s) {
        return exports.trim(s);
    })
};

exports.inherit = function (sub, sup) {
	var emp = function () {};
	emp.prototype = sup.prototype;
	sub.prototype = new emp();
};

exports.mixin = function (context, constructor) {
    var trait = new constructor(Array.prototype.slice(arguments, 2));
    for (var k in trait) {
        context[k] = trait[k];
    }
};

//errors: {
// id
// name
// errors || errMsg
//}
exports.printErrorTree = function (errors, offset) {
    offset = offset || 0;
    var prefix = "";
    for (var i = 0; i < offset; i++ ) {
        prefix = prefix + "\t";
    }
    var name = errors.name;
    var errs = errors.errors;
    if (errs) {
        console.error(prefix, name + " fails, becauseof:");
        offset++;
        errs.forEach(function (e) {
            exports.printErrorTree(e, offset);
        });
        return;
    }
    if (errors.errMsg) {
        console.error(prefix, name + " fails, becauseof:", errors.errMsg);
        return;
    }
    throw new Error("illegal errors for printErrorTree");
};
