app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	$stateProvider.state("home", {
		url: "/home",
		templateUrl: "/js/home/home.html",
		controller: "HomeCtrl"
	});

});

app.controller("HomeCtrl", function ($scope, $state, LoaderSpinner) {

	LoaderSpinner.hide();

	$scope.keyInput = function (event) {
		if (event.which === 13) {
			$scope.loadStage();
		}
	};

	$scope.loadStage = function (event) {
		LoaderSpinner.show();
		$state.go("stage", {"keywords": $scope.keywords});
	};

});