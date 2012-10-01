(function(_, Backbone) {
	
	/* Main layout */
	APP.Views.Main = View.extend({
		// the template file that's used as a resource for the markup
		el: "#main", 
		initialize: function(model, options){ 
			
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'render', 'update', 'clickExternal'); 
			
			// get the data
			this.model = model;
			
			// render the page
			this.render();
			
		},
		// Presentation View rendering
		render: function(){
			
			// remove loading state
			$("body").removeClass("loading");
			
			// return the object for reference
			return this;
		}, 
		// Update the view when a new model is sent
		update: function( model, options ){
			
		}
	});
	
	// Section views (duplicate as needed...)
	APP.Views.Section = View.extend({
		el: "", 
		events: {}, 
		initialize: function(model, options){},
		render: function(){}
	});
	
	
	APP.Views.Users = View.extend({
		el: "#git-members", 
		events: {}, 
		initialize: function(model, options){
			_.bindAll(this, 'render'); 
			
			this.template = Handlebars.compile( $(this.el).find("script").html() );
			this.render();
			this.collection.bind('reset', this.render);
		},
		render: function(){
			var html = this.template( this.collection.toJSON() );
			$(this.el).html( html );
		}
	});
	
	
	APP.Views.Tags = View.extend({
		el: "#tagcloud", 
		events: {}, 
		initialize: function(model, options){
			_.bindAll(this, 'render'); 
			
			this.template = Handlebars.compile( $(this.el).find("script").html() );
			this.render();
			this.collection.bind('reset', this.render);
		},
		render: function(){
			var html = this.template( { tags: this.collection.toJSON() , max : this.collection.max } );
			$(this.el).html( html );
		}
	});
	
	
})(this._, this.Backbone);