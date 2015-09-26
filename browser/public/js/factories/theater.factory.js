app.factory("Theater", function ($http) {
	var theater = {};

	theater.getScene = function (keywords) {
		var scene;
		return $http.get("/api/scene", {params: {keywords: keywords}})
		.then(function (response) {
			console.log("received: ", response.data);
			return response.data;
		});
	};
	return theater;
});