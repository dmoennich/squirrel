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

	//console.log(sceneObj.persons[2].element);

	var stepPromise = Promise.resolve();
	sceneObj.playSteps.forEach(function (playStep) {

		if (playStep.type === "action") {
			console.log("playstep actor:", playStep.actor.element);
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


