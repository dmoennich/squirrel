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
		})
		.catch(function (error) {
			console.error("Error fetching the person images", error);
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
			console.log("stage after loading:", stage);
			return stage;
		})
		.catch(function (error) {
			console.error("Error fetching the stage images", error);
		});
	};
	return theater;
});