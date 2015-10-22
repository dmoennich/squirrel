var entities = function() {

  this.title = "Reel Cool";

  this.place = {
	name: "Grace Hopper Hall"
  };

  this.intro = "Hello everyone, we are Reel Cool. I'm Kathy Lu, this is \
	Stephen Spellman, Cristina Colon and Daniel Moennich.";

  this.outro = "Visit reelcool.co to make your own awesome movie! Thank you!";

  this.quotes = {};

  this.quotes.Kathy = {
	startLine: "Our goal was to make an Instagram for video editing.",
	lines: ["Reel Cool has a left-to-right workflow. On the left, \
		you can click 'Add Videos' and upload files from your computer or your phone.",
		"Videos are immediately embedded on the webpage so you can start to work with \
		them right away.", "We used the browser’s FileReader API and the experimental \
		MediaSource API to make that happen.",
		"Further down on the left panel, you can upload music for the soundtrack of your \
		movie."
	],
	endLine: "Steve will tell you more about the studio and the reel."
  };


  this.quotes.Steve = {
	startLine: "Thanks, Kathy!",
	lines: ["Once the user has some uploaded videos, clicking \
		on one will pull it into the Studio, where they can edit start and end \
		times, and add filters.", "To apply these filters in real time, we \
		considered doing it in a few ways; we originally thought about using \
		a canvas to capture the video’s image data, alter it, and then display \
		it every 10 ms.", "In the end, we found CSS3 filters were far more \
		performant and easier to work with. We just apply them directly to the \
		video element itself.", "To create a clip, just click 'cut to Reel', that \
		clip gets the times and filters attached to it", "It is sent to \
		the bin on the right which represents the string of cuts for your \
		final movie.", "You can of course bring those clips back in if you want to \
		change them.", "When you’re ready to take a peek at the whole sequence, \
		just select an audio track (or use the original audio) and click on \
		'Preview' which brings up a real-time playback of your montage."],
	endLine: "And I’ll let Dan talk a little bit more about that preview \
		player and why it’ s real cool."
  };


  this.quotes.Daniel = {
	startLine: "Thanks, Steve!",
	lines: ["For the Preview we tried out different techniques \
		to encode the video in the browser, but we experienced low performance, \
		low quality or restrictions merging custom audio tracks.", "Instead, we take \
		advantage of the existing video elements. The HTML5 Video API allowed us to \
		control which parts of each clip to show, and our app manages the sequence.",
		"When you're happy with your masterpiece, you can download a copy to keep or \
		share with the world.", "When you request a download, just a set of instructions \
		is send to the server, containing the DB IDs of the video files, start-/end \
		times and the filters.", "On the server ffmpeg is used to create the video \
		based on these instructions."],
	endLine: "More on this from Cristina."
  };


	this.quotes.Cristina = {
		startLine: "Thanks Daniel.",
		lines: ["Our downloaded video looks just like the one you \
		saw earlier even though they were made with entirely different systems.",
		"This one is an mp4 file encoded with ffmpeg, while the preview video was \
		pure trickery.", "We pulled this off by carefully configuring the filters \
		on both sides.", "Finally, if editing each clip individually sounds like too \
		much work, you’ll like this next feature. With the click of a button, \
		Reel Cool will generate a themed montage, set to music, that you can enjoy \
		right away.", "Although we didn’t start out planning to make this feature, it \
		was fairly easy to implement because it re-used all the existing mechanics \
		for making custom videos."],
		endLine: "And now, let’s roll the tape!"
	};


  this.events = [
	"FFMPEG monster",
	"CSS fairy",
	"Katy Perry",
	"Bison",
	"Design",
	"Snow groomer",
	"webm file",
	"Antimatter 15",
	"Spotify",
	"Indiana Jones",
	"Highballstepper",
	"Instagram",
	"Trickery",
	"Micro management",
	"Bunny",
	"Ostrich"
  ];

  this.bkgUrls = [
	// "/images/reelcool/katy.png",
	// "/images/reelcool/bunny.png",
	// "/images/reelcool/flower.png",
	"/images/reelcool/reelbkg.gif",
  ];

};

module.exports = entities;