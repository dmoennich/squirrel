app.factory("Music", function (IdGenerator) {

	var musicFac = {},
		musicMap = {};


	musicFac.createAudio = function (url) {
		var body = angular.element(document.querySelector("body")),
			id = IdGenerator(),
			audioElement = body.append("<audio id='" + id + "' \
				style:'display: none' src='" + url + "'>");
		musicMap[id] = document.getElementById(id);
		return id;
	};


	musicFac.play = function (id) {
		musicMap[id].play();
	};

	musicFac.pause = function (id) {
		musicMap[id].pause();
	};

	return musicFac;

});