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
		{voice: "Google UK English Male", rate: 0.5, pitch: 1, gender: "narrator"},
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
				assignVoice({id: "narrator", gender: "narrator"});
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


	sound.getStateMessage = function (eventName, state) {
		var messages = [];
		messages.push("The " + eventName + " made me " + state);
		messages.push("I'm feeling " + state + " because of the " + eventName);
		return getRandomElement(messages);
	};


	sound.narrateEvent = function (message) {

		return this.talk({id: "narrator"}, message);

		// var thisTalk = this.talk.bind(this);

		// playStep.affectedActors.forEach(function (affectedPerson) {
		// 	talkPromise = talkPromise.then(function () {
		// 		var message = getStateMessage(playStep.entity.name, affectedPerson.currentState);
		// 		return thisTalk(affectedPerson, message);
		// 	});
		// });

		// return talkPromise;
	};


	return sound;
});


