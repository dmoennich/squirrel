app.factory("Theater", function ($http, Images) {
	var theater = {};
	theater.getScene = function (keywords) {
		var scene;
		return $http.get("/api/scene", {params: {keywords: keywords}})
		.then(function (response) {
			scene = response.data;
			return Images.load(scene.persons);
		})
		.then(function () {
			return scene;
		});
	};
	theater.getStage = function () {
		var stage;
		return $http.get("/api/stage")
		.then(function (response) {
			stage = response.data;
			var floorAndCurtain = [stage.floor, stage.curtain];
			return Images.load(floorAndCurtain);
		})
		.then(function () {
			return stage;
		});
	};
	return theater;
});