/* User service
 * Define the REST endpoint for /users
 *
 */
'use strict';

// Dependencies
const routes = require('./routes');
const constants = require('./constants');

const usersPath = 'users';

const userService = {};

userService.init = function() {

  routes.add(usersPath, constants.HTTP_METHOD_POST, function (data, callback) {

    console.log(data);
  
    var response = {
      'message': 'Hello from users POST'
    };
  
    callback(constants.HTTP_STATUS_OK, response);
  });
  
  routes.add(usersPath, constants.HTTP_METHOD_GET, function (data, callback) {
    var response = {
      'message': 'Hello from users GET'
    };
  
    callback(constants.HTTP_STATUS_OK, response);
  
  });


};


module.exports = userService;


