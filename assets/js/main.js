$(function(){
	// alert(document.domain);
	// call the function to setup the pages
	
	// if the document is greater than 580px, checking to support mobile version otherwise
	if (document.width > 580) {
		// setupPages();
	}
	// call the localScroll plugin on the document, allowing both x and y scrolling
	$.localScroll.defaults.axis = 'y';
	  
	// assign the localScroll functionality to the nav ul
	$('header.top nav > ul, .section-buttons').localScroll({
		hash: true
	});
	
	// if anchors have the rel external, open the link in a new window
	$('a[rel*=external]').click( function() { 
		window.open(this.href, '_blank'); return false; 
	});
	
	$('.localScrollLink').click( function () {
	var myLink = $(this).attr('href');
	$('nav a').removeClass('selected');
	$('nav a:[href='+myLink+']').addClass('selected');
	
	});
	
// end ready (init) function
});

/* functions called by document ready */

// function sets up the continuous scrolling page architecture
function setupPages() {
	
	// set the height of the hmtl and body to 100% for the page scrolling architecture
	$('html').addClass('height100');
	$('body').addClass('height100');
	
	
	// get the height of the visible window
	var windowHeight = $(window.top).height();
	// set any elements with the class restrict-height to 80% of the height
	$('.restrict-height').css({"height": windowHeight * .7});
	
	
}

/* function to display twitter feed */
function showUsYourTweets() {

	// setup vars for twitter user and number of tweets
	var user = "ryndel";
	var number = 5;	
	
	// ajax request to query twitter passing the user and number vars
	$.ajax({
	url: "https://twitter.com/status/user_timeline/" + user + ".json?count="+ number,
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


/* helper functions */ 

/* function checks is browser is Chrome */
function isChrome() {
	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	return isChrome;
}

/* function checks if browser supports html local storage */
function hasLocalStorage() {
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
