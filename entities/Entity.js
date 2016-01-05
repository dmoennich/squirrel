var RandomElement = require("../common/RandomElement"),
	IdGenerator = require("../common/IdGenerator"),
	EventImpactTypes = require("./EventImpactTypes");

module.exports = {

	create: function (spec) {
		var entity = Object.create(this);
		entity.id = IdGenerator();
		entity.name = spec.name;
		entity.actions = spec.actions;
		entity.states = spec.states;
		entity.picUrl = spec.picUrl || this.getDefaultPicUrl();
		entity.setRandomState();
		return entity;
	},

	getDefaultPicUrl: function () {
		var picUrls = [
			"/images/default_actor.gif",
			"/images/default_actor2.gif",
			"/images/default_actor3.png",
			"/images/default_actor5.png"
		];
		return RandomElement.get(picUrls);
	},


	setRandomState: function () {
		var randomType = RandomElement.get(Object.keys(this.states));
		this.currentState = RandomElement.get(this.states[randomType]);
	},

	affectState: function (event) {
		var oldState = this.currentState;
		if (event.isAffecting()) {
			this.currentState = RandomElement.get(this.states[event.impactType]);
		}
		if (oldState !== this.currentState) {
			return "The " + event.name + " made " + this.name + " " + this.currentState;
		}
	}

};
