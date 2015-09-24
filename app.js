var express = require("express"),
	morgan = require("morgan"),
	// routes = require("./routes")
	app = express(),
	server;


app.use(morgan("dev"));



app.get("/", function (req, resp, next) {
	resp.json({});
});


server = app.listen(3000, function () {
	console.log("Server listening on port", server.address().port, "...");
});