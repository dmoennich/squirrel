var imdb = require("../datasources/imdb.datasource");
var dand = require("../datasources/dandelion.datasource");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var simplePersonProvider = new SimplePersonProvider();
var PlayStep = require("../entities/PlayStep");
var EventProvider = require("../provider/EventProvider");
var eventProvider = new EventProvider();
var googleImg = require("google-images");
var Promise = require("bluebird");

var getImageUrl = function (keyword) {
	var randPage = Math.round(Math.random() * 5);
	return new Promise(function (resolve, reject) {
		googleImg.search({
			page: randPage,
			for: keyword,
			callback: function (error, images) {
				if (error) {
					reject("ERROR:" + error);
				}
				var randomImage = removeRandomElement(images);
				console.log("loaded pic:", randomImage.url);
				resolve(randomImage.url);
			}
		});
	});
};


var loadAllPicUrls = function (scene) {

	var promise = Promise.resolve();

	// background
	promise = promise.then(function () {
		return getImageUrl(scene.environment.name + " background");
	}).then(function (bkgPicUrl) {
		scene.environment.picUrl = bkgPicUrl;
	});

	// all events
	scene.playSteps.forEach(function (playStep) {
		if (playStep.type === "event") {
			promise = promise.then(function () {
				return getImageUrl(playStep.entity.name);
			}).then(function (eventPicUrl) {
				playStep.entity.picUrl = eventPicUrl;
			});
		}
	});

	// all actors
	// scene.persons.forEach(function (person) {
	// 	promise = promise.then(function () {
	// 		return getImageUrl(person.name);
	// 	}).then(function (picUrl) {
	// 		person.picUrl = picUrl;
	// 	});
	// });

	return promise;
};


var removeRandomElement = function (array) {
	if (!array.length) {
		return;
	}
	var randomIndex = Math.round(Math.random() * (array.length - 1));
	return array.splice(randomIndex, 1)[0];
};


var createMessageAction = function (actor, message, scene) {
	addPlayStep({
		type: "action",
		entity: null,
		actor: actor,
		reactor: null,
		message: message
	}, scene);
};

var createEvent = function (anEvent, scene) {
	var event = eventProvider.get();
	event.name = anEvent.name;
	event.description = anEvent.name;
	event.picUrl = anEvent.picUrl;
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
	}, scene);
};


var addPlayStep = function (playStepObj, scene) {
	scene.playSteps.push(new PlayStep(playStepObj));
};

var initScene = function () {
	return {
		persons: [],
		playSteps: []
	};
};


var createActors = function (characters, scene) {
	for (var character in characters) {
		var actor = simplePersonProvider.get();
		actor.name = character;
		scene.persons.push(actor);
		characters[character] = actor;
	}
};


var createScene = function (movieTitle) {

	var scene = initScene();

	var charactersFromQuotes = {};
	var selectedQuotes = [];
	var synopsis;
	var events;

	return imdb.getSynopsis(movieTitle)
	.then(function (receivedSynopsis) {
		synopsis = receivedSynopsis;
		return dand.getEntities(receivedSynopsis);
	}).then(function (entities) {
		var places = dand.getPlaces(entities);
		var place = removeRandomElement(places);
		events = dand.getEvents(entities);
		scene.environment = {
			name: place.name,
			description: place.name,
			picUrl: "/images/kitchen.jpg"
		};
		return imdb.getMovieQuotes(movieTitle);
	}).then(function (quotes) {
		var numberConv = 3;
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

		createActors(charactersFromQuotes, scene);

		console.log("selectedQuotes", selectedQuotes);

		// put all together
		selectedQuotes.forEach(function (quote, index) {
			//console.log("selected quote:", JSON.stringify(quote, null, 4));
			quote.lines.forEach(function (line) {
				var actor = charactersFromQuotes[line.character];
				createMessageAction(actor, line.message, scene);
			});

			if (index < selectedQuotes.length - 1) {
				createEvent(removeRandomElement(events), scene);
			}

		});

		return loadAllPicUrls(scene);
	}).then(function () {
		return scene;
	});


};



module.exports = {
	createScene: createScene
};

// createScene("Star Wars").then(function (scene) {
// 	console.log("The scene:", scene);
// });



