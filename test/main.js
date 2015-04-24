var parse = require("../parse").parse;
var fs = require("fs");

var mapRule = parse("file map_rule.json", function(id, result, data, rule) {
    console.log("final", id, result, data);
}, 1);

fs.readFile("map_rule_data.json", {encoding: "utf8"}, function (err, data) {
    var obj = JSON.parse(data);
    mapRule.go(obj);
});
