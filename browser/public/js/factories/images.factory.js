app.factory("Images", function ($http) {

	var images = {};


	var findObjWithPicUrl = function (obj) {
		if (obj.hasOwnProperty("picUrl")) {
			return obj;
		}
		for (var key in obj) {
			if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
				var objWithPicUrl = findObjWithPicUrl(obj[key]);
				if (objWithPicUrl) {
					return objWithPicUrl;
				}
			}
		}
	};


	images.load = function (objsWithPicUrl, callMeWhenLoaded) {
		var loadedImages = 0;
		objsWithPicUrl.forEach(function (objWithUrl, index) {
			var img = new Image();
			img.src = objWithUrl.picUrl;
			img.onload = function () {
				console.log("finished loading", objWithUrl.picUrl);
				objWithUrl.img = img;
				loadedImages += 1;
				if (loadedImages === objsWithPicUrl.length) {
					callMeWhenLoaded(loadedImages);
				}
			};
		});
	};

	// images.load = function (obj) {
	// 	if (!obj.url) {
	// 		throw new Error("No pic url found");
	// 	}

	// 	var img = new Image();
	// 	img.url = obj.url;
	// 	img.onload = function () {
	// 		obj.img = img;
	// 	};

	// };

	return images;
});