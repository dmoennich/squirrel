app.factory("Stage", function () {

	var stage = {};

	var stageWidth = window.innerWidth,
		stageHeight = window.innerHeight,
		// ctx = canvas.getContext('2d'),
		actorSize = 70,
		xmin = Math.floor((stageWidth / 100) * 20),
		xmax = stageWidth - xmin - actorSize,
		ymin = Math.floor((stageHeight / 100) * 50) - actorSize,
		ymax = stageHeight - actorSize,
		fontSize = 24;

		// canvas.width = stageWidth;
		// canvas.height = stageHeight;
		// ctx.font = fontSize + "px serif";


	// stage.setStage = function (stageObj) {
	// 	this.stage = stageObj;
	// };

	// stage.drawStage = function () {
	// 	ctx.drawImage(this.stage.floor.img, 0, 0, stageWidth, stageHeight);
	// 	ctx.drawImage(this.stage.curtain.img, 0, 0, stageWidth, stageHeight);
	// };

	var getRandomCoord = function () {
		return {
			x: xmin + Math.round(Math.random() * (xmax-xmin)),
			y: ymin + Math.round(Math.random() * (ymax-ymin))
		};
	};


	// stage.initActors = function (actors) {
	// 	this.actors = actors;

	// 	var getRandomCoord = function () {
	// 		return {
	// 			x: xmin + Math.round(Math.random() * (xmax-xmin)),
	// 			y: ymin + Math.round(Math.random() * (ymax-ymin))
	// 		};
	// 	};

	// 	actors.forEach(function (actor) {
	// 		actor.coord = getRandomCoord();
	// 	});
	// };


	stage.placeActors = function (actors) {
		var stageFloor = angular.element(document.querySelector('#stagefloor'));
		actors.forEach(function (actor) {
			stageFloor.append("<div id='" +actor.id+ "'' class='actor'></div>");
			var element = stageFloor.children().last();
			var coord = getRandomCoord();
			element.append("<img src='" +actor.picUrl+ "'>");
			element.append("<div>" + actor.name + "</div>");
			element.css({
				left: coord.x + "px",
				top: coord.y + "px"
			});
			actor.element = element;
			// console.log("ELEMENT:", element);
			// console.log("ONE ACTOR:", scope.actor);



		});
		// ctx.drawImage(actor.img, actor.coord.x, actor.coord.y, actorSize, actorSize);
		// ctx.fillText(actor.name, actor.coord.x, actor.coord.y + actorSize + fontSize);

	};

	var getActorElement = function (id) {
		return angular.element(document.querySelector('#' + id));
	};


	stage.activateActor = function (actor) {
		var actorElement = getActorElement(actor.id);
		actorElement.addClass("animated bounce");
		console.log(actor.name, "is active");
	};

	stage.deactivateActor = function (actor) {
		var actorElement = getActorElement(actor.id);
		actorElement.removeClass("animated bounce");
		console.log(actor.name, "is inactive");
	};



	return stage;

});