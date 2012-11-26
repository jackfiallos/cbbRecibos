
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , app = module.exports = express();

require('./configuration')(app, express, path);
require('./routes')(app);

mongoose.connect('mongodb://localhost/cbb');

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
