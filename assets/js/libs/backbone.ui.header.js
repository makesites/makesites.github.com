// Backbone.js Header extension
//
// Created by: Lyndel Thomas (@ryndel)
// Source: https://github.com/backbone-ui/header
//
// Licensed under the MIT license: 
// http://makesites.org/licenses/MIT

(function(_, Backbone) {
	
	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	// Support backbone app (if available)
	var View = ( typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	
	Backbone.UI.Header = View.extend({
		
		el : 'body',
		
		options : {
			headerEl : ".top",
			mainEl : ".main",
			detatch : false,
			detatchOffset : 0,
			hide : false,
			hideDir : "down",
			// hideOffset : 0,
		},
		
		events: {
			// "scroll" : "headerScroll",
		},
		
		headerScroll: function() {
			
			this.lastScroll = this.lastScroll || 0;
			// calculate the direction of scroll
			
			var scrollTop = $(window).scrollTop();
			if (scrollTop > this.lastScroll){
				// downscroll code
				this.scrollDir = "down";
				
			} else {
				this.scrollDir = "up";
			}
			this.lastScroll = scrollTop;
		
			
			
			// if plugin option hide is true
			if (this.options.hide) {
				
				// if option direction is down
				if ( this.options.hideDir == "down" ) {
					
					// check if user scroll dir is down and window is not at top
					if ( (this.scrollDir == "down") && scrollTop > 0 ) {
						
						$( this.options.headerEl ).addClass("ui-header-hide");
						this.translateTop(-1*$(this.options.headerEl).height());
						
					} else {
						$( this.options.headerEl ).removeClass("ui-header-hide");
						this.translateTop();
					}
				}
				
				// if option direction is up
				if ( this.options.hideDir == "up" ) {
					
					if ( (this.scrollDir == "up") && scrollTop > 0 ) {
						$( this.options.headerEl ).addClass("ui-header-hide");
						this.translateTop(-1*$(this.options.headerEl).height());
						
					} else {
						$( this.options.headerEl ).removeClass("ui-header-hide");
						this.translateTop();
					}
				}
			}
			
			// if plugin option detatch is true
			if (this.options.detatch && !$(this.options.headerEl).hasClass("ui-header-hide")) {
			
				// check if amount of user scroll is greater than the detatchOffset amount set in options
				if (scrollTop > this.options.detatchOffset) {
					$( this.options.headerEl ).addClass("detatch");
				}
		
				else {
					$( this.options.headerEl ).removeClass("detatch");
				}
			}
			
		},
		
		initialize: function(model, options){
			
			_.bindAll(this, 'render', 'headerScroll'); 
			$(window).scroll(this.headerScroll); 
		
		},
		
		translateTop: function(pixels){
			pixels = pixels || 0;
			$( this.options.headerEl ).css("-webkit-transform", "translate(0,"+ pixels +"px)");
			$( this.options.headerEl ).css("-moz-transform", "translate(0,"+ pixels +"px)");
			$( this.options.headerEl ).css("-o-transform", "translate(0,"+ pixels +"px)");
			$( this.options.headerEl ).css("transform", "translate(0,"+ pixels +"px)");
			
		},
		
		
	});
	
})(this._, this.Backbone);