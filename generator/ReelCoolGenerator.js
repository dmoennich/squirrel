var SimplePersonProvider = require("../provider/SimplePersonProvider");
var simplePersonProvider = new SimplePersonProvider();
var PlayStep = require("../entities/PlayStep");
var EventProvider = require("../provider/EventProvider");
var eventProvider = new EventProvider();
var imgScraper = new (require("images-scraper")).Bing();
var Promise = require("bluebird");
var ReelCoolEntities = require("../reelcool/entities.js");

var getImageUrl = function (keyword) {
	var numImages = 10,
		randImage = Math.round(Math.random() * (numImages - 1));

	return imgScraper.list({
		keyword: keyword,
		num: numImages,
		detail: false,
		nightmare: {
			show: false
		}
	}).then(function (res) {
		return res[randImage].url;
	});
};


var loadAllPicUrls = function (scene) {

	var promise = Promise.resolve();

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

	return promise;
};


var removeRandomElement = function (array) {
	if (!array.length) {
		return;
	}
	var randomIndex = Math.round(Math.random() * (array.length - 1));
	var randEl = array.splice(randomIndex, 1)[0];
	return randEl;
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
	if (!anEvent) {
		return;
	}
	var event = eventProvider.create();
	event.name = anEvent;
	event.description = anEvent;
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

var initScene = function (movieTitle) {
	return {
		title: movieTitle,
		persons: [],
		playSteps: []
	};
};


var createActors = function (characters, scene) {
	var actors = {};
	characters.forEach (function (character) {
		var actor = simplePersonProvider.get();
		actor.name = character;
		scene.persons.push(actor);
		actors[character] = actor;
	});
	return actors;
};


var createScene = function () {

	var entities = new ReelCoolEntities(),
		movieTitle = entities.title,
		charactersFromQuotes = Object.keys(entities.quotes),
		intro = entities.intro,
		outro = entities.outro,
		place = entities.place,
		events = entities.events,
		quotes = entities.quotes,
		selectedQuotes = {},
		scene = initScene(movieTitle);

		scene.environment = {
			name: place.name,
			description: place.name,
			picUrl: removeRandomElement(entities.bkgUrls)
		};

		scene.audioUrl = "/audio/indi.mp3";

		var actors = createActors(charactersFromQuotes, scene);

		// correct gender for voices in FE
		actors["Kathy"].gender = "female";
		actors["Steve"].gender = "male";
		actors["Daniel"].gender = "male";
		actors["Cristina"].gender = "female";


		var presentSection = function (speaker) {
			createMessageAction(actors[speaker], quotes[speaker].startLine, scene);
			createMessageAction(
				actors[speaker],
				removeRandomElement(quotes[speaker].lines),
				scene
			);
			createMessageAction(actors[speaker], quotes[speaker].endLine, scene);
		};


		createMessageAction(actors["Kathy"], intro, scene);
		createEvent(removeRandomElement(events), scene);
		presentSection("Kathy");
		presentSection("Steve");
		createEvent(removeRandomElement(events), scene);
		presentSection("Daniel");
		presentSection("Cristina");
		createEvent(removeRandomElement(events), scene);
		createMessageAction(actors["Cristina"], outro, scene);


	return loadAllPicUrls(scene).then(function () {
		console.log("the scene:" , scene);
		return scene;
	});

};



module.exports = {
	createScene: createScene
};



