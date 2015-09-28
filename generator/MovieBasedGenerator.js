var imdb = require("../datasources/imdb.datasource");
var dand = require("../datasources/dandelion.datasource");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var simplePersonProvider = new SimplePersonProvider();
var PlayStep = require("../entities/PlayStep");
var EventProvider = require("../provider/EventProvider");
var eventProvider = new EventProvider();

var scene;

var removeRandomElement = function (array) {
	if (!array.length) {
		return;
	}
	var randomIndex = Math.round(Math.random() * (array.length - 1));
	return array.splice(randomIndex, 1)[0];
};


var createMessageAction = function (actor, message) {
	addPlayStep({
		type: "action",
		entity: null,
		actor: actor,
		reactor: null,
		message: message
	});
};

var createEvent = function (anEvent) {
	var event = eventProvider.get();
	event.name = anEvent.name;
	event.description = anEvent.name;
	var affectedActors = [];
	var messages = [];
	scene.persons.forEach(function (person) {
		var msg = person.affectState(event);
		if (msg) {
			messages.push(msg);
			affectedActors.push(person);
		}
	});
	addPlayStep({
		type: "event",
		entity: event,
		affectedActors: affectedActors,
		messages: messages
	});
};


var addPlayStep = function (playStepObj) {
	scene.playSteps.push(new PlayStep(playStepObj));
};

var initScene = function () {
	scene = {
		persons: [],
		playSteps: []
	};
};


var createActors = function (characters) {
	for (var character in characters) {
		var actor = simplePersonProvider.get();
		actor.name = character;
		scene.persons.push(actor);
		characters[character] = actor;
	}
};


var createScene = function (movieTitle) {

	initScene();

	var charactersFromQuotes = {};
	var selectedQuotes = [];
	var synopsis;
	var events;

	return imdb.getSynopsis(movieTitle)
	.then(function (receivedSynopsis) {
		synopsis = receivedSynopsis;
		return dand.getEntities(receivedSynopsis);
		//return dand.getPlaces(synopsis);
	}).then(function (entities) {
		var places = dand.getPlaces(entities);
		var place = removeRandomElement(places);
		scene.environment = {
			name: place.name,
			description: place.name,
			picUrl: "/images/kitchen.jpg" // fetch from pic search
		};
		events = dand.getEvents(entities);
		return imdb.getMovieQuotes(movieTitle);
	}).then(function (quotes) {
		var numberConv = 3;
		//console.log("first quote", quotes[0]);
		numberConv = quotes.length < numberConv ? quotes.length : numberConv;
		for (var i = 0; i < numberConv; i++) {
			selectedQuotes.push(removeRandomElement(quotes));
		}
		selectedQuotes.forEach(function (quote) {
			for (var character in quote.characters) {
				charactersFromQuotes[character] = 1;
			}
		});
	}).then(function () {

		createActors(charactersFromQuotes);

		console.log("selectedQuotes", selectedQuotes);

		// put all together
		selectedQuotes.forEach(function (quote, index) {
			//console.log("selected quote:", JSON.stringify(quote, null, 4));
			quote.lines.forEach(function (line) {
				var actor = charactersFromQuotes[line.character];
				createMessageAction(actor, line.message);
			});

			if (index < selectedQuotes.length - 1) {
				createEvent(removeRandomElement(events));
			}

		});

		return scene;
	});


};



module.exports = {
	createScene: createScene
};

// createScene("Star Wars").then(function (scene) {
// 	console.log("The scene:", scene);
// });



