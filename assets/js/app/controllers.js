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
			var users = new APP.Collections.Users();
			var tags = new APP.Collections.Tags();
			
			var view = new APP.Views.Users({
				collection: users
			});
			
			var tagsView = new APP.Views.Tags({
				collection: tags
			});
		}
		
	});

})();
