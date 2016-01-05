var environment = require("../entities/Environment");
var RandomElement = require("../common/RandomElement");

var SimpleEnvironmentProvider = function () {
	this.envObjs = [
		{name: "kitchen", description: "in a totally ordinary kitchen", picUrl: "/images/kitchen.jpg"},
		{name: "forrest", description: "between three trees"}
	];
};
SimpleEnvironmentProvider.prototype.get = function () {
	var randomEnvObj = RandomElement.get(this.envObjs);
	return environment.create(randomEnvObj);
};

module.exports = SimpleEnvironmentProvider;