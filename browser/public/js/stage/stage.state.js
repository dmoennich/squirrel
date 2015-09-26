app.config(function ($stateProvider) {

	$stateProvider.state("stage", {
		url: "/stage/:keywords",
		templateUrl: "/js/stage/stage.html",
		controller: "StageCtrl",
		resolve: {
			sceneObj: function (Scene, $stateParams) {
				return Scene.get($stateParams.keywords);
			}
		}
	});

});

app.controller("StageCtrl", function ($scope, sceneObj) {
	//console.log("stateParams", $stateParams);
	//$scope.keywords = $stateParams.keywords;
	console.log("REceived scene:", sceneObj);
});