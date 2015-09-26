app.factory("Stage", function () {

	var stage = {
		stage: {},
		actors: []
	};

	var canvas = document.querySelector('#mainstage'),
		stageWidth = window.innerWidth,
		stageHeight = window.innerHeight,
		ctx = canvas.getContext('2d'),
		actorSize = 70,
		xmin = Math.floor((stageWidth / 100) * 20),
		xmax = stageWidth - xmin - actorSize,
		ymin = Math.floor((stageHeight / 100) * 50) - actorSize,
		ymax = stageHeight - actorSize,
		fontSize = 24;

		canvas.width = stageWidth;
		canvas.height = stageHeight;
		ctx.font = fontSize + "px serif";


	stage.setStage = function (stageObj) {
		this.stage = stageObj;
	};

	stage.drawStage = function () {
		ctx.drawImage(this.stage.floor.img, 0, 0, stageWidth, stageHeight);
		ctx.drawImage(this.stage.curtain.img, 0, 0, stageWidth, stageHeight);
	};


	stage.setActors = function (actors) {
		this.actors = actors;

		var getRandomCoord = function () {
			return {
				x: xmin + Math.round(Math.random() * (xmax-xmin)),
				y: ymin + Math.round(Math.random() * (ymax-ymin))
			};
		};

		actors.forEach(function (actor) {
			actor.coord = getRandomCoord();
		});
	};


	stage.drawActor = function (actor) {
		ctx.drawImage(actor.img, actor.coord.x, actor.coord.y, actorSize, actorSize);
		ctx.fillText(actor.name, actor.coord.x, actor.coord.y + actorSize + fontSize);
	};

	stage.activateActor = function (actor) {
		console.log(actor.name, "is active");
	};

	stage.deactivateActor = function (actor) {
		console.log(actor.name, "is inactive");
	};

	stage.draw = function () {
		this.drawStage();
		this.actors.forEach(this.drawActor);
	};


	return stage;

});