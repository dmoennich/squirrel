var RandomElement = require("../common/RandomElement");

var messages = [
	"It's very hot today.",
	"The fox jumps over the fence.",
	"My car needs new tires.",
	"The sky looks so blue today.",
	"You look like how I'm feeling today.",
	"I think I forgot my mac charger in the other room"
];

module.exports = {

	get: function () {
		return RandomElement.get(messages);
	}

};
