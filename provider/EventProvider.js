var RandomElement = require("../common/RandomElement");
var Event = require("../entities/Event");
var EventImpactTypes = require("../entities/EventImpactTypes");


var events = [];
events.push(new Event({
	name: "Tornado",
	description: "A tornado comes around the corner",
	impactChance: 90,
	impactType: EventImpactTypes.negative
}));
events.push(new Event({
	name: "Rain",
	description: "It's starting to rain. And we thought it couldn't get worse",
	impactChance: 70,
	impactType: EventImpactTypes.positive
}));
events.push(new Event({
	name: "Touch Down",
	description: "Touch down, yeah, yeah, yeah",
	impactChance: 90,
	impactType: EventImpactTypes.positive
}));


var EventProvider = function () {
	this.events = events;
};

EventProvider.prototype.create = function () {
	var event = new Event({
		name: "defaultEvent",
		description: "It's starting to rain. And we thought it couldn't get worse",
		impactChance: 70,
		impactType: EventImpactTypes.positive
	});
	return event;
};

EventProvider.prototype.get = function (eventCount) {
	var events = [];
	eventCount = eventCount || 1;
	while (eventCount > 0) {
		events.push(RandomElement.get(this.events));
		eventCount -= 1;
	}
	return events.length === 1 ? events[0] : events;
};

module.exports = EventProvider;


