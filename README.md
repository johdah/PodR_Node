PodR
====

A podcast manager built in Node.js using Javascript. This is based on the MEAN stack ([MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org)).

## Prerequisities
* Node.js - Download and install [Node.js](http://www.nodejs.org/download/)
* MongoDB - Download and install [MongoDB](http://www.mongodb.org/downloads) - make sure it runs on the default port (27017)

### Tools prerequisities
* NPM - Node.js package manager, should be installed when you install node.js
* Bower - Web package manager, installing [Bower](http://bower.io/)

### Optional
* Grunt - Download and Install [Grunt](http://gruntjs.com)

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file
* Mongoose - Defined as npm module in the [package.json](package.json) file
* Passport - Defined as npm module in the [package.json](package.json) file
* AngularJS - Defined as bower module in the [bower.json](bower.json) file
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file

## Quick install
The quickest way to setup the project is to clone the repository and then doing the following steps:

Install dependencies:

	$ npm install

Using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

	$ grunt

Otherwise you can use:

	$ node server

Then open browser and go to:

	http://localhost:3000

## Troubleshooting
Most of the issues that you may encounter can be solved by one of the following tips.

#### Update NPM, Bower or Grunt

Updating NPM:

	$ npm update -g npm

Updating Grunt:

	$ npm update -g grunt-cli

Updating Bower:

	$ npm update -g bower

#### Cleaning the NPM or Bower cache

NPM and Bower has a caching system for holding packages that's already installed. Cleaning the cache often solves the common troubles.

NPM Clean Cache:

	$ npm cache clean

Bower Clean Cache:

	$ bower cache clear

## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. Here you will need to specify your application name, database name, as well as hook up and social app keys if you want integraiton with Facebook, GitHub, Google or Twitter.

### Environmental Settings
There are three environments provided by default, __development__, __test__, and __production__. Each of these environments has the following configuration options:

* __db__ - This is the name of the MongoDB database to use, and is set by defaul to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google and Twitter. You can specify your own application keys here for each platform:
		* __clientID__
		* __clientSecret__
		* __callbackURL__

To run with a different environment, just specify NODE_ENV as you call grunt:

	$ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

	$ NDOE_ENV=test node server

NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.

## Heroku Quick Deployment
Before you start make sure you have the [Heroku toolbelt](https://toolbelt.heroku.com) installed and an accessible mongo db instance.

...
git init
git add .
git commit -m "initial commit"
heroku apps:create
git push heroku master
...

## Credits
* Using the [MEAN](http://mean.io) stack.