
var Post = require('./post.model');
var mongoose = require('mongoose');
var auth = require('../../auth/auth.service');
var common = require('../common');
//var User = require('./user/user.model');

exports.create = function(req, res) {
    if (req.body.title == '') {
        return res.json(402, common.sendMessage('please enter title'));
    }
    else {
        var post = new Post(req.body);
        post.user_id =req.user._id;
        Post.create(post, function (err, post) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(201, post);
        });
    }
}

// Get list of posts
exports.index = function(req, res) {
    Post.find({user_id: req.user._id},function (err, posts) {
        if(err) { return handleError(res, err); }
        return res.json(200, posts);
    });
};


function handleError(res, err) {
    return res.send(500, err);
}
