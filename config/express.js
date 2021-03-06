/**
 * Express configuration
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(app) {
  var env = app.get('env');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  if ('production' === env) {
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(errorHandler()); // Error handler - has to be last
  }
};