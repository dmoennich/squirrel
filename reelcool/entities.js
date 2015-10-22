var entities = function () {

  this.title = "Reel Cool";

  this.place = {
    name: "Grace Hopper Hall"
  };

  this.quotes = {
    "Kathy": [
      "Kathy line 1",
      "Kathy line 2"
    ],
    "Steve": [
      "Steve line 1",
      "Steve line 2"
    ],
    "Daniel": [
      "Daniel line 1",
      "Daniel line 2"
    ],
    "Cristina": [
      "Cristina line 1",
      "Cristina line 2"
    ]
  };

  this.events = [{
    name: "FFMPEG monster"
  }, {
    name: "CSS fairy"
  }, {
    name: "Katy Perry"
  }, {
    name: "Bison"
  }, {
    name: "Snow groomer"
  }];

};

module.exports = entities;