var app;

// when logic dependencies are loaded
// when logic dependencies are loaded
$(function() {
	
	// initialize APP
	app = new APP();
	window.app = app;
	// start backbone history
	Backbone.history.start();
	
	// call the localScroll plugin on the document, allowing y scrolling only
	$.localScroll.defaults.axis = 'y';
	
	

});