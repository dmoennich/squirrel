app.directive("stage", function (Images) {

	return {
		restrict: "A",
		scope: {
			scene: "=",
			stageObj: "="
		},
		link: function (scope, canvas, attributes) {

			var drawStage = function () {
				if (canvas.getContext){
					var ctx = canvas.getContext('2d');
					ctx.drawImage(scope.stageObj.floor.img, 0, 0, window.innerWidth, window.innerHeight);
					ctx.drawImage(scope.stageObj.curtain.img, 0, 0, window.innerWidth, window.innerHeight);
				}
			};

			console.log("Element:", canvas);
			console.log("scene:", scope.scene);
			console.log("stage:", scope.stageObj);
			//Images.load(scope.stageObj, drawStage);
		}
	};
});