app.directive("stage", function () {

	return {
		restrict: "A",
		scope: {
			scene: "=",
			stage: "="
		},
		link: function (scope, element, attributes) {

			var canvas = element[0],
				stage = scope.stage,
				scene = scope.scene,
				ctx = canvas.getContext('2d'),
				stageWidth = window.innerWidth,
				stageHeight = window.innerHeight;

			console.log("scene:", scene);
			console.log("stage:", stage);

			var buildStage = function () {
				canvas.width = stageWidth;
				canvas.height = stageHeight;
				ctx.drawImage(stage.floor.img, 0, 0, stageWidth, stageHeight);
				ctx.drawImage(stage.curtain.img, 0, 0, stageWidth, stageHeight);
			};


			var placeActors = function () {
				var actorSize = 70,
					xmin = Math.floor((stageWidth / 100) * 20),
					xmax = stageWidth - xmin - actorSize,
					ymin = Math.floor((stageHeight / 100) * 50) - actorSize,
					ymax = stageHeight - actorSize,
					fontSize = 24;

					ctx.font = fontSize + "px serif";

					// console.log("xmin", xmin);
					// console.log("xmax", xmax);
					// console.log("ymin", ymin);
					// console.log("ymax", ymax);

				var getRandomCoord = function () {
					return {
						x: xmin + Math.round(Math.random() * (xmax-xmin)),
						y: ymin + Math.round(Math.random() * (ymax-ymin))
					};
				};

				scene.persons.forEach(function (actor) {
					var coord = getRandomCoord();
					ctx.drawImage(actor.img, coord.x, coord.y, actorSize, actorSize);
					ctx.fillText(actor.name, coord.x, coord.y + actorSize + fontSize);
				});
			};

			buildStage();


			placeActors();

		}
	};
});