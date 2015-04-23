var rules = require("../rules");
var MapRule = rules.MapRule;

var fs = require("fs");
// command: string, array, 'file filename'
var parse = function (command) {
    var isFile = (command.split(" ")[0] === "file");
    if (isFile) {
        return parseFile(command);
    }
    var assertStr = fs.readFileSync(filePath, {encoding: "utf8"});
    var config = JSON.parse(assertStr);
    switch(config.type) {
        case "object":
            return parseObject(config);
        case "array":
            return parseArray(config);
        case "basic":
            return parseBasic(config);
    }
};
var parseFile = function (command) {
    var len = command.split(" ");
    
    var fileName = 
};
var parseObject = function (config) {
    return new MapRule(config, function () {
        console.log("final", arguments);
    });
    // var self = config.self;
    // var ret = {};
    // if (self instanceof Array) {
    //     ret.self = parseRuleArray(self);
    // } else (self instanceof String) {
    //     ret.self = parseRuleString();
    // }
    // ret.prop = {};
    // for (var k i config.prop) {
    //     var rules = config.prop[k];
    // }
};

var parseRuleArray = function (arr) {
    var logic = arr
}

exports.parse = parse;