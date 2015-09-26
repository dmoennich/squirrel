app.factory("Images", function ($http) {

	var images = {};


	images.load = function (objsWithPicUrl) {

		return new Promise(function (resolve, reject) {
			var loadedImages = 0;
			objsWithPicUrl.forEach(function (objWithUrl, index) {
				var img = new Image();
				img.src = objWithUrl.picUrl;
				img.onload = function () {
					console.log("finished loading", objWithUrl.picUrl);
					objWithUrl.img = img;
					loadedImages += 1;
					if (loadedImages === objsWithPicUrl.length) {
						resolve(objsWithPicUrl);
					}
				};
			});
		});






	};

	return images;
});