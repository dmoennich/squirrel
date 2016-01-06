var RandomElement = require("../common/RandomElement");
var event = require("../entities/Event");
var EventImpactTypes = require("../entities/EventImpactTypes");

var eventTemplates = [
	{
		name: "Tornado",
		description: "A tornado comes around the corner",
		impactChance: 90,
		impactType: EventImpactTypes.negative
	},
	{
		name: "Rain",
		description: "It's starting to rain. And we thought it couldn't get worse",
		impactChance: 70,
		impactType: EventImpactTypes.positive
	},
	{
		name: "Touch Down",
		description: "Touch down, yeah, yeah, yeah",
		impactChance: 90,
		impactType: EventImpactTypes.positive
	}
];


var createEvent = function () {
	return event.create(RandomElement.get(eventTemplates));
};


module.exports = {

	get: function (eventCount) {
		var events = [],
			eventCount = eventCount || 1;
		while (eventCount > 0) {
			events.push(createEvent());
			eventCount -= 1;
		}
		return events.length === 1 ? events[0] : events;
	}

};


