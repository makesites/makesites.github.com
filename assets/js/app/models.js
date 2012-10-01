(function(_, Backbone) {
  
	// **Models**: Add as many here as needed...
	
	APP.Models.Main = Model.extend({
		defaults: { }, 
		initialize: function(){
			// call cache on every state change
			
		}
	});
	
	APP.Models.User = Model.extend({
		defaults: { }, 
		initialize: function(){
			// call cache on every state change
			
		}
	});
	
	APP.Models.Tag = Model.extend({
		defaults: { }, 
		initialize: function(){
			// call cache on every state change
			
		}
	});
	
	APP.Collections.Users = Backbone.Collection.extend({
  		model: APP.Models.User,
		url: 'https://api.github.com/orgs/makesites/members',
		initialize: function(){
			// call cache on every state change
			this.fetch();
			
		}, 
			
		// override backbone synch to force a jsonp call
		sync: function(method, model, options) {
			// Default JSON-request options.
			var params = _.extend({
			  type:         'GET',
			  dataType:     'jsonp',
			  url:			model.url,
			  jsonp: 		"jsonpCallback",   // the api requires the jsonp callback name to be this exact name
			  processData:  false
			}, options);
	
			// Make the request.
			return $.ajax(params);
		}

	});
	
	APP.Collections.Tags = Backbone.Collection.extend({
  		model: APP.Models.Tag,
		url: 'https://api.github.com/orgs/makesites/repos?type=public',
		initialize: function(){
			// call cache on every state change
			this.fetch();
			
		},
		
		parse: function( data ){
			
			var tags = {};
			var models = [];
			var max = 0;
			
			for (i in data) {
				var desc = data[i].description;
				//var hashtagRegex = /^#([a-zA-Z0-9]+)/g;
				var matches = desc.match(/(^#|[^&]#)([a-z0-9]+)/gi);
				for (j in matches) {
					var tag = matches[j].substr(2);
					tags[tag] = ( _.isUndefined(tags[tag]) ) ? 1 : tags[tag]+1;	
					if(max < tags[tag]) max = tags[tag];
				}
    
			}
			
			for(tag in tags ){
				var model = { name : tag, count: tags[tag] };
				models.push( model );
				
			}
			// save max
			this.max = max;
			
			return models;
		}, 
		
		// override backbone synch to force a jsonp call
		sync: function(method, model, options) {
			// Default JSON-request options.
			var params = _.extend({
			  type:         'GET',
			  dataType:     'jsonp',
			  url:			model.url,
			  jsonp: 		"jsonpCallback",   // the api requires the jsonp callback name to be this exact name
			  processData:  false
			}, options);
	
			// Make the request.
			return $.ajax(params);
		}

	});



})(this._, this.Backbone);
