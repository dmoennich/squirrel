var RandomElement = require("../common/RandomElement");
var MessageContentProvider = function () {

};

MessageContentProvider.prototype.get = function (keyword) {
	return RandomElement(["It's very hot today.", "The fox jumps over the fence.", "My car needs new tires."]);
};


module.exports = function () {
	return new MessageContentProvider();
};