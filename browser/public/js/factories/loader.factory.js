app.factory("LoaderSpinner", function () {

	var loader = {};

	loader.el = angular.element(document.querySelector('#loader'));


	loader.show = function () {
		this.el.css("display", "block");
	};


	loader.hide = function () {
		this.el.css("display", "none");
	};

	return loader;

});