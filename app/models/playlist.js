'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

/**
 * Playlist Schema
 */
var PlaylistSchema = new  Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */
PlaylistSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Playlist', PlaylistSchema);