function loadStage(){
	var canvas = document.getElementById('mainstage');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var imageSources = [
		"images/background.png",
		"/images/floor.gif",
		"/images/stage.gif"
	];

	var loadImages = function (imgSources, callMeWhenLoaded) {
		var loadedImages = [];
		imgSources.forEach(function (imgSource, index) {
			var img = new Image();
			img.src = imgSource;
			img.onload = function () {
				console.log("finished loading", imgSource);
				loadedImages[index] = img;
				if (loadedImages.length === imgSources.length) {
					callMeWhenLoaded(loadedImages);
				}
			};
		});
	};

	var drawStage = function (images) {
			if (canvas.getContext){
				var ctx = canvas.getContext('2d');
				images.forEach(function (img) {
					ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
				});
			}
	};

	//loadImages(imageSources, drawStage);


}

$(document).ready(loadStage);