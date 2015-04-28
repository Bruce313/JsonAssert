
var same = function (what) {
    return function (data) {
        return data === what;
    };
};

var like = function (reg) {
    return function (data) {
       return reg.test(data);
    };
};

var isIn = function () {
    return function (data) {
        var isIn = false;
        for (var i=0, len=arguments.length; i<len; i++) {
            if (arguments[i] === data) {
                isIn = true;
            }
        }
        return isIn;
    };
};

var len = function (com, num) {
    num = parseInt(num);
    return arrLen(com, num);
};

/* obj validate factory S */
//obj contain some keys
var contain = function () {
    var argu = arguments;
    return function (data) {
        return Array.prototype.reduce.call(argu, function (p, c) {
            return p && (c in data);
        }, true);
    };
};

//object two key value, compare


/*obj validate factory E */


/* array validate factory S */
//array len 
var arrLen = function (com, len) {
    if (com == ">") {
        return function (data){
            return data.length > len;
        }
    }
    if (com == "<") {
        return function (data) {
            return data.length < len;
        }
    }
    if (com == ">=") {
        return function (data){
            return data.length >= len;
        }
    }
    if (com == "<=") {
        return function (data) {
            return data.length <= len;
        }
    }
    if (com == "==") {
        return function (data){
            return data.length == len;
        }
    }
    if (com == "!=") {
        return function (data) {
            return data.length != len;
        }
    }
};

/*array validate factory E */
var factoryMap = {
    "contain": contain,
    "=": same,
    "like": like,
    "arrLen": arrLen,
    "len": len,
    "in": isIn
};

module.exports = function () {
    var str = arguments[0];
    var fact = factoryMap[str];
    return fact ? fact.apply(null, Array.prototype.slice.call(arguments, 1)) : null;
};