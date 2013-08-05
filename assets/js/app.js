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
	
})(this._, this.Backbone);;/* =============================================================
 * bootstrap-scrollspy.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);;/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);;Handlebars.registerHelper("fontSize", function(count, max){
	
	var maxEm = 3;
	var size = (count/max) * maxEm;
	return size+"em";
	
});;(function() {

	// Routers
	APP.Routers.Default = APP.Router.extend({
		data: {}, 
		initialize: function() {
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'index');
			// initialize other monitoring scripts 
			$('.navbar').scrollspy();
			
		}, 
		routes: {
			"": "index",
			":page": "index"
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
;(function(_, Backbone) {
  
	// **Models**: Add as many here as needed...
	
	APP.Models.Main = APP.Model.extend({
		defaults: { }, 
		initialize: function(){
			// call cache on every state change
			
		}
	});
	
	APP.Models.User = APP.Model.extend({
		defaults: { }, 
		initialize: function(){
			// call cache on every state change
			
		}
	});
	
	APP.Models.Tag = APP.Model.extend({
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
		}
	});



})(this._, this.Backbone);
;(function(_, Backbone) {
	
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