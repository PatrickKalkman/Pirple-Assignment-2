/* Token service
 * Define the REST endpoint for /token
 * This service generates security tokens to validate access to the API for
 * authenticated users.
 *   
 */
'use strict';

// Dependencies
const routes = require('./routes');
const constants = require('./constants');
const _data = require('./data');
const helpers = require('./helpers');
const userService = require('./userService');

const tokenPath = 'tokens';

const tokenService = {};

const tokenLength = 20;

tokenService.init = function () {

  // create a new token
  routes.add(tokenPath, constants.HTTP_METHOD_POST, function (data, callback) {
    const password = typeof (data.payload.password) === 'string' &&
      data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const email = typeof (data.payload.email) === 'string' &&
      data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;

    if (email && password) {
      _data.read(userService.path(), email, function(err, data) {
        if (!err && data) {
          if (data.password === helpers.hash(password)) { 
            // If valid create a new token with a random name, 
            // Set expiration date 1 hour in the future
            const tokenId = helpers.generateId(tokenLength);
            const expires = Date.now() + 1000 * 60 * 60;
            const token = {
              'email': email,
              'token': tokenId,
              'expires': expires
            };
            _data.create(tokenPath, tokenId, token, function(err) {
              if (!err) {
                callback(constants.HTTP_STATUS_OK, token);
              } else {
                callback(constants.HTTP_INTERNAL_SERVER_ERROR, {'Error' :
                  `An error occurred while trying to create a new token. ${err}`});
              }
            });
          } else {
            callback(constants.HTTP_STATUS_UNAUTHORIZED, {'Error' : 
              'token.post: Provided email or password was incorrect.'});            
          }
        } else {
          callback(constants.HTTP_INTERNAL_SERVER_ERROR, {'Error' : 
            `token.post: An error occurred while trying to read user ${email}. ${err}`});
        }
      });
    } else {
      callback(constants.HTTP_BAD_REQUEST, {'Error' : 
        'token.post: Not all required fields email and password are provided'});
    }
  });

  routes.add(tokenPath, constants.HTTP_METHOD_DELETE, function(data, callback) {
    const tokenId = typeof(data.queryStringObject.token) === 'string' && 
      data.queryStringObject.token.length === tokenLength ? data.queryStringObject.token : false;
    if (tokenId) {
      _data.read(tokenPath, tokenId, function(err, data) {
        if (!err && data) {
          _data.delete(tokenPath, tokenId, function(err) {
            if (!err) {
              callback(constants.HTTP_STATUS_OK);
            } else {
              callback(constants.HTTP_INTERNAL_SERVER_ERROR, {'Error' : 
                `An error occurred while trying to delete the token ${tokenId}.${err}`});
            }
          });
        } else {
          callback(constants.HTTP_STATUS_NOT_FOUND, {'Error' : 
            `Could not find the token ${tokenId}. ${err}`});
        }
      });
    } else {
      callback(constants.HTTP_BAD_REQUEST, {'Error' : 
        'The token to delete should be provided in the querystring'});
    }
  });


};

module.exports = tokenService;