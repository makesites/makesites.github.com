var app;

// when logic dependencies are loaded
$(document).ready(function() {

	// initialize APP
	app = new APP();
	window.app = app;
	// start backbone history
	Backbone.history.start();

});
