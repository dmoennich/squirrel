app.config(function ($stateProvider) {

	$stateProvider.state("stage", {
		url: "/stage/:keywords",
		templateUrl: "/js/stage/stage.html",
		controller: "StageCtrl",
		resolve: {
			loader: function (LoaderSpinner) {
				LoaderSpinner.show();
			},
			sceneObj: function (Theater, $stateParams) {
				return Theater.getScene($stateParams.keywords);
			}
		}
	});

});

app.controller("StageCtrl", function ($scope, sceneObj, Stage, Sound, Theater, LoaderSpinner, Music) {


	Stage.setBackground(sceneObj.environment);

	Stage.placeActors(sceneObj.persons);

	var actorActs = function (actor, message) {
		return new Promise.resolve()
		.then(function () {
			Stage.activateActor(actor);
			return Sound.talk(actor, message);
		})
		.then(function () {
			return Stage.deactivateActor(actor);
		});
	};


	var stepPromise = Sound.assignVoices(sceneObj.persons);

	stepPromise = stepPromise.then(function () {
		var message = "It's happening in " + sceneObj.environment.description + "...";
		Stage.showNarrator();
		Stage.showSign(message);
		return Sound.narrateEvent(message);
	}).then(function () {
		console.log("after intro");
		Stage.hideNarrator();
		Stage.hideSign();
	});

	sceneObj.playSteps.forEach(function (playStep) {
		if (playStep.type === "action") {
			stepPromise = stepPromise.then(function () {
				return actorActs(playStep.actor, playStep.message);
			});
		}

		if (playStep.type === "event") {
			stepPromise = stepPromise.then(function () {
				Stage.showNarrator();
				Stage.activateEvent(playStep.entity);
				return Sound.narrateEvent(playStep.entity.description);
			})
			.then(function () {
				Stage.hideNarrator();
			});

			playStep.affectedActors.forEach(function (affectedPerson) {
				stepPromise = stepPromise
				.then(function () {
					var message = Sound.getStateMessage(playStep.entity.name, affectedPerson.currentState);
					return actorActs(affectedPerson, message);
				});
			});
		}


	});


	// optional music track at the end
	if (sceneObj.audioUrl) {
		var audio = Music.createAudio(sceneObj.audioUrl);
		stepPromise = stepPromise.then(function () {
			return Music.play(audio);
		});
	}


	// The End
	stepPromise = stepPromise.then(function () {
		var message = "That was '" + sceneObj.title + "'";
		Stage.showSign(message);
		Stage.showNarrator();
		return Sound.narrateEvent(message);
	});





	LoaderSpinner.hide();

});


