Handlebars.registerHelper("fontSize", function(count, max){
	
	var maxEm = 3;
	var size = (count/max) * maxEm;
	return size+"em";
	
});