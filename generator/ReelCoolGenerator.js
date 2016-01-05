var Promise = require("bluebird");
var ReelCoolEntities = require("../reelcool/entities.js");
var movieBasedGenerator = require("./MovieBasedGenerator");
var randomElement = require("../common/RandomElement");


// correct gender for voices in FE
var setGender = function (actors) {
	actors["Kathy"].gender = "female";
	actors["Cristina"].gender = "female";
	actors["Steve"].gender = "male";
	actors["Daniel"].gender = "male";
};

module.exports = function() {

	var generator = movieBasedGenerator();

	generator.loadAllPicUrls = function (scene) {

		var promise = Promise.resolve();

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

	var pickRandomEvent = function (events) {
		return {
			name: randomElement.remove(events)
		};
	};

	generator.createScene = function () {

		var entities = new ReelCoolEntities(),
			movieTitle = entities.title,
			charactersFromQuotes = {},// = Object.keys(entities.quotes),
			intro = entities.intro,
			outro = entities.outro,
			place = entities.place,
			events = entities.events,
			quotes = entities.quotes,
			selectedQuotes = {},
			scene = generator.initScene(movieTitle);

			Object.keys(entities.quotes).forEach(function (name) {
				charactersFromQuotes[name] = 1;
			});

			scene.environment = {
				name: place.name,
				description: place.name,
				picUrl: randomElement.remove(entities.bkgUrls)
			};

			scene.audioUrl = "/audio/indi.mp3";

			generator.createActors(charactersFromQuotes, scene);

			setGender(charactersFromQuotes);

			var presentSection = function (speaker) {
				generator.createMessageAction(charactersFromQuotes[speaker], quotes[speaker].startLine, scene);
				generator.createMessageAction(
					charactersFromQuotes[speaker],
					randomElement.remove(quotes[speaker].lines),
					scene
				);
				generator.createMessageAction(charactersFromQuotes[speaker], quotes[speaker].endLine, scene);
			};


			generator.createMessageAction(charactersFromQuotes["Kathy"], intro, scene);
			generator.createEvent(pickRandomEvent(events), scene);
			presentSection("Kathy");
			presentSection("Steve");
			generator.createEvent(pickRandomEvent(events), scene);
			presentSection("Daniel");
			presentSection("Cristina");
			generator.createEvent(pickRandomEvent(events), scene);
			generator.createMessageAction(charactersFromQuotes["Cristina"], outro, scene);


		return generator.loadAllPicUrls(scene).then(function () {
			return scene;
		});

	};

	return generator;
};








