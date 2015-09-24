var Action = function (action) {
	this.name = action.name;
	this.params = action.params;
	this.func = action.func;
};
Action.prototype.execute = function (actor, reactor, params) {
	return this.func({
		actor: actor,
		reactor: reactor,
		params: params
	});
};

module.exports = Action;