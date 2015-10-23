app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state("reelcool", {
		url: "/reelcool",
		templateUrl: "/js/reelcool/reelcool.html",
		controller: "ReelCoolCtrl"
	});

});

app.controller("ReelCoolCtrl", function ($scope, $state, LoaderSpinner) {

	document.body.style.backgroundColor = "black";

	LoaderSpinner.hide();

	LoaderSpinner.el.attr("src", "/images/reelcool/katyspinner.gif");

	$scope.loadStage = function (event) {
		LoaderSpinner.show();
		window.setTimeout(function () {
			$state.go("stage", {"keywords": "reel cool"});
		}, 1500);
	};

});