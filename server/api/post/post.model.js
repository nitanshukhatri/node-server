'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    user_id: String,
    image: {type:String,default:''},
    title: {type:String, required: true},
    Subtitle:{type:String,default:''},
    Status:{type:Boolean,default:1},
    Tags:[],
    Views:{type:Number,default:0},
    created: {type: Date, default: Date.now }


},{versionKey: false});

PostSchema.path('title').validate(function(v) {
    return v.length > 5 && v.length < 70;
});

PostSchema.set('versionKey',false);
module.exports = mongoose.model('posts', PostSchema);