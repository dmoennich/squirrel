var webSearch = require("google");

webSearch.resultsPerPage = 3;
var nextCounter = 0;

webSearch('truck', function (err, next, links){
  if (err) console.error(err);

  for (var i = 0; i < links.length; ++i) {
	console.log(links[i].title + ' - ' + links[i].link); // link.href is an alias for link.link
	console.log(links[i].description + "\n");
  }

 //  if (nextCounter < 4) {
	// nextCounter += 1;
	// if (next) {
	// 	next();
	// }
 //  }
});
