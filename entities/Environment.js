var Environment = function (env) {
	this.description = env.description;
	this.name = env.name;
	this.picUrl = env.picUrl || "/images/background.png";
};

module.exports = Environment;
