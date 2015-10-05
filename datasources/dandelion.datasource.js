var request = require("request");
var Promise = require("bluebird");

var DandData = {};
module.exports = DandData;

var appId = process.env.dandelion_appId,
	appKey = process.env.dandelion_appKey;



DandData.getEntities = function (text) {

	return new Promise(function (resolve, reject) {
		request.post({
			method: 'POST',
			url: "https://api.dandelion.eu/datatxt/nex/v1?$app_id=" + appId + "&$app_key=" + appKey,
			form: {
				text: text,
				include: "categories,abstract",
				language: "en",
				epsilon: "0.4"
			}
		}, function (error, response, body) {
			if (error) {
				reject("error: " + response.statusCode + " " + error);
			}
			body = JSON.parse(body);
			resolve(body.annotations);
		});

	});


};

DandData.getEntitiesByCategories = function (entities, identifier) {
	var foundEntities = [];

	var matchesCat = function (categories) {
		if (!categories) {
			return false;
		}
		categories = categories.join(" ").toLowerCase();
		return identifier.some(function (identifier) {
			return categories.indexOf(identifier) > -1;
		});
	};

	entities.forEach(function (entity) {
		if (matchesCat(entity.categories)) {
			foundEntities.push({name: entity.spot});
		}
	});

	return foundEntities;
};



DandData.getPlaces = function (entities) {
	var placeIdentifier = [
		"habitat", "planet", "floor", "garden", "forrest", "countr", "borough",
		"city", "cities", "state", "architectur"
	];
	return this.getEntitiesByCategories(entities, placeIdentifier);
};


DandData.getEvents = function (entities) {
	var eventIdentifier = [
		"vessel", "ship", "vehicel", "suffering", "mythological", "mythology",
		"aircraft", "symbol", "weapon", "business", "weather"
	];
	return this.getEntitiesByCategories(entities, eventIdentifier);
};


// DandData.getEntities("Daniel drives with the train to Manhattan.")
// .then(function (entities) {
// 	//console.log("Entities length", entities);
// 	console.log("found places:", DandData.getPlaces(entities));
// });



















