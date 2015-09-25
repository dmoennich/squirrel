var RandomElement = require("../common/RandomElement");
var Event = require("../entities/Event");
var EventImpactTypes = require("../entities/EventImpactTypes");


var events = [];
events.push(new Event({
	name: "Tornado",
	description: "A tornado comes around the corner.",
	impactChance: 99,
	impactType: EventImpactTypes.negative
}));
events.push(new Event({
	name: "Rain",
	description: "And I thought it couldn't get worse.",
	impactChance: 77,
	impactType: EventImpactTypes.negative
}));
events.push(new Event({
	name: "Touch Down",
	description: "Yeah Yeah Yeah",
	impactChance: 99,
	impactType: EventImpactTypes.positive
}));


var EventProvider = function () {
	this.events = events;
};

EventProvider.prototype.get = function (eventCount) {
	var events = [];
	while (eventCount > 0) {
		events.push(RandomElement(this.events));
		eventCount -= 1;
	}
	return events.length === 1 ? events[0] : events;
};

module.exports = EventProvider;


