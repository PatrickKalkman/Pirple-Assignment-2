'use strict';
/* Main entry point of the app */

// Dependencies
const http = require('http');
const utils = require('util');
const debug = utils.debuglog('index');
const helpers = require('./lib/helpers');
const routes = require('./lib/routes');
const constants = require('./lib/constants');

const server = http.createServer((req, res) => {

  var data = {};
  data.httpMethod = req.method.toLowerCase();
  data.trimmedPath = helpers.getTrimmedPath(req.url);
  data.payload = '';
  data.headers = req.headers;

  routes.handle(data, function(statusCode, responsePayload) {

    console.log(statusCode);
    responsePayload = typeof (payload) === 'object' ? responsePayload : {};

    const responsePayloadString = JSON.stringify(responsePayload);
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    res.end(responsePayloadString);
    
    if (statusCode === 200) {
      debug('\x1b[32m%s\x1b[0m', data.httpMethod.toUpperCase() + ' /' + data.trimmedPath +' ' + statusCode);
    } else { 
      debug('\x1b[31m%s\x1b[0m', data.httpMethod.toUpperCase() + ' /' + data.trimmedPath +' ' + statusCode);
    }
    // log the requested path
    debug('Returning ', statusCode, responsePayloadString);
  });

});

const usersPath = 'users';

routes.add(usersPath, constants.HTTP_METHOD_POST, function(data, callback) {
  
  var response = { 'message' : 'Hello from users POST'};

  callback(constants.HTTP_STATUS_OK, response);

});

routes.add(usersPath, constants.HTTP_METHOD_GET, function(data, callback) {
  var response = { 'message' : 'Hello from users GET'};

  callback(constants.HTTP_STATUS_OK, response);

});

server.listen(3000, function() {
  console.log('http server is started and listening on port 3000');
});


