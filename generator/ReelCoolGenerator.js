var SimplePersonProvider = require("../provider/SimplePersonProvider");
var simplePersonProvider = new SimplePersonProvider();
var PlayStep = require("../entities/PlayStep");
var EventProvider = require("../provider/EventProvider");
var eventProvider = new EventProvider();
var googleImg = require("google-images");
var Promise = require("bluebird");
var ReelCoolEntities = require("../reelcool/entities.js");

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
	// promise = promise.then(function () {
	// 	return getImageUrl(scene.environment.name + " background");
	// }).then(function (bkgPicUrl) {
	// 	scene.environment.picUrl = bkgPicUrl;
	// });

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

		// createMessageAction(actors["Kathy"], quotes["Kathy"].startLine, scene);
		// createEvent(removeRandomElement(events), scene);
		// createMessageAction(
		// 	actors["Kathy"],
		// 	removeRandomElement(quotes["Kathy"].lines),
		// 	scene
		// );

		// createMessageAction(actors["Steve"], quotes["Steve"].startLine, scene);
		// createMessageAction(
		// 	actors["Steve"],
		// 	removeRandomElement(quotes["Steve"].lines),
		// 	scene
		// );
		// createMessageAction(actors["Steve"], quotes["Steve"].endLine, scene);

		// createEvent(removeRandomElement(events), scene);

		// createMessageAction(actors["Daniel"], quotes["Daniel"], scene);
		// createMessageAction(actors["Cristina"], quotes["Cristina"], scene);
		// createEvent(removeRandomElement(events), scene);
		// createMessageAction(actors["Cristina"], outro, scene);


	return loadAllPicUrls(scene).then(function () {
		console.log("the scene:" , scene);
		return scene;
	});

};



module.exports = {
	createScene: createScene
};



