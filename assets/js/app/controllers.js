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
			
			var data = {
				users : users,
				tags : tags 
			}
			
			var view = new APP.Views.Main({
				data: data
			});
			
		}
		
	});

})();
