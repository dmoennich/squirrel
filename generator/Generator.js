var RandomElement = require("../common/RandomElement");
var Generator = function (personProvider, environmentProvider) {
	this.personProvider = personProvider;
	this.environmentProvider = environmentProvider;
	this.createScene();
};

Generator.prototype.createScene = function () {
	this.scene = {
		persons: this.personProvider.get(2),
		environment: this.environmentProvider.get()
	};
};

Generator.prototype.createEvent = function () {
	var actor = RandomElement(this.scene.persons);
		reactor = RandomElement(this.scene.persons);
	var action = RandomElement(reactor.actions);
	action.execute(actor, reactor);
};



module.exports = Generator;