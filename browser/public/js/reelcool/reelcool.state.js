app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/reelcool");

	$stateProvider.state("reelcool", {
		url: "/reelcool",
		templateUrl: "/js/reelcool/reelcool.html",
		controller: "ReelCoolCtrl"
	});

});

app.controller("ReelCoolCtrl", function ($scope, $state, LoaderSpinner) {

	LoaderSpinner.hide();

	$scope.loadStage = function (event) {
		LoaderSpinner.show();
		$state.go("stage", {"keywords": "reel cool"});
	};

});