'use strict';
/* Start up the http server */

// Dependencies
const http = require('http');
const utils = require('util');
const debug = utils.debuglog('index');
const helpers = require('./helpers');
const routes = require('./routes');
const userService = require('./userservice');
var StringDecoder = require('string_decoder').StringDecoder;

var server = {};

server.httpServer = http.createServer((req, res) => {

  // get the payload, if there is any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });

  req.on('end', function () {
    buffer += decoder.end();

    var data = {};
    data.httpMethod = req.method.toLowerCase();
    data.trimmedPath = helpers.getTrimmedPath(req.url);
    data.payload = helpers.parseJsonToObject(buffer);
    data.headers = req.headers;

    routes.handle(data, function (statusCode, responsePayload) {
      responsePayload = typeof (responsePayload) === 'object' ? responsePayload : {};
      const responsePayloadString = JSON.stringify(responsePayload);
      res.setHeader('content-type', 'application/json');
      res.writeHead(statusCode);
      res.end(responsePayloadString);

      if (statusCode === 200) {
        debug('\x1b[32m%s\x1b[0m', data.httpMethod.toUpperCase() + ' /' + data.trimmedPath + ' ' + statusCode);
      } else {
        debug('\x1b[31m%s\x1b[0m', data.httpMethod.toUpperCase() + ' /' + data.trimmedPath + ' ' + statusCode);
      }
      // log the requested path
      debug('Returning ', statusCode, responsePayloadString);
    });
  });
});

server.init = function () {

  userService.init();

  // Start the http server, and have it listen 
  server.httpServer.listen(3000, function () {
    console.log('\x1b[36m%s\x1b[0m', "The http server is running in dev and listening on port 3000");
  });

};

module.exports = server;