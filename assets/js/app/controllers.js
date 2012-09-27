(function() {

	// Routers
	APP.Routers.Default = Router.extend({
		data: {}, 
		initialize: function() {
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'index'); 
			
		}, 
		routes: {
			"": "index",
		}, 
		index: function(){
			console.log("I'm in index");
			// do something...
			//APP.Collections.Main
			//APP.Views.Main
		}
		
	});

})();
