var IdGenerator = require("../common/IdGenerator");

module.exports = {

	create: function (event) {
		var self = Object.create(this);
		self.id = IdGenerator();
		self.name = event.name;
		self.picUrl = event.picUrl || "/images/default_event.png";
		self.description = event.description;
		self.impactChance = event.impactChance;
		self.impactType = event.impactType;
		return self;
	},
	isAffecting: function () {
		return Math.random() * 100 <= this.impactChance;
	}

};
