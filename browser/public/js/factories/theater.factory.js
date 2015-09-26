app.factory("Theater", function ($http) {
	var theater = {};

	// var loadImages = function (objsWithPicUrl) {

	// 	return new Promise(function (resolve, reject) {
	// 		var loadedImages = 0;
	// 		objsWithPicUrl.forEach(function (objWithUrl, index) {
	// 			var img = new Image();
	// 			img.src = objWithUrl.picUrl;
	// 			img.onload = function () {
	// 				console.log("finished loading", objWithUrl.picUrl);
	// 				objWithUrl.img = img;
	// 				loadedImages += 1;
	// 				if (loadedImages === objsWithPicUrl.length) {
	// 					resolve(objsWithPicUrl);
	// 				}
	// 			};
	// 		});
	// 	});

	// };

	// var actorsPromise = new Promise().resolve(),
	// 	actorCount = 0,
	// 	numberOfActorsReady = 0;

	// theater.whenActorsReady = function () {
	// 	return actorsPromise;
	// };

	// theater.actorIsReady = function () {
	// 	numberOfActorsReady += 1;
	// 	if (numberOfActorsReady === actorCount) {
	// 		actorsPromise.resolve();
	// 	}
	// };

	// var addGetElement = function (actor) {
	// 	actor.getElement = function () {
	// 		return new Promise(function (resolve, reject) {

	// 		});
	// 	};
	// };





	theater.getScene = function (keywords) {
		var scene;
		return $http.get("/api/scene", {params: {keywords: keywords}})
		.then(function (response) {
			console.log("received: ", response.data);
			//actorCount = response.data.persons.length;
			return response.data;
			// return Images.load(scene.persons);
		});
		// .then(function () {
		// 	return scene;
		// });
	};
	return theater;
});