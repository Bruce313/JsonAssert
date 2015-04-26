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