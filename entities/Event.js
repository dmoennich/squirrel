var EventImpactTypes = require("./EventImpactTypes");
var Event = function (event) {
	this.name = event.name;
	this.description = event.description;
	this.impactChance = event.impactChance;
	this.impactType = event.impactType;

};
Event.prototype.isAffecting = function () {
	return Math.random() * 100 <= this.impactChance;
};

module.exports = Event;