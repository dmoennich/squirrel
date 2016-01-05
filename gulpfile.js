var gulp = require("gulp"),
	nodemon = require("gulp-nodemon"),
	dotenv = require("dotenv");


gulp.task("local", function () {
	dotenv.load();
	nodemon({
		script: "app.js"
	});
});


