app.factory("Scene", function ($http) {
	var scene = {};
	scene.get = function (keywords) {
		return $http.get("/scene", {params: {keywords: keywords}})
		.then(function (response) {
			return response.data;
		});
	};
	return scene;
});