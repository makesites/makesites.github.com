$(function(){
	
	setupPages();
	
	showUsYourTweets();
	
	setupLocalStorage();
	
	
	
	/* page event listeners */
	
	
	
	// call the localScroll plugin on the document, allowing both x and y scrolling
	$.localScroll.defaults.axis = 'xy';
	  
	// assign the localScroll functionality to the nav ul
	$('nav#master > ul').localScroll({
		hash: true
	});
	
	
	
	
	/* when the nav links are clicked, disable overflow hidden so the scroll functionality can work */
	/*$('.localScrollLink').click(function() {
		console.log("Im hit");
  		$("#main").removeClass('oh');
		
		return false;
	/*}, function() {
		alert("im called");
		$("#main").addClas('oh');*/
	

	/* });*/
	
	
	/*$("#process:onScreen")(function() {
		alert("Now you see me");
	});*/
	
	
	
// end ready
});

/* functions called by document ready */

/* function sets up the page architecture for the continuous scrolling page architecture */
function setupPages() {
	// when the page is loaded, add overflow hidden to the main div so you don't get the scroll bars on the outer container
	// $("#main").addClass('oh');
	
	// get the height of the visible window
	var windowHeight = $(window.top).height();
	// set any elements with the class restrict-height to 80% of the heigh
	$('.restrict-height').css({"height": windowHeight * .8});
	
	// set the width of the page-outer-container and the page to the document width - we want the pages to be 100%
	$('.page-outer-container').css({"width": document.width});
	$('.page').css({"width": document.width});
	// hack to be fixed later
	// if the browser is Chrome, support the 2 up and 3 up tiling architecture.
	if (isChrome) {
		$('.page-inner-container').css({"width": document.width * 1});
	// otherwise, the pages should just go down the window vertically :(
	} else {
		$('.page-inner-container').css({"width": document.width * 1});
	}
	
	
	
}

/* function to setup local storage functionality */
function setupLocalStorage() {
if (supports_html5_storage) {
		var theme = "theme1";
		localStorage.setItem("theme", theme);
	} 
	
	if (supports_html5_storage) {
		var myTheme = localStorage.getItem("theme");
		console.log(myTheme);
		$('body').addClass(myTheme);
	}
}


/* function to display twitter feed */
function showUsYourTweets() {

	// setup vars for twitter user and number of tweets
	var user = "ryndel";
	var number = 20;	
	
	// ajax request to query twitter passing the user and number vars
	$.ajax({
	url: "http://twitter.com/status/user_timeline/" + user + ".json?count="+ number,
	dataType: 'jsonp',
    async: true,
    success: function(data, textStatus, request) {
		
        
		// loop thru the data from the ajax request
		$.each(data, function(i, el){
			// pass the returned date thru the prettyDate helper function
			var myDate = prettyDate(el.created_at);
			// pagg the returned text thry the linkify helper function to convert any links contained in the text to propper hrefs
			var myText = linkify(el.text);
			
			// append the text and date to the element with the id of twitterfeed 
			$("#twitterfeed").append("<p>" + myText + " <span class='date'>" + myDate + "</span></p>");
		});
    },
    error: function(request, status, error) {
        
    }
});


}


/* helper functions 
These are functions that I borrowed from the internet, so my commenting is minimal here, to just what the function actually does
*/


/* function checks is browser is Chrome */
function isChrome() {
	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	return isChrome;
}

/* function checks if browser supports html local storage */
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

/* function takes a date and formats it in friendly english */
function prettyDate(time) {
	var date = new Date((time || "")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 8 && Math.ceil( day_diff / 7 ) + " week ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

/* function takes links in strings and makes them into proper hrefs */
function linkify(text) {
    text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
        return '<a href="' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)@(\w+)/gi, function (s) {
        return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)#(\w+)/gi, function (s) {
        return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
     });
    return text;
}


// function to check is something is on screen
function amIOnScreen(elem) {
	
    var $window = $(window)
    var viewport_top = $window.scrollTop()
    var viewport_height = $window.height()
    var viewport_bottom = viewport_top + viewport_height
    var $elem = $(elem)
    var top = $elem.offset().top
    var height = $elem.height()
    var bottom = top + height

    return (top >= viewport_top && top < viewport_bottom) ||
           (bottom > viewport_top && bottom <= viewport_bottom) ||
           (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
  }

	
	
	


