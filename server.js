var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var usersRoute = require('./server/modules/users/route');

// mongoose.connect("mongodb://127.0.0.1:27017/events", function(err){
	// console.log("DB Connected ");
// }); // connect to database

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", usersRoute);

var port = process.env.port || 8000;

app.use(express.static(__dirname));

app.listen(port, function(){
	console.log("Server started on port " + port);
});