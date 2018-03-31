'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var cors=require('cors');
var bodyParser = require('body-parser');
var env = require('dotenv');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, {
  useMongoClient: true,
  /* other options */
});

// Setup server
var app = express();
/* Allows Access To The Api's open*/
app.use(cors());
  /*Extend Limits to 50 mb*/
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
require('./config/express')(app);
require('./routes')(app);

app.listen(config.port, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;