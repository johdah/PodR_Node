'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	http = require('http'),
  Episode = mongoose.model('Episode'),
	Podcast = mongoose.model('Podcast'),
	UserPodcast = mongoose.model('UserPodcast'),
	FeedParser = require('feedparser');

/**
 * Find podcast by id
 */
exports.podcast = function(req, res, next, id) {
	Podcast.load(id, function(err, podcast) {
		if(err) return next(err);
		if(!podcast) return next(new Error('Failed to load podcast ' + id));
		req.podcast = podcast;
		next();
	});
};

/**
 * List of podcasts
 */
exports.all = function(req, res) {
	Podcast.find().sort('title').exec(function(err, podcasts) {
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(podcasts);
		}
	});
};

/**
 * List of followed podcasts
 */
exports.allFollowed = function(req, res) {
	UserPodcast.find({ user: req.user, following: true }).populate('podcast').sort('title').exec(function(err, up) {
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(up);
		}
	});
};

/**
 * List of liked podcasts
 */
exports.allLiked = function(req, res) {
    UserPodcast.find({ user: req.user, rating: 1 }).populate('podcast').sort('title').exec(function(err, up) {
        if(err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(up);
        }
    });
};

/**
 * List of starred podcasts
 */
exports.allStarred = function(req, res) {
    UserPodcast.find({ user: req.user, starred: true }).populate('podcast').sort('title').exec(function(err, up) {
        if(err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(up);
        }
    });
};

/**
 * Add a podcast
 */
exports.create = function(req, res) {
	var podcast = new Podcast(req.body);

    var up = new UserPodcast();
    up.podcast = podcast;
    up.user = req.user;
    up.following = true;

    podcast.userPodcasts.push(up);
	podcast.save(function(err) {
		if(err) {
			return res.send('users/signup', {
				errors: err.errors,
				podcast: podcast
			});
		} else {

			res.jsonp(podcast);
		}
	});
};

/**
 * Delete a podcast
 */
exports.destroy = function(req, res) {
	var podcast = req.podcast;

	podcast.remove(function(err) {
		if(err) {
			return res.send('users/signup', {
				errors: err.errors,
				podcast: podcast
			});
		} else {
			res.jsonp(podcast);
		}
	});
};

/**
 * Fetch updates from the podcast feed
 */
exports.fetch = function(req, response) {
    var podcast = req.podcast;
    var episodes = [];

    http.get(podcast.url, function(res) {
        res.pipe(new FeedParser({}))
            .on('error', function(error) {
                response.jsonp({
                    success: false,
                    error: error
                });
            })
            .on('meta', function(meta) {
                // TODO: Error handling
                if(meta['itunes:author'] !== undefined)
                    podcast.author = meta['itunes:author']['#'];

                if(meta['itunes:block'] !== undefined)
                    podcast.block = (meta['itunes:block']['#']).toLowerCase() === 'yes';
                if(meta['itunes:complete'] !== undefined)
                    podcast.complete = (meta['itunes:complete']['#']).toLowerCase() === 'yes';
                podcast.copyright = meta.copyright;

                // TODO: Probably not a good if-case
                if(meta['itunes:summary'] !== undefined)
                    podcast.description = meta['itunes:summary']['#'];
                else
                    podcast.description = meta.description;

                if(meta['itunes:explicit'] !== undefined)
                    podcast.explicit = (meta['itunes:explicit']['#']).toLowerCase() === 'yes';

                podcast.imageTitle = meta.image.title;
                podcast.imageUrl = meta.image.url;
                podcast.language = meta.language;
                podcast.link = meta.link;

                if(meta['itunes:owner'] !== undefined) {
                    if(meta['itunes:owner']['itunes:email'] !== undefined)
                        podcast.ownerEmail = meta['itunes:owner']['itunes:email']['#'];
                    if(meta['itunes:owner']['itunes:name'] !== undefined)
                        podcast.ownerName = meta['itunes:owner']['itunes:name']['#'];
                }

                if(meta['itunes:subtitle'] !== undefined)
                    podcast.subtitle = meta['itunes:subtitle']['#'];

                if(meta['itunes:new-feed-url'] !== undefined)
                    podcast.url = meta['itunes:new-feed-url']['#'];

                podcast.title = meta.title;
                podcast.updated = Date.now();
            })
            .on('readable', function() {
                var stream = this, item;
                while (item = stream.read()) {
                    // Each 'readable' event will contain one episode
                    var episode = new Episode();
                    episode.created = podcast.updated;
                    episode.title = item.title;
                    episode.podcast = podcast;
                    episode.guid = item.guid;
                    episode.published = item.pubDate;
                    episode.imageTitle = item.image.title;
                    episode.imageUrl = item.image.url;

                    if (item['itunes:author'] !== undefined)
                        episode.author = item['itunes:author']['#'];

                    if (item['itunes:block'] !== undefined)
                        episode.block = (item['itunes:block']['#']).toLowerCase() === 'yes';

                    if (item['itunes:duration'] !== undefined) {
                        episode.duration = stringTimeToSeconds(item['itunes:duration']['#']);
                    }

                    if(item['itunes:explicit'] !== undefined)
                        episode.explicit = (item['itunes:explicit']['#']).toLowerCase() === 'yes';

                    if(item['itunes:isClosedCaptioned'] !== undefined)
                        episode.closedcaptioned = (item['itunes:isClosedCaptioned']['#']).toLowerCase() === 'yes';

                    if(item['itunes:block'] !== undefined)
                        episode.block = (item['itunes:block']['#']).toLowerCase() === 'yes';

                    if(item['itunes:subtitle'] !== undefined)
                        episode.subtitle = item['itunes:subtitle']['#'];

                    // TODO: Probably not a good if-case
                    if(item['itunes:summary'] !== undefined)
                        episode.description = item['itunes:summary']['#'];
                    else
                        episode.description = item.description;

                    if(item['rss:enclosure'] !== undefined) {
                        if(item['rss:enclosure']['@'].length !== undefined)
                            episode.enclosureLength = item['rss:enclosure']['@'].length;
                        if(item['rss:enclosure']['@'].type !== undefined)
                            episode.enclosureType = item['rss:enclosure']['@'].type;
                        if(item['rss:enclosure']['@'].url !== undefined)
                            episode.enclosureUrl = item['rss:enclosure']['@'].url;
                    }

                    podcast.episodes.push(episode);
                    episodes.push(episode);
                }
            })
            .on('end', function() {
                episodes.forEach(function(episode) {
                    Episode.count({guid: episode.guid}, function (err, count) {
                        if(count === 0) {
                            episode.save(function(err) {
                                if(err)
                                    console.log(err);
                            });
                        }
                    });
                });

                podcast.save(function(err) {
                    if(err) {
                        response.jsonp({
                            success: false,
                            error: err
                        });
                    } else {
                        response.jsonp({
                            success: true,
                            newEpisodesCount: episodes.length,
                            episodes: episodes,
                            podcast: podcast
                        });
                    }
                });
            });
    });
};

/**
 * Get an UserPodcast
 */
exports.getUserPodcast = function(req, res) {
    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err)
            res.jsonp(err);
        else
            res.jsonp(up);
    });
};

/**
 * Show a podcast
 */
exports.show = function(req, res) {
    res.jsonp(req.podcast);
};

/**
 * Update a podcast
 */
exports.update = function(req, res) {
    var podcast = req.podcast;

    podcast = _.extend(podcast, req.body);

    podcast.save(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                podcast: podcast
            });
        } else {
            res.jsonp(podcast);
        }
    });
};

/* Actions */

/**
 * Dislike podcast
 */
exports.dislikePodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.rating = -1;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/**
 * Follow podcast
 */
exports.followPodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.following = true;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/**
 * Like podcast
 */
exports.likePodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.rating = 1;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/**
 * Star podcast
 */
exports.starPodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.starred = true;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/**
 * Unfollow podcast
 */
exports.unfollowPodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.following = false;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/**
 * Unrate podcast
 */
exports.unratePodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.rating = 0;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/**
 * Unstar podcast
 */
exports.unstarPodcast = function(req, res) {
    var isNew = false;
    var podcast = req.podcast;

    UserPodcast.findOne({
        podcast: req.podcast,
        user: req.user
    }).exec(function(err, up) {
        if(err || up === null) {
            up = new UserPodcast();
            isNew = true;
        }

        up.podcast = req.podcast;
        up.user = req.user;
        up.starred = false;

        if(isNew) {
            podcast.userPodcasts.push(up);
            podcast.save(function(err) {
                if(err)
                    res.jsonp(err);
                else
                    res.jsonp(up);
            });
        }
        up.save(function(err) {
            if(err)
                res.jsonp(err);
            else {
                res.jsonp(up);
            }
        });
    });
};

/* Utils */
function stringTimeToSeconds(input) {
    var seconds = 0;

    var timeArray = input.split(':');
    for(var i = 0; i < timeArray.length; i++) {
        seconds = seconds * 60 + timeArray[i];
    }

    return seconds;
}
