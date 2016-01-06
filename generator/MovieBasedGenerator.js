var imdb = require("../datasources/imdb.datasource");
var dand = require("../datasources/dandelion.datasource");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var simplePersonProvider = new SimplePersonProvider();
var eventProvider = require("../provider/EventProvider");
var imgScraper = new (require("images-scraper")).Bing();
var Promise = require("bluebird");
var randomElement = require("../common/RandomElement");


module.exports = function () {

	var generator = {};


	generator.getImageUrl = function (keyword) {
		var numImages = 10,
			randImage = Math.round(Math.random() * (numImages - 1));

		return imgScraper.list({
			keyword: keyword,
			num: numImages,
			detail: false
		}).then(function (res) {
			return res[randImage].url;
		});
	};


	generator.loadAllPicUrls = function (scene) {

		var promise = Promise.resolve();

		// background
		promise = promise.then(function () {
			return generator.getImageUrl(scene.environment.name + " background");
		}).then(function (bkgPicUrl) {
			scene.environment.picUrl = bkgPicUrl;
		});

		// all events
		scene.playSteps.forEach(function (playStep) {
			if (playStep.type === "event") {
				promise = promise.then(function () {
					return generator.getImageUrl(playStep.entity.name);
				}).then(function (eventPicUrl) {
					playStep.entity.picUrl = eventPicUrl;
				});
			}
		});

		return promise;
	};


	generator.createMessageAction = function (actor, message, scene) {
		generator.addPlayStep({
			type: "action",
			entity: null,
			actor: actor,
			reactor: null,
			message: message
		}, scene);
	};

	generator.createEvent = function (anEvent, scene) {
		if (!anEvent) {
			return;
		}
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
		generator.addPlayStep({
			type: "event",
			entity: event,
			affectedActors: affectedActors,
			messages: messages
		}, scene);
	};


	generator.addPlayStep = function (playStepObj, scene) {
		scene.playSteps.push(playStepObj);
	};

	generator.initScene = function (movieTitle) {
		return {
			title: movieTitle,
			persons: [],
			playSteps: []
		};
	};


	generator.createActors = function (characters, scene) {
		for (var character in characters) {
			var actor = simplePersonProvider.get();
			actor.name = character;
			scene.persons.push(actor);
			characters[character] = actor;
		}
	};


	generator.createScene = function (movieTitle) {

		var scene = generator.initScene(movieTitle);

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
			var place = randomElement.remove(places) || {name: "the kitchen"};
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
				selectedQuotes.push(randomElement.remove(quotes));
			}
			selectedQuotes.forEach(function (quote) {
				for (var character in quote.characters) {
					charactersFromQuotes[character] = 1;
				}
			});
		}).then(function () {

			generator.createActors(charactersFromQuotes, scene);

			console.log("selectedQuotes", selectedQuotes);

			// put all together
			selectedQuotes.forEach(function (quote, index) {
				//console.log("selected quote:", JSON.stringify(quote, null, 4));
				quote.lines.forEach(function (line) {
					var actor = charactersFromQuotes[line.character];
					generator.createMessageAction(actor, line.message, scene);
				});

				if (index < selectedQuotes.length - 1) {
					generator.createEvent(randomElement.remove(events), scene);
				}

			});

			return generator.loadAllPicUrls(scene);
		}).then(function () {
			return scene;
		});

	};


	return generator;
};


