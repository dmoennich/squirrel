var express = require("express"),
	morgan = require("morgan"),
	path = require("path"),
	app = express(),
	server;


app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "/browser/public")));
app.use(express.static(path.join(__dirname, "/node_modules")));

app.use("/api/scene", require("./routes/scene"));
app.use("/api/stage", require("./routes/stage"));

app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get("/*", function (request, response, next) {
	response.sendFile(path.join(__dirname, "/browser/public/squirrel.html"));
});

server = app.listen(8080, function () {
	console.log("Server listening on port", server.address().port, "...");
});





