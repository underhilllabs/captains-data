var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
var express = require('express')
  , db = require('./model/db')
  , api = require('./routes/api');
var app = module.exports = express();
app.use(allowCrossDomain);
app.use(express.bodyParser());
app.enable("jsonp callback");

//var mongoose = require( 'mongoose' );
//
//var cptnSchema = new mongoose.Schema({
// name: String,
// source: String,
// votes: Number,
// index: Number,
// image: String,
// ship: String
//});
//var CaptainModel = mongoose.model( 'Captain', cptnSchema );
//mongoose.connect( 'mongodb://localhost/captains' );
//var data = CaptainModel.find();
//console.log("first: " + data[0]);

app.get('/api/captains', api.captains);
app.post('/api/captain', api.addCaptain);
app.put('/api/captain/:id', api.updateCaptain);

var port = 8080;
app.listen(port);
console.log("Express server listenin on port %d", port);
