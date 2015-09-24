var RandomElement = require("../common/RandomElement");
var Generator = function (personProvider, nonPersonProvider, environmentProvider,
		contentProvider) {

	this.personProvider = personProvider;
	this.nonPersonProvider = nonPersonProvider;
	this.environmentProvider = environmentProvider;
	this.contentProvider = contentProvider;
	this.createSetting();
};

Generator.prototype.createSetting = function () {
	this.setting = {
		persons: this.personProvider.get(2),
		environment: this.environmentProvider.get()
	};
};

Generator.prototype.createEvent = function () {
	var actor = RandomElement(this.setting.persons);
		reactor = RandomElement(this.setting.persons);
	var action = RandomElement(reactor.actions);
	var params = {};
	action.params.forEach(function (param) {
		params[param] = this.contentProvider.get(param);
	});
	action.execute(actor, reactor, params);
};



module.exports = Generator;