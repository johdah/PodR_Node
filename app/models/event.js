'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  extend = require('mongoose-schema-extend'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

var EventSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  occurred: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  user: {
      type: Schema.ObjectId,
      ref: 'User'
  }
}, { collection : 'events', discriminatorKey : '_type' });

var NewEpisodeEventSchema = EventSchema.extend({
  episode: {
      type: Schema.ObjectId,
      ref: 'Episode'
  },
});

mongoose.model('Event', EventSchema),
mongoose.model('NewEpisodeEvent', NewEpisodeEventSchema);
