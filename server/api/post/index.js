'use strict';

var express = require('express');
var controller = require('./post.controller');
var config = require('../../config/environment');

var router = express.Router();

router.post('/createPost', auth.isAuthenticated(), controller.create);
