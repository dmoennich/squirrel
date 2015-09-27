var EventImpactTypes = require("./EventImpactTypes");
var IdGenerator = require("../common/IdGenerator");

var Event = function (event) {
	this.id = IdGenerator();
	this.name = event.name;
	this.picUrl = event.picUrl || "/images/default_event.png";
	this.description = event.description;
	this.impactChance = event.impactChance;
	this.impactType = event.impactType;

};
Event.prototype.isAffecting = function () {
	return Math.random() * 100 <= this.impactChance;
};

module.exports = Event;