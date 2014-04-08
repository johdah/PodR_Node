'use strict';

/**
 *
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

/**
 * UserEpisode Schema
 */
var UserEpisodeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    archived: Boolean,
    rating: {
        type: Number,
        default: 0
    },
    starred: Boolean,
    episode: {
        type: ObjectId,
        ref: 'Episode'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

/**
 * Statics
 */
UserEpisodeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('UserEpisode', UserEpisodeSchema);