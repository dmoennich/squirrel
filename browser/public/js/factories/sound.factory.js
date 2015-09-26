app.factory("Sound", function () {

	var sound = {};

	sound.talk = function (actor, message) {
		return new Promise(function (resolve, reject) {
			console.log(actor.name, "says with", actor.gender, "voice:", message);
			window.setTimeout(resolve,4000);
		});
	};

	return sound;
});