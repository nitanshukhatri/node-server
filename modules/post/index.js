'use strict';

var express = require('express');
var controller = require('./post.controller');
var config = require('./../../config/environment');
var auth = require('./../auth/auth.service');
var router = express.Router();

router.post('/create', auth.isAuthenticated(), controller.create);
router.get('/',auth.isAuthenticated(),controller.index);

module.exports = router;