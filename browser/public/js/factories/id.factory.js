app.factory("IdGenerator", function () {
	var counter = 0;
	return function () {
		return '_' + Math.random().toString(36).substr(2, 9) + (counter++);
	};
});