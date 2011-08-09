/*
 * jQuery Slidawall Plugin v0.1
 * http://makesit.es/
 *
 * Copyright 2011, Makis Tracend
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function( $ ){

  var methods = {
     init : function( options ) {

       return this.each(function(){
         
         var $this = $(this),
		 	 wall = $this.find("ul"), 
		 	 thumbs = wall.find("li"), 
		 	 captions = $this.find(".captions article"); 
             
			 
			 $this.data('slidawall', {
               width : wall.width(),
               height : wall.height(),
			   thumbs : thumbs.length
           });
		 
		 if( thumbs.length > 0){ 
			 // find dimensions 
			 methods.grid.apply( $this );
			 // set the thumbnails
			 methods.thumbs.apply( $this );
		 }
		 
		 if( captions.length > 0){ 
			captions.each(function(){
				$(this).hide();
			});
		 }
		 
		 methods.perspective.apply( $this );

       });
     },
     perspective : function( ) {

       return this.each(function(){

         var $this = $(this),
		 	 wall = $this.find("ul"), 
             data = $this.data('slidawall');

		$this.mousemove(function(e){

			cx = Math.ceil($('body').width() /2);
			cy = Math.ceil($('body').height() /2);
			dx = event.pageX - cx;
			dy = event.pageY - cy;
			
			tiltx = (dy / cy) /4;
			tilty = - (dx / cx);
			radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
			degree = (radius * 50);
			
			// apply transformation
			wall.css('-webkit-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
			wall.css('transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
	 
		  });

		  $this.mouseleave(function(){
				wall.css("-webkit-transform", "rotate3d(0,1,0, 0deg)");
    			wall.css("transform", "rotate3d(0,1,0, 0deg)");
			  }
			);
       })

     },
     grid : function( ) { 
		
       return this.each(function(){

         var $this = $(this),
             data = $this.data('slidawall');
		
		
	 	// automatically support layouts up to 4x4 favoring landscape version
		var grids = [
			{'x': 1, 'y': 1},
			{'x': 2, 'y': 1},
			{'x': 2, 'y': 2},
			{'x': 3, 'y': 2},
			{'x': 3, 'y': 3},
			{'x': 4, 'y': 3},
			{'x': 4, 'y': 4}
		];	
		
		for(i in grids){
			var grid = grids[i];
			// stop once we've found a grid that can contain our thumbnails
			if( grid.x * grid.y >= data.thumbs ) break;
			//console.log(grids[i].x);
		}
		
		// add the new options
		data.grid = grid;
		data.thumb_width = data.width/grid.x,
		data.thumb_height = data.height/grid.y;
		$this.data('slidawall', data);

       })

	 },
     thumbs : function( ) {

       return this.each(function(k){

         var $this = $(this),
             data = $this.data('slidawall');
			 wall = $this.find("ul"), 
		 	 thumbs = wall.find("li"), 
		 	 captions = $this.find(".captions article"); 
             
		  thumbs.each(function(k,v){
			  // set the z-index to 1
			  $(v).css("z-index", 10);
			  
			  // find the relative position based on the grid
			  var posX = k+1, posY = 1;
			  while( posX > data.grid.x){
				  posX -= data.grid.x
				  posY += 1;
			  }
			  // save the data for later
			  $(v).data("posX", (posX-1)*data.thumb_width);
			  $(v).data("posY", (posY-1)*data.thumb_height);
			  $(v).data("zIndex", $(v).css("z-index"));
			  $(v).data("num", k+1);

			  // set the dimensions
			  $(v).css("width", data.thumb_width);
			  $(v).css("height", data.thumb_height);
			  $(v).css("left",  $(v).data("posX"));
			  $(v).css("top",  $(v).data("posY"));
			  
			  $(v).toggle(
				  function () {
					// stop any other animation that is queued
					//thumbs.each(function(){ $(this).css("z-index", 0).stop(true); });
					$(this).css("z-index", 99).animate({
						width: data.width, 
						height: data.height,
						top: 0,
						left: 0
					  }, { "duration": 500, "easing": "easeOutQuad" }, function() {
						// Animation complete.
					});
					captions.siblings("article:nth-child("+$(this).data("num")+")").show();
				}, 
				function(){
					$(this).animate({
						width: data.thumb_width, 
						height: data.thumb_height,
						top: $(this).data("posY"),
						left: $(this).data("posX"), 
						zIndex: $(this).data("z-index")
					  }, { "duration": 500, "easing": "easeOutQuad", queue: false }, function() {
						// Animation complete.
					});
					captions.hide();
				});
		  });
		  
		  $this.mouseleave(function () {
			thumbs.each( function(){
					
				$(this).animate({
						width: data.thumb_width, 
						height: data.thumb_height,
						top: $(this).data("posY"),
						left: $(this).data("posX"), 
						zIndex: $(this).data("z-index")
					  }, { "duration": 500, "easing": "easeOutQuad", queue: false }, function() {
						// Animation complete.
					});
				});

			 captions.each(function(){
				$(this).hide();
			});
		});
			
       });

     },
     destroy : function( ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('slidawall');

         // Namespacing FTW
         //$(window).unbind('.slidawall');
         data.slidawall.remove();
         $this.removeData('slidawall');

       })

     }
  };

  $.fn.slidawall = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.slidawall' );
    }    
  
  };

})( jQuery );