var rules = require("../rules");
var _util = require("../_util");
var MapRule = rules.MapRule;
var ArrayRule = rules.ArrayRule;
var SingleRule = rules.SingleRule;
var GroupRuleFactory = rules.GroupRuleFactory;


var format = require("util").format;
var fs = require("fs");
// command: string, array, 'file filename'

//TODO:remove id
//XXX: remove onComplete, add method: listen 'onComplete' and bind listener in it
var parse = function (command) {
    //console.log("begin parse: command:%s", command);
    if (typeof command === "string") {
        var isFile = (_util.split(command)[0] === "file");
        if (isFile) {
            return parseFile(command);
        }
        return new SingleRule(command);
    }
    if (command instanceof Array) {
        return GroupRuleFactory(command);
    }
};
var parseFile = function (command) {
    //delay error handle
    //define own errors
    //console.log("parse file, command:", command);
    var len = command.split(" ");
    if (len.length < 2) {
        new SyntaxError(util.format("command: %s, filename required", command));
        return;
    }
    var fileName = len[1];
    var fileContent = fs.readFileSync(fileName, {encoding: "utf8"});
    
    var config = JSON.parse(fileContent);
    //file rule types: basic, group, object, array
    //basic: {command:String}
    //group: {rule:Rule}
    //object: {self:Rule, prop:Map<String, Rule>}
    //array: {self:Rule, ele:Rule, eleIndex:Map<int, Rule>}
    var type = config.type;
    switch (type) {
        case "basic":
            return new SingleRule(config);
        case "group":
            return GroupRuleFactory(config);
        case "array":
            return new ArrayRule(config);
        case "object":
            return new MapRule(config);
    }
};

exports.parse = parse;