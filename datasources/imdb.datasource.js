var request = require("request");
var cheerio = require("cheerio");
var Promise = require("bluebird");
var querystring = require("querystring");

var ImdbData = {};
module.exports = ImdbData;

var IMDB_URL = {
	base: "http://www.imdb.com",
	findByTitle: function (title) {
		return this.base + "/find?ref_=nv_sr_fn&s=all&q=" + querystring.escape(title);
	},
	movieCastPage: function (movieId) {
		return this.base + "/title/" + movieId + "/fullcredits";
	},
	movieQuotesPage: function (movieId) {
		return this.base + "/title/" + movieId + "/trivia?tab=qt";
	}
};

var movieIdCache = {};


var fetchHtml = function (url) {
	console.log("calling", url);
	return new Promise(function (resolve, reject) {
		request(url, function(error, response, html){
			if (error) {
				return reject(error);
			}
			console.log("fetched from", url);
			resolve(cheerio.load(html));
		});
	});
};

// expects something like /title/tt0076759/?ref_=fn_al_tt_1
var getMovieIdFromUrl = function (url) {
	return (/(\/title\/)([^\/]*)/).exec(url)[2];
};


var getMovieIdByTitle = function (movieTitle) {
	if (movieIdCache[movieTitle]) {
		return new Promise.resolve(movieIdCache[movieTitle]);
	}
	return fetchHtml(IMDB_URL.findByTitle(movieTitle))
	.then(function ($searResultPage) {
		var aHref = $searResultPage(".findResult a").first().attr("href");
		var movieId = getMovieIdFromUrl(aHref);
		movieIdCache[movieTitle] = movieId;
		return movieId;
	});
};


ImdbData.getMovieCharacters = function (movieTitle) {
	return getMovieIdByTitle(movieTitle)
	.then(function (movieId) {
		return fetchHtml(IMDB_URL.movieCastPage(movieId));
	})
	.then(function ($castPage) {
		var allCharacters = $castPage(".cast_list .character").find("a");
		allCharacters = Array.prototype.slice.call(allCharacters, 0);
		return allCharacters.map(function (character) {
			return $castPage(character).text();
		});
	});
};


ImdbData.getMovieQuotes = function (movieTitle) {
	return getMovieIdByTitle(movieTitle)
	.then(function (movieId) {
		return fetchHtml(IMDB_URL.movieQuotesPage(movieId));
	})
	.then(function ($quotesPage) {

	});
};


ImdbData.getMovieCharacters("Star Wars").then(function (characters) {
	console.log("characters length:", characters.length);
	console.log("characters:", characters[0]);
	console.log("characters:", characters[1]);
	console.log("characters:", characters[2]);
	console.log("characters:", characters[3]);
});






















