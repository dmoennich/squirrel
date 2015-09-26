app.config(function ($stateProvider) {

	$stateProvider.state("stage", {
		url: "/stage/:keywords",
		templateUrl: "/js/stage/stage.html",
		controller: "StageCtrl",
		resolve: {
			sceneObj: function (Theater, $stateParams) {
				return Theater.getScene($stateParams.keywords);
			},
			stageObj: function (Theater) {
				return Theater.getStage();
			}
		}
	});

});

app.controller("StageCtrl", function ($scope, sceneObj, stageObj, Stage, Sound) {

	console.log("scene:", sceneObj);
	console.log("stage:", stageObj);


	Stage.setStage(stageObj);
	Stage.setActors(sceneObj.persons);
	Stage.draw();

	var stepPromise = Promise.resolve();
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


