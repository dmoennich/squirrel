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
	positive: ["happy", "interested", "excited",
"understanding", "great", "playful", "calm",
"confident", "courageous","peaceful","reliable",
"joyous","energetic","at ease","easy","lucky",
"liberated","comfortable","amazed","fortunate",
"optimistic","pleased","free","delighted","provocative",
"encouraged","sympathetic","overjoyed","impulsive",
"clever","interested","gleeful","free","surprised",
"satisfied","thankful","frisky","content","receptive","important",
"animated","quiet","accepting","festive","spirited","certain","kind",
"ecstatic","thrilled","relaxed","satisfied","wonderful","serene","glad",
"free and easy","cheerful","bright","sunny","blessed","merry","reassured",
"elated","jubilant","loving","concerned","eager","impulsive","considerate",
"affected","keen","free","affectionate","fascinated","earnest","sure","sensitive",
"intrigued","intent","certain","tender","absorbed","anxious","rebellious","devoted",
"inquisitive","inspired","unique"],
	negative: ["bored", "tired", "nervous", "scared",
"irritated","lousy","upset","incapable","enraged",
"disappointed","doubtful","alone","hostile","discouraged",
"uncertain","paralyzed","insulting","ashamed","indecisive",
"fatigued","sore","powerless","perplexed","useless","annoyed",
"diminished","embarrassed","inferior","upset","guilty","hesitant",
"vulnerable","hateful","dissatisfied","shy","empty","unpleasant",
"miserable","stupefied","forced","offensive","detestable",
"disillusioned","hesitant","bitter","repugnant","unbelieving",
"despair","aggressive","despicable","skeptical","frustrated",
"resentful","disgusting","distrustful","distressed","inflamed"],
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




