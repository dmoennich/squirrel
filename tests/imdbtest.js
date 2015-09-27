var request = require("request");
var cheerio = require("cheerio");
var Promise = require("bluebird");
var querystring = require("querystring");

var ImdbData = {};
module.exports = ImdbData;

var IMDB_URL = {
	base: "http://www.imdb.com/",
	findByTitle: function (title) {
		return this.base + "find?ref_=nv_sr_fn&s=all&q=" + querystring.escape(title);
	}
};

ImdbData.getBasicMovieData = function (movieTitle) {

	return new Promise(function (resolve, reject) {

		request(IMDB_URL.findByTitle(movieTitle), function(error, response, html){
			if (error) {
				return reject(error);
			}

			var $ = cheerio.load(html);

			console.log($(".findResult a"));


		});

	});

};






















