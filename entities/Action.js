//var Action = function (action) {
//	this.name = action.name;
//	this.func = action.func;
//};
//Action.prototype.execute = function (actor, reactor) {
//	return this.func(actor, reactor);
//};
//
//module.exports = Action;

// replacement for pseudo classical Action:
var action = {

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
module.exports = action;