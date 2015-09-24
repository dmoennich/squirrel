var Action = require("../Action");

var talkActionObj = {
	name: "talk",
	params: ["message"],
	func: function (actionObj) {
		console.log(actionObj.actor.name +
			" says to " + actionObj.reactor.name + ": " + actionObj.params.message);
	}
};

module.exports = new Action (talkActionObj);