var Scraper = require("images-scraper");

// var scraper = new Scraper.Google();

// scraper.list({
// 	keyword: "banana",
// 	num: 10,
// 	detail: false,
// 	nightmare: {
// 		show: false
// 	}
// }).then(function (res) {
// 	console.log(res[0]);
// });

var Scraper = require ('images-scraper')
  , bing = new Scraper.Bing();

bing.list({
	keyword: 'banana',
	num: 10,
	detail: true
})
.then(function (res) {
	console.log('first 10 results from bing', res);
}).catch(function(err) {
	console.log('err',err);
})