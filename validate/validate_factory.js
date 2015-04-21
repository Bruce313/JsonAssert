
exports.same = function (what) {
    return new Rule("is ===", function (data) {
        return data === what;
    });
};

exports.like = function (reg) {
    return new Rule(reg.toString() + ".test(data)", reg.test);
};

exports.contain = function () {
    var argu = arguments;
    return function (data) {
        return Array.prototype.reduce.call(argu, function (p, c) {
            return p && (c in data);
        }, true);
    }
}