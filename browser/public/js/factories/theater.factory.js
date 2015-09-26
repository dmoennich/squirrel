app.factory("Theater", function ($http) {
	var theater = {};
	theater.getScene = function (keywords) {
		return $http.get("/api/scene", {params: {keywords: keywords}})
		.then(function (response) {
			return response.data;
		});
	};
	theater.getStage = function () {
		return $http.get("/api/stage")
		.then(function (response) {
			return response.data;
		});
	};
	return theater;
});