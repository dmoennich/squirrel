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


console.log("It's happening " + generator.scene.environment);


console.log(messages);




