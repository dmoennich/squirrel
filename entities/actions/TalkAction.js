var Action = require("../Action");
var MessageContentProvider = require("../MessageContentProvider")();

var talkActionObj = {
	name: "talk",
	func: function (actor, reactor) {
		var message = MessageContentProvider.get();
		return actor.name + " says to " + reactor.name + ": " + message;
	}
};

module.exports = new Action (talkActionObj);