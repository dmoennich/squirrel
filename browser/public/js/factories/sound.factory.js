app.factory("Sound", function () {

	var sound = {};

	sound.talk = function (actor, message) {
		return new Promise(function (resolve, reject) {

			// console.log(actor.name, "says with", actor.gender, "voice:", message);
			// window.setTimeout(resolve,4000);

			var msg = new SpeechSynthesisUtterance(message);
			msg.onend = function (e) {
				resolve();
			};
			window.speechSynthesis.speak(msg);
			console.log("MSG", msg);



		});
	};

	return sound;
});