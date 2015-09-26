app.directive("actor", function () {

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

	return {
		restrict: "A",
		link: function (scope, element, attr) {
			// var coord = getRandomCoord();
			// element.append("<img src='" +scope.actor.picUrl+ "'>");
			// element.append("<div>" + scope.actor.name + "</div>");
			// element.css({
			// 	left: coord.x + "px",
			// 	top: coord.y + "px"
			// });
			// scope.actor.element = element;
			// console.log("ELEMENT:", element);
			// console.log("ONE ACTOR:", scope.actor);
		}

	};
});