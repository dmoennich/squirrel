var RandomElement = require("../common/RandomElement");
var PlayStep = require("../entities/PlayStep");
var Generator = function (personProvider, environmentProvider, eventProvider) {
	this.personProvider = personProvider;
	this.environmentProvider = environmentProvider;
	this.eventProvider = eventProvider;
	this.scene = {};
};

Generator.prototype.createScene = function (numOfActors) {
	numOfActors = numOfActors || 3;
	this.scene = {
		persons: this.personProvider.get(numOfActors),
		environment: this.environmentProvider.get(),
		playSteps: []
	};
};

Generator.prototype.doAction = function () {
	var actor = RandomElement(this.scene.persons),
		reactor = RandomElement(this.scene.persons),
		action = RandomElement(reactor.actions);
	var message = action.execute(actor, reactor);
	addPlayStep.call(this, {
		type: "action",
		entity: action,
		actor: actor,
		reactor: reactor,
		message: message
	});
};

var addPlayStep = function (playStepObj) {
	this.scene.playSteps.push(new PlayStep(playStepObj));
};

Generator.prototype.doEvent = function () {
	var event = this.eventProvider.get();
	var affectedActors = [];
	var messages = [];
	this.scene.persons.forEach(function (person) {
		var msg = person.affectState(event);
		if (msg) {
			messages.push(msg);
			affectedActors.push(person);
		}
	});
	addPlayStep.call(this, {
		type: "event",
		entity: event,
		affectedActors: affectedActors,
		messages: messages
	});
};



module.exports = Generator;