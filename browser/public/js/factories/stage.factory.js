app.factory("Stage", function () {

	var stage = {};

	var stageWidth = window.innerWidth,
		stageHeight = window.innerHeight,
		actorSize = 70,
		xmin = Math.floor((stageWidth / 100) * 20),
		xmax = stageWidth - xmin - actorSize,
		ymin = Math.floor((stageHeight / 100) * 50) - actorSize,
		ymax = stageHeight - actorSize,
		fontSize = 24;

	var getRandomCoord = function () {
		return {
			x: xmin + Math.round(Math.random() * (xmax-xmin)),
			y: ymin + Math.round(Math.random() * (ymax-ymin))
		};
	};

	stage.placeActors = function (actors) {
		var stageFloor = angular.element(document.querySelector('#stagefloor'));
		actors.forEach(function (actor) {
			stageFloor.append("<div id='" +actor.id+ "'' class='actor'></div>");
			var element = stageFloor.children().last();
			var coord = getRandomCoord();
			element.append("<img src='" +actor.picUrl+ "'>");
			element.append("<div class='actor-label'>" + actor.name + "</div>");
			element.css({
				left: coord.x + "px",
				top: coord.y + "px"
			});
			actor.element = element;

		});

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