#!/bin/env node
/*jslint node: true, stupid: true */
//  OpenShift sample Node application
var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    fs = require('fs');


/**
 *  Define the sample application.
 */
var SampleApp = function () {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function () {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (self.ipaddress === undefined) {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        }
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function () {
        if (self.zcache === undefined) {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function (key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        [ 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM' ]
            .forEach(function (element, index, array) {
                process.on(element, function () { self.terminator(element); });
            });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        self.routes = {};

        self.routes.get = {

            '/': function (req, res) {
                res.setHeader('Content-Type', 'text/html');
                res.send(self.cache_get('index.html'));
            },

            '/asciimo': function (req, res) {
                var link = "http://i.imgur.com/kmbjB.png";
                res.send("<html><body><img src='" + link + "'></body></html>");
            },

            '/jenkins/body_missing/build': function (req, res) {
                res.setHeader('Content-Type', 'text/html');
                res.send('/jenkins/body_missing/build - GET request');
            },

            '/jenkins/dev_branch/build': function (req, res) {
                res.setHeader('Content-Type', 'text/html');
                res.send('/jenkins/dev_branch/build - GET request');
            },

            '/jenkins/stable_branch/build': function (req, res) {
                res.setHeader('Content-Type', 'text/html');
                res.send('/jenkins/stable_branch/build - GET request');
            }

        };


        self.routes.post = {

            '/api/jenkins': function (req, res) {

                // console.info('req.body.ref = ', req.body.ref);


                var pattern = /(?:refs\/heads\/)(.*)/;

                if (req.body && req.body.ref) {
                    console.info('req.body.ref = ', req.body.ref);
                    branchName = req.body.ref.match(pattern);
                } else {
                    branchName = 'body_missing';
                }

                var options = {
                    host: 'localhost',
                    port: 8080,
                    // path: '/jenkins/' + dev_branch/build',
                    path: '/jenkins/' + branchName + '/build',
                    method: 'GET',
                    headers: req.headers
                };

                var getJenkins = http.request(options, function (resJenkins) {

                    resJenkins.setEncoding('utf8');

                    // pass request data to parent post route
                    resJenkins.on('data', function (chunk) {
                        res.write(chunk);
                    });

                    resJenkins.on('close', function () {
                        res.writeHead(resJenkins.statusCode);
                        res.end();
                    });

                    resJenkins.on('end', function () {
                        res.end();
                    });



                }).on('error', function (e) {

                    console.info(e);
                    res.writeHead(500);
                    res.end();

                });

                getJenkins.end();

            }

        };

    };

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {
        var r;
        self.createRoutes();
        self.app = express.createServer();

        self.app.use(bodyParser.json());

        //  Add GET handlers for the app (from the routes).
        for (r in self.routes.get) {
            if (self.routes.get.hasOwnProperty(r)) {
                self.app.get(r, self.routes.get[r]);
            }
        }

        //  Add POST handlers for the app (from the routes).
        for (r in self.routes.post) {
            if (self.routes.post.hasOwnProperty(r)) {
                self.app.post(r, self.routes.post[r]);
            }
        }

        // console.info(self.routes);

    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function () {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now()), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

