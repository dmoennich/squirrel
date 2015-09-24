var Generator = require("./Generator");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var SimpleEnvironmentProvider = require("../provider/SimpleEnvironmentProvider");

var generator = new Generator(new SimplePersonProvider(), new SimpleEnvironmentProvider());

var counter = 10;
var delay = 2000;

var f = function () {
	generator.createEvent();
	counter += 1;
	if (counter < 10) {
		setTimeout(f, delay);
	}
};
setTimeout(f, delay);
