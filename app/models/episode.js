'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

/**
 * Episode Schema
 */
var EpisodeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Date,
        default: Date.now
    },
    podcast: {
        type: Schema.ObjectId,
        ref: 'Podcast'
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    guid: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String
    },
    author: {
        type: String
    },
    duration: {
        type: Number,
        default: -1
    },
    imageTitle: {
        type: String
    },
    imageUrl: {
        type: String
    },
    enclosureLength: {
        type: Number,
        default: -1
    },
    enclosureType: {
        type: String
    },
    enclosureUrl: {
        type: String
    },
    block: Boolean,
    explicit: Boolean,
    closedcaptioned: Boolean,
    userEpisodes: [{
        type: ObjectId,
        ref: 'UserEpisode'
    }]
});

/**
 * Validations
 */
EpisodeSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique.' });

/**
 * Statics
 */
EpisodeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('podcast', 'title guid').exec(cb);
};

mongoose.model('Episode', EpisodeSchema);