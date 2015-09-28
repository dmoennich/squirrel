var RandomElement = require("../common/RandomElement");
var IdGenerator = require("../common/IdGenerator");
var EventImpactTypes = require("./EventImpactTypes");


var getDefaultPicUrl = function () {

	var picUrls = [
		"/images/default_actor.gif",
		"/images/default_actor2.gif",
		"/images/default_actor3.png",
		"/images/default_actor5.png"
	];

	return RandomElement(picUrls);
};


var Entity = function (entity) {
	this.id = IdGenerator();
	this.name = entity.name;
	this.actions = entity.actions;
	this.states = entity.states;
	this.picUrl = entity.picUrl || getDefaultPicUrl();
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

