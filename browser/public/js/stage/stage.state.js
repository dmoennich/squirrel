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
				return Theater.getStage()
				.then(function (loadedStage) {
					console.log("Yes, the loadedstage is here");
					return loadedStage;
				});
			}
		}
	});

});

app.controller("StageCtrl", function ($scope, sceneObj, stageObj, Images) {
	//console.log("stateParams", $stateParams);
	//$scope.keywords = $stateParams.keywords;
	// console.log("REceived scene:", sceneObj);
	// console.log("REceived stage:", stageObj);
	// console.log("REceived floor:", stageObj.floor);
	$scope.stage = stageObj;
	$scope.scene = sceneObj;

});