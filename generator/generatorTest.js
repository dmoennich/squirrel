var Generator = require("./Generator");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var SimpleEnvironmentProvider = require("../provider/SimpleEnvironmentProvider");
var EventProvider = require("../provider/EventProvider");

var generator = new Generator(new SimplePersonProvider(),
	new SimpleEnvironmentProvider(), new EventProvider());

// Play sequence
// new scene (describe env)
// 2 actions
// 1 event
// 2 actions


var delay = 2000;
var messages = [];

messages.push(generator.createScene());
messages.push(generator.doAction());
messages.push(generator.doAction());
messages = messages.concat(generator.doEvent());

console.log(messages);

var logMessages = function () {
	var msg = messages.shift();
	if (msg) {
		console.log(msg);
		if (messages.length) {
			setTimeout(logMessages, delay);
		}
	}
};

logMessages();








