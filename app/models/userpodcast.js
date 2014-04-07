'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

/**
 * UserPodcast Schema
 */
var UserPodcastSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    following: Boolean,
    starred: Boolean,
    podcast: {
        type: ObjectId,
        ref: 'Podcast'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

/**
 * Statics
 */
UserPodcastSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('UserPodcast', UserPodcastSchema);