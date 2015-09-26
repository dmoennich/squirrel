var SceneGenerator = require("../generator/SceneGenerator");
var router = require("express").Router();
module.exports = router;

router.get("/", function (request, response, next) {
	console.log("hit new scene route");
	var scene = SceneGenerator.createScene(request.query.keywords);
	response.json(scene);
});

