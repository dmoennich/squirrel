var RandomElement = require("../common/RandomElement");
var Generator = function (personProvider, environmentProvider, eventProvider) {
	this.personProvider = personProvider;
	this.environmentProvider = environmentProvider;
	this.eventProvider = eventProvider;
};

Generator.prototype.createScene = function () {
	this.scene = {
		persons: this.personProvider.get(2),
		environment: this.environmentProvider.get(),
		events: this.eventProvider.get(2)
	};
	return "It's happening " + this.scene.environment.description;
};

Generator.prototype.doAction = function () {
	var actor = RandomElement(this.scene.persons),
		reactor = RandomElement(this.scene.persons),
		action = RandomElement(reactor.actions);
	return action.execute(actor, reactor);
};

Generator.prototype.doEvent = function () {
	var event = RandomElement(this.scene.events);
	var messages = [];
	messages.push(event.description + "!" + " (" + event.name + ")");
	this.scene.persons.forEach(function (person) {
		var msg = person.affectState(event);
		if (msg) {
			messages.push(msg);
		}
	});
	return messages;
};



module.exports = Generator;