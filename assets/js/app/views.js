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
			_.bindAll(this, 'render', 'clickExternal', 'selectLink', 'bgChange');
			$(window).scroll(this.bgChange); 
			
			this.views = {};
			
			this.backgrounds = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];
			
			this.pageHeight = $(window).height();
			
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
		
		
		bgChange: function() {
			// pageHeight
			var st = $(window).scrollTop();
			var diff = st/(2*this.pageHeight);
			var index = Math.floor( diff );
			
			if(typeof this.backgrounds[index] == "undefined") return;
			// only update closer to the change of the page
			//if( (diff-index > 0.98) || (diff-index) < 0.1 ){ 
			console.log("change");
				$("body").css('background-image', 'url(/assets/img/'+this.backgrounds[index]+')');
			//}
			
			/*if ( this.checkVisible($(".page#meet") )) {
				// console.log("You can see me");
				// console.log($(window).height());
				// console.lgo()
				$("body").css('background-image', 'url("http://placekitten.com/1900/1200")');
				
			}*/
			
			
		},
		
		//checkVisible: function ( elm ) {
//    		var vpH = $(window).height(), // Viewport Height
//        	st = $(window).scrollTop(), // Scroll Top
//        	y = $(elm).offset().top;
//
//    		return (y < (vpH + st));
//		},
		
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