app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	$stateProvider.state("home", {
		url: "/home",
		templateUrl: "/js/home/home.html",
		controller: "HomeCtrl"
	});

});

app.controller("HomeCtrl", function ($scope, $state) {

	$scope.loadStage = function () {
		$state.go("stage", {"keywords": $scope.keywords});
	};

});