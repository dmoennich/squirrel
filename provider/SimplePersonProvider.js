var Person = require("../entities/Person");
var Action = require("../entities/Action");
var talkAction = require("../entities/actions/TalkAction");
var RandomElement = require("../common/RandomElement");
var SimplePersonProvider = function () {
	this.personObjs = [
		{name: "Jim", gender: "male"},
		{name: "Harry", gender: "male"},
		{name: "Jane", gender: "female"},
		{name: "Carol", gender: "female"}
	];

	this.personActions = [talkAction];
};
SimplePersonProvider.prototype.get = function (personCount) {
	var randomPersObj = RandomElement(this.personObjs),
		personArr = [];

	randomPersObj.actions = this.personActions;
	if (!personCount) {
		personCount = 1;
	}
	while (personCount) {
		randomPersObj = RandomElement(this.personObjs);
		randomPersObj.actions = this.personActions;
		personArr.push(new Person(randomPersObj));
		personCount -= 1;
	}
	return personArr.length === 1 ? personArr[0] : personArr;
};

module.exports = SimplePersonProvider;




