var parser = require("../parse");
var fs = require("fs");

var mapRule = parser.parse("./map_rule.json");

fs.readFile("map_rule_data.json", {encoding: "utf8"}, function (err, data) {
    var obj = JSON.parse(data);
    mapRule.go(obj);
});