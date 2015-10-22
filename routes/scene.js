var SceneGenerator = require("../generator/MovieBasedGenerator");
var ReelCoolGenerator = require("../generator/ReelCoolGenerator");
var router = require("express").Router();
module.exports = router;

router.get("/", function (request, response, next) {
	var keywords = request.query.keywords || "Star Wars",
		generator = keywords === "reel cool" ? ReelCoolGenerator : SceneGenerator;
	generator.createScene(keywords)
	.then(function (scene) {
		response.json(scene);
	}).then(null, function (error) {
		next(error);
	});
});

