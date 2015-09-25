var Generator = require("./Generator");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var SimpleEnvironmentProvider = require("../provider/SimpleEnvironmentProvider");
var EventProvider = require("../provider/EventProvider");

var generator = new Generator(new SimplePersonProvider(),
	new SimpleEnvironmentProvider(), new EventProvider());


generator.createScene();
generator.doAction();
generator.doAction();
generator.doEvent();


console.log("It's happening " + generator.scene.environment.description);

generator.scene.playSteps.forEach(function (step) {

	switch (step.type) {

		case "action":
			console.log(step.message);
			break;
		case "event":
			console.log(step.entity.description + "! (" + step.entity.name + ")");
			step.messages.forEach(function (msg) {
				console.log(msg);
			});
			break;
		default:
			throw new Error("Unknown playstep type " + step.type);

	}

});






