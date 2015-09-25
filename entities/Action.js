var Action = function (action) {
	this.name = action.name;
	this.func = action.func;
};
Action.prototype.execute = function (actor, reactor) {
	return this.func(actor, reactor);
};

module.exports = Action;