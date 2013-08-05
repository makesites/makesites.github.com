(function(_, Backbone) {
	
	/* Main layout */
	APP.Views.Main = APP.View.extend({
		// the template file that's used as a resource for the markup
		el: "body", 
		
		events: {
			"click a[rel='external']" : "clickExternal",
			"click .link": "selectLink",
			"scroll" : "bgChange"
		},
		
		
		 initialize: function(options){ 
			
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'render', 'clickExternal', 'selectLink', 'bgChange', 'preloader', 'monitorHeight');
			$(window).scroll(this.bgChange); 
			
			this.views = {};
			
			this.backgrounds = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg"];
			
			this.preloader();
			
			this.monitorHeight();
			
			this.views.users = new APP.Views.Users({
				collection: options.data.users
			});
			
			this.views.tags = new APP.Views.Tags({
				collection: options.data.tags
			});
			
			// assign the localScroll functionality to the nav ul
			$(this.el).find('header.top nav > ul, .section-buttons, .localscroll').localScroll({
				hash: true
			});
			
			header: new APP.Views.Header({
						detatch : true,
						hide : true
			});
			
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
		
		
		preloader: function() {

			imageObj = new Image();
		
			for(i in this.backgrounds) {
			 	imageObj.src='/assets/img/backgrounds/'+this.backgrounds[i];
			 }
		},
		
		bgChange: function() {
			// pageHeight
			var st = $(window).scrollTop();
			var diff = st/(2*this.pageHeight);
			var index = Math.floor( diff );
			console.log(this.pageHeight);
			if(typeof this.backgrounds[index] == "undefined") return;
				
				$("body").css('background-image', 'url(/assets/img/backgrounds/'+this.backgrounds[index]+')');
		},
		
		monitorHeight: function(){
			var self = this;
			this.pageHeight = $(window).height();
			$(window).resize(function(){
				// console.log("resize");
				self.pageHeight = $(window).height();
			});
		}, 
		
		clickExternal: function(e){
			e.preventDefault();
			var href = this.findLink(e.target);
			window.open(href, '_blank'); return false; 
		},
		
		selectLink: function (e) {
			var myLink = this.findLink(e.target);
			$(this.el).find('nav li').removeClass('active');
			$(this.el).find('nav a:[href='+myLink+']').closest("li").addClass('active');
		},
		
		findLink: function (obj) {
			if (obj.tagName != "A") {
				return $(obj).closest("a").attr("href");
			} else {
				return $(obj).attr("href");
			}
		}
	
	});
	
	APP.Views.Header = Backbone.UI.Header.extend({
	});
	
	APP.Views.Users = APP.View.extend({
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
	
	
	APP.Views.Tags = APP.View.extend({
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