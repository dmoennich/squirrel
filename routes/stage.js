var stageProvider = require("../provider/StageProvider");
var router = require("express").Router();
module.exports = router;

router.get("/", function (request, response, next) {
	console.log("hit stage provider route");
	response.json(stageProvider());
});

