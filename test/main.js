var parse = require("../parse").parse;
var fs = require("fs");
var _util = require("../_util");

var mapRule = parse("file map_rule.json");
mapRule.on("fail", function(id, errors, name) {
    _util.printErrorTree(errors);
});

fs.readFile("map_rule_data.json", {encoding: "utf8"}, function (err, data) {
    var obj = JSON.parse(data);
    mapRule.go(obj);
});
