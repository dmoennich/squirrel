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


	//var stepPromise = Promise.resolve();
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

	});


});


