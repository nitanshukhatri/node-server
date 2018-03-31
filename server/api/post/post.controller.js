
var Post = require('./post.model');
var mongoose = require('mongoose')

exports.create = function(req, res) {
    if (!req.body.name || req.body.name == '') {
        return res.json(402, common.sendMessage('please enter the name'));
    }
}
