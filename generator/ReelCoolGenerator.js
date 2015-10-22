var imdb = require("../datasources/imdb.datasource");
var dand = require("../datasources/dandelion.datasource");
var SimplePersonProvider = require("../provider/SimplePersonProvider");
var simplePersonProvider = new SimplePersonProvider();
var PlayStep = require("../entities/PlayStep");
var EventProvider = require("../provider/EventProvider");
var eventProvider = new EventProvider();
var googleImg = require("google-images");
var Promise = require("bluebird");
var ReelCoolEntities = require("../reelcool/entities.js");
var _ = require("lodash");

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

var initScene = function (movieTitle) {
	return {
		title: movieTitle,
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


var createScene = function () {

	// create copy of reelColEntities
	var entities = new ReelCoolEntities();

	console.log("ENTITIES:", entities);

	var movieTitle = entities.title,
		charactersFromQuotes = {},
		place = entities.place,
		events = entities.events,
		quotes = entities.quotes,
		selectedQuotes = {},
		scene = initScene(movieTitle);

		scene.environment = {
			name: place.name,
			description: place.name,
			picUrl: "/images/kitchen.jpg"
		};

		// randomly select lines from each speaker
		for (var speaker in quotes) {
			var lines = [];
			lines.push(removeRandomElement(quotes[speaker]));
			lines.push(removeRandomElement(quotes[speaker]));
			selectedQuotes[speaker] = lines;
			charactersFromQuotes[speaker] = 1;
		}

		console.log("selected quotes:", JSON.stringify(selectedQuotes, null, 4));
		// console.log("CHARS FROM QUOTES:", charactersFromQuotes);

		createActors(charactersFromQuotes, scene);

		// correct gender for voices in FE
		charactersFromQuotes["Kathy"].gender = "female";
		charactersFromQuotes["Steve"].gender = "male";
		charactersFromQuotes["Daniel"].gender = "male";
		charactersFromQuotes["Cristina"].gender = "female";


		var createMessages = function (speaker) {
			selectedQuotes[speaker].forEach(function (line) {
				var actor = charactersFromQuotes[speaker];
				createMessageAction(actor, line, scene);
			});
		};

		// sequence of speakers / events
		createMessages("Kathy");
		createMessages("Steve");
		createEvent(removeRandomElement(events), scene);
		createMessages("Daniel");
		createMessages("Cristina");
		createEvent(removeRandomElement(events), scene);


	return loadAllPicUrls(scene).then(function () {
		console.log("the scene:" , scene);
		return scene;
	});

};



module.exports = {
	createScene: createScene
};



