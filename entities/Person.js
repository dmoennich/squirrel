var entity = require("./Entity"),
	person = Object.create(entity);

person.create = function (spec) {
	var self = entity.create.call(this, spec);
	self.gender = spec.gender;
	return self;
};

module.exports = person;