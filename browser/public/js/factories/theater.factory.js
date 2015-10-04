app.factory("Theater", function ($http) {
	var theater = {};

	theater.getScene = function (keywords) {
		var scene;
		return $http.get("/api/scene", {params: {keywords: keywords}})
		.then(function (response) {
			return response.data;
		});
	};
	return theater;
});