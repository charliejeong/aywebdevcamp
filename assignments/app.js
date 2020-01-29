var express = require("express"),
	app 	= express();

console.log(__dirname);
app.get('/', function (req, res) {
res.sendFile(__dirname + '/HTML-PersonalSite/index.html');
});



//tell express to listen for requests
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The server has started!");
});