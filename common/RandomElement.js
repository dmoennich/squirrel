var getRandomElement = function (array) {
	if (!array.length) {
		return;
	}
	return array[Math.round(Math.random() * (array.length - 1))];
};

module.exports = getRandomElement;