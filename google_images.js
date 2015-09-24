var client = require("google-images");

client.search('cats', function (error, images) {

	if (error) {
		console.error("ERROR:", error);
	}

	console.log("image length", images.length);
	console.log("image", images[0]);

});