//var Environment = function (env) {
//	this.description = env.description;
//	this.name = env.name;
//	this.picUrl = env.picUrl || "/images/background.png";
//};
//
//module.exports = Environment;

module.exports = {
	create: function (spec) {
		var env = Object.create(this);
		env.description = spec.description;
		env.name = spec.name;
		env.picUrl = spec.picUrl || "/images/background.png";
		return env;
	}
};