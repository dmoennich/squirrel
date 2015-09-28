var SceneGenerator = require("../generator/MovieBasedGenerator");
var router = require("express").Router();
module.exports = router;

router.get("/", function (request, response, next) {
	console.log("hit new scene route");
	var keywords = request.query.keywords || "Star Wars";
	SceneGenerator.createScene(keywords)
	.then(function (scene) {
		response.json(scene);
	}).then(null, function (error) {
		next(error);
	});
});

