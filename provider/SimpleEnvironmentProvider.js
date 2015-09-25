var Environment = require("../entities/Environment");
var RandomElement = require("../common/RandomElement");

var SimpleEnvironmentProvider = function () {
	this.envObjs = [
		{name: "kitchen", description: "in a totally ordinary kitchen"},
		{name: "forrest", description: "between three trees"}
	];
};
SimpleEnvironmentProvider.prototype.get = function () {
	var randomEnvObj = RandomElement(this.envObjs);
	return new Environment(randomEnvObj);
};

module.exports = SimpleEnvironmentProvider;