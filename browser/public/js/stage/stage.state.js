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


	Stage.buildStage(stageObj);
	Stage.placeActors(sceneObj.persons);



	// play step loop
	// for every step
		// let actor jump (use factory)
		// opt: print message on canvas
		// let message read out (use another factory)



});


