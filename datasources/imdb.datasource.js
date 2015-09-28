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
	castPage: function (movieId) {
		return this.base + "/title/" + movieId + "/fullcredits";
	},
	quotesPage: function (movieId) {
		return this.base + "/title/" + movieId + "/trivia?tab=qt";
	},
	synopsisPage: function (movieId) {
		return this.base + "/title/" + movieId + "/synopsis?ref_=tt_stry_pl";
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
		return fetchHtml(IMDB_URL.castPage(movieId));
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
		return fetchHtml(IMDB_URL.quotesPage(movieId));
	})
	.then(function ($quotesPage) {

		var conversations = [];

		var quotes = $quotesPage("#quotes_content .sodatext");
		quotes = Array.prototype.slice.call(quotes, 0);
		quotes = quotes.map(function (quote) {
			var conv = $quotesPage(quote).text();
			conv = conv.replace(/\[[^\]]*\]/g, ""); // removes [....]
			return conv;
		});

		quotes.forEach(function (quote) {
			var conversation = [];
			var characters = {};
			var lines = quote.split("\n");

			// remove empty lines
			lines = lines.filter(function (line) {
				return line.length > 0;
			});

			for (var i = 0; i < lines.length - 2; i += 2) {
				var character = lines[i].substring(0, lines[i].length - 1);
				var line = lines[i + 1].trim();
				conversation.push({
					character: character,
					message: line
				});
				characters[character] = 1;
			}

			// sometimes empty quotes?
			if (Object.keys(characters).length && conversation.length) {
				conversations.push({
					characters: characters,
					lines: conversation
				});
			}

		});

		return conversations;

	});
};


ImdbData.getSynopsis = function (movieTitle) {
	return getMovieIdByTitle(movieTitle)
	.then(function (movieId) {
		return fetchHtml(IMDB_URL.synopsisPage(movieId));
	})
	.then(function ($synPage) {
		var synopsis = $synPage("#swiki_body").text();

		//remove things in brackets, mostly actor names
		synopsis = synopsis.replace(/\([^\)].*?\)/g, "");

		//remove tags
		synopsis = synopsis.replace(/<(?:.|\n)*?>/g, "");

		return synopsis;
	});
};


// ImdbData.getMovieQuotes("Star Wars").then(function (quotes) {
// 	console.log("quotes length:", quotes.length);
// 	console.log(quotes[0]);
// });


// ImdbData.getSynopsis("Star Wars").then(function (syn) {
// 	console.log("Synopsis:", syn);
// });


// ImdbData.getMovieCharacters("Star Wars").then(function (characters) {
// 	console.log("characters length:", characters.length);
// 	console.log("characters:", characters[0]);
// 	console.log("characters:", characters[1]);
// 	console.log("characters:", characters[2]);
// 	console.log("characters:", characters[3]);
// });






















