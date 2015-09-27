app.config(function ($stateProvider) {

	$stateProvider.state("stage", {
		url: "/stage/:keywords",
		templateUrl: "/js/stage/stage.html",
		controller: "StageCtrl",
		resolve: {
			sceneObj: function (Theater, $stateParams) {
				return Theater.getScene($stateParams.keywords);
			}
		}
	});

});

app.controller("StageCtrl", function ($scope, sceneObj, Stage, Sound, Theater) {

	console.log("scene:", sceneObj);

	Stage.placeActors(sceneObj.persons);


	var stepPromise = Sound.assignVoices(sceneObj.persons);
	sceneObj.playSteps.forEach(function (playStep) {
		if (playStep.type === "action") {
			stepPromise = stepPromise.then(function () {
				Stage.activateActor(playStep.actor);
				return Sound.talk(playStep.actor, playStep.message);
			})
			.then(function () {
				return Stage.deactivateActor(playStep.actor);
			});
		}

		if (playStep.type === "event") {
			stepPromise = stepPromise.then(function () {
				return Sound.narrateEvent(playStep.entity.description);
			})
			.then(function () {
				playStep.affectedActors.forEach(function (affectedPerson) {
					stepPromise = stepPromise.then(function () {
						return Stage.activateActor(affectedPerson);
					}).then(function () {
						var message = Sound.getStateMessage(playStep.entity.name, affectedPerson.currentState);
						return Sound.talk(affectedPerson, message);
					}).then(function () {
						return Stage.deactivateActor(affectedPerson);
					});
				});
			});
		}


	});


});


