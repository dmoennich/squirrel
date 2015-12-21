var Scraper = require("images-scraper");

var scraper = new Scraper.Google();

scraper.list({
	keyword: "banana",
	num: 10,
	detail: false,
	nightmare: {
		show: false
	}
}).then(function (res) {
	console.log(res[0]);
});