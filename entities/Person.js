var Entity = require("./Entity");

var Person = function (person) {
	Entity.call(this, person);
	this.gender = person.gender;
};
Person.prototype = Object.create(Entity.prototype);
Person.prototype.constructor = Person;

module.exports = Person;