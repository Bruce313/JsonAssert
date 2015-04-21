//@abstract
function RuleCon (config, onComplete) {
    this.rules = [];
}

RuleCon.prototype.bindData = function(data) {
};

RuleCon.prototype.assert = function() {
    this.rules.forEach(function (r) {
        r.go();
    });    
};
RuleCon.prototype.collectResult = function(first_argument) {
};