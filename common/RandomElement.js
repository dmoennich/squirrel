

var getRandomIndex = function (arrayLength) {
	if (!arrayLength) {
		return;
	}
	return Math.round(Math.random() * (arrayLength - 1));
};


module.exports = {
	get: function (array) {
		return array[getRandomIndex(array.length)];
	},
	remove: function (array) {
		var randomIndex = getRandomIndex(array.length);
		if (randomIndex !== undefined) {
			return array.splice(randomIndex, 1)[0];
		}
	}
};


