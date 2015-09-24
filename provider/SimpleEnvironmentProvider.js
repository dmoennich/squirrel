var Environment = require("../entitites/Environment");
var RandomElement = require("../common/RandomElement");

var SimpleEnvironmentProvider = function () {
	this.envObjs = [
		{name: "kitchen", description: "a totally ordinary kitchen"},
		{name: "forrest", desription: "three trees and some flowers"}
	];
};
SimpleEnvironmentProvider.prototype.get = function () {
	var randomEnvObj = RandomElement(this.envObjs);
	return new Environment(randomEnvObj);
};

module.exports = SimpleEnvironmentProvider;