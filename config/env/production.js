'use strict';

module.exports = {
	db: process.env.DB_URL || 'mongodb://localhost/podr',
	app: {
		name: 'PodR'
	},
	facebook: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	github: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	twitter: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
}