var RandomElement = require("../common/RandomElement");
var EventImpactTypes = require("./EventImpactTypes");

var Entity = function (entity) {
	this.name = entity.name;
	this.actions = entity.actions;
	this.states = entity.states;
	this.setRandomState();
};
Entity.prototype.setRandomState = function (event) {
	var randomType = Math.ceil(Math.random() * 3);
	var stateMap = {
		1: EventImpactTypes.positive,
		2: EventImpactTypes.negative,
		3: EventImpactTypes.neutral
	};
	this.currentState = RandomElement(this.states[stateMap[randomType]]);
};
Entity.prototype.affectState = function (event) {
	var oldState = this.currentState;
	if (event.isAffecting()) {
		this.currentState = RandomElement(this.states[event.impactType]);
	}
	if (oldState !== this.currentState) {
		return "The " + event.name + " made " + this.name + " " + this.currentState;
	}
};
module.exports = Entity;