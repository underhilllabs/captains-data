var express = require('express'),
  api = require('./routes/api');
var app = module.exports = express();
app.enable("jsonp callback");
app.get('/api/captains', api.captains);

var port = 8080;
app.listen(port);
console.log("Express server listenin on port %d", port);
