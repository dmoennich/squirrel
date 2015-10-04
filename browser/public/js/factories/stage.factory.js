app.factory("Stage", function () {

	var stage = {};

	var stageWidth = window.innerWidth,
		stageHeight = window.innerHeight,
		actorSize = 100,
		fontSize = 24,
		xmin = Math.floor((stageWidth / 100) * 20),
		xmax = stageWidth - xmin - actorSize,
		ymin = Math.floor((stageHeight / 100) * 60),
		ymax = stageHeight - (actorSize + fontSize);


	var getRandomCoord = function () {
		return {
			x: xmin + Math.round(Math.random() * (xmax-xmin)),
			y: ymin + Math.round(Math.random() * (ymax-ymin))
		};
	};

	stage.setBackground = function (environment) {
		var bkgElement = getElementById("stageBackground");
		bkgElement.attr("src", environment.picUrl);
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

	var getElementById = function (id) {
		return angular.element(document.querySelector('#' + id));
	};

	stage.activateActor = function (actor) {
		var actorElement = getElementById(actor.id);
		actorElement.addClass("animated bounce");
	};

	stage.deactivateActor = function (actor) {
		var actorElement = getElementById(actor.id);
		actorElement.removeClass("animated bounce");
	};

	stage.activateEvent = function (event) {
		var stageFloor = getElementById("stagefloor");
		stageFloor.append("<div id='" +event.id+ "'' class='event animated pulse'></div>");
		var element = stageFloor.children().last();
		var coord = getRandomCoord();
		element.append("<img src='" +event.picUrl+ "'>");
		element.append("<div class='event-label'>" + event.name + "</div>");
		element.css({
			left: coord.x + "px",
			top: coord.y + "px"
		});
	};


	stage.showSign = function (text) {
		var sign = getElementById("sign");
		sign.text(text);
		sign.removeClass("animatedOnce2 fadeOut");
		sign.addClass("animatedOnce5 bounceInLeft");
	};

	stage.hideSign = function () {
		var sign = getElementById("sign");
		sign.removeClass("animatedOnce5 bounceInLeft");
		sign.addClass("animatedOnce2 fadeOut");
	};


	stage.showNarrator = function () {
		var sign = getElementById("narrator");
		sign.addClass("animatedOnce2 fadeIn");
	};

	stage.hideNarrator = function () {
		var sign = getElementById("narrator");
		sign.removeClass("animatedOnce1 fadeIn");
		sign.addClass("animatedOnce2 fadeOut");
	};


	return stage;

});





