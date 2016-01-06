var action = require("../Action");
var MessageContentProvider = require("../../provider/MessageContentProvider");

var talkActionObj = {
	name: "talk",
	func: function (actor, reactor) {
		var message = MessageContentProvider.get();
		return "Hey " + reactor.name + ", " + message;
	}
};

module.exports = action.create(talkActionObj);