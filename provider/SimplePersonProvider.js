var Person = require("../entities/Person");
var Action = require("../entities/Action");
var talkAction = require("../entities/actions/TalkAction");
var RandomElement = require("../common/RandomElement");


var personObjs = [
	{name: "Jim", gender: "male"},
	{name: "Harry", gender: "male"},
	{name: "Jane", gender: "female"},
	{name: "Carol", gender: "female"},
	{name: "John", gender: "male"},
	{name: "Daniel", gender: "male"},
	{name: "Elliot", gender: "male"},
	{name: "Mickey", gender: "male"},
	{name: "James", gender: "male"},
	{name: "Lars", gender: "male"},
	{name: "Billy", gender: "male"},
	{name: "Jack", gender: "male"},
	{name: "Lori", gender: "female"},
	{name: "Briget", gender: "female"},
	{name: "Nathalie", gender: "female"},
	{name: "Crystal", gender: "female"}
];

var states = {
	positive: ["happy", "interested", "excited"],
	negative: ["bored", "tired", "nervous", "scared"],
	neutral: ["paralized", "easy", "in stand by mode"]
};

var SimplePersonProvider = function () {
	this.personObjs = personObjs;
	this.personActions = [talkAction];
	this.states = states;
};
SimplePersonProvider.prototype.get = function (personCount) {
	var randomPersObj,
		personArr = [];

	if (!personCount) {
		personCount = 1;
	}
	while (personCount) {
		randomPersObj = RandomElement(this.personObjs);
		randomPersObj.actions = this.personActions;
		randomPersObj.states = this.states;
		personArr.push(new Person(randomPersObj));
		personCount -= 1;
	}
	return personArr.length === 1 ? personArr[0] : personArr;
};

module.exports = SimplePersonProvider;




