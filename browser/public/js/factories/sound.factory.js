app.factory("Sound", function () {

	var sound = {},
		voices,
		actorVoiceMap = {};


	var getRandomElement = function (array) {
		if (!array.length) {
			return;
		}
		return array[Math.round(Math.random() * (array.length - 1))];
	};

	var voiceConfigs = [
		{voice: "Fred", rate: 1.5, pitch: 2, gender: "male"},
		{voice: "Daniel", rate: 1, pitch: 1, gender: "male"},
		{voice: "Vicky", rate: 1, pitch: 1, gender: "female"},
		{voice: "Pipe Organ", rate: 1, pitch: 1, gender: "male"},
		{voice: "Ting-Ting", rate: 1, pitch: 1, gender: "female"},
		{voice: "Whisper", rate: 1, pitch: 1, gender: "male"},
		{voice: "Vicky", rate: 1.5, pitch: 1.5, gender: "female"}
	];

	var assignVoice = function (actor) {

		var config = getRandomElement(voiceConfigs.filter(function (aConfig) {
			return aConfig.gender === actor.gender;
		}));


		var voice = voices.filter(function (voice) {
			return voice.name === config.voice;
		})[0];

		var msg = new SpeechSynthesisUtterance();
		msg.voice = voice;
		msg.voiceURI = "native";
		msg.volume = 1;
		msg.lang = "en-US";
		msg.rate = config.rate;
		msg.pitch = config.pitch;

		actorVoiceMap[actor.id] = msg;
	};

	sound.assignVoices = function (actors) {
		return new Promise(function (resolve, reject) {
			window.speechSynthesis.onvoiceschanged = function() {
				voices = window.speechSynthesis.getVoices();
				actors.forEach(assignVoice);
				resolve();
			};
		});
	};


	sound.talk = function (actor, message) {
		return new Promise(function (resolve, reject) {

			var msg = actorVoiceMap[actor.id];
			msg.text = message;
			msg.onend = function (e) {
				resolve();
			};
			window.speechSynthesis.speak(msg);

		});
	};


	return sound;
});


