app.directive("stage", function (Images) {

	return {
		restrict: "A",
		scope: {
			scene: "=",
			stage: "="
		},
		link: function (scope, element, attributes) {

			var canvas = element[0];

			if (canvas.getContext){
				var ctx = canvas.getContext('2d');
				console.log("floor img:", scope.stage.floor.img);
				ctx.drawImage(scope.stage.floor.img, 0, 0, window.innerWidth, window.innerHeight);
				ctx.drawImage(scope.stage.curtain.img, 0, 0, window.innerWidth, window.innerHeight);
			}

			//console.log("Element:", canvas);
			console.log("scene:", scope.scene);
			console.log("stagee:", scope.stage);


			console.log("floor img:", Object.keys(scope.stage.floor));

			//Images.load(scope.stageObj, drawStage);
		}
	};
});