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

	$scope.loadStage = function () {
		LoaderSpinner.show();
		$state.go("stage", {"keywords": $scope.keywords});
	};

});