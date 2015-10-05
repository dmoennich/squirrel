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
		// {voice: "Pipe Organ", rate: 1, pitch: 1, gender: "male"},
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

		actorVoiceMap = {};

		var initVoices = function () {
			voices = window.speechSynthesis.getVoices();
			assignVoice({id: "narrator", gender: "narrator"});
			actors.forEach(assignVoice);
		};

		return new Promise(function (resolve, reject) {
			if (voices) {
				initVoices();
				resolve();
			} else {
				window.speechSynthesis.onvoiceschanged = function() {
					initVoices();
					resolve();
				};
			}
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
		messages.push("Uh, I'm so " + state);
		messages.push(state + ", oh yes!");
		messages.push("Look at that " + eventName);
		messages.push("Oh nice, a " + eventName);
		messages.push("Oh my god, it's a real " + eventName);
		messages.push("Ahh, those " + eventName + " make me feel " + state);

		messages.push(eventName + "! We are all doomed!");
		messages.push("A " + eventName + "! Just look at it!");
		messages.push(eventName + ", not again!");
		messages.push(eventName + ", sweet!");
		messages.push("That's the biggest " + eventName + " I've seen in a long time!");
		messages.push("Every time I see a " + eventName + " I get sooo " + state + "!");
		messages.push("Those red curtains, I like them!");


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


