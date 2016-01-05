module.exports = {

	create: function (spec) {
		var newAction = Object.create(this);
		newAction.name = spec.name;
		newAction.func = spec.func;
		return newAction;
	},

	execute: function (actor, reactor) {
		return this.func(actor, reactor);
	}

};