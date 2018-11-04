/* User service
 * Define the REST endpoint for /users
 *
 */
'use strict';

// Dependencies
const routes = require('./routes');
const constants = require('./constants');
const _data = require('./data');

const usersPath = 'users';

const userService = {};

userService.init = function() {

  // create a new user
  routes.add(usersPath, constants.HTTP_METHOD_POST, function (data, callback) {

    const firstName = typeof(data.payload.firstName) === 'string' && 
      data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName =  typeof(data.payload.lastName) === 'string' && 
      data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const password = typeof (data.payload.password) === 'string' && 
      data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const email = typeof (data.payload.email) === 'string' && 
      data.payload.email.trim().length > 0 && 
      userService.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;

    if (firstName && lastName && password && email) {

      var userObject = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
      };

      _data.create(usersPath, email, userObject, function(err) {
        if (!err) {
          callback(constants.HTTP_STATUS_OK);
        } else {
          callback(constants.HTTP_INTERNAL_SERVER_ERROR, 
            {'Error' : `Cound not create the user with email ${email}. ${err}`});
        }
      });
    } else {
      callback(constants.HTTP_BAD_REQUEST, 
        {'Error' : 'Required fields were not provided and/or given email not valid'});
    }
  });
  
  routes.add(usersPath, constants.HTTP_METHOD_GET, function (data, callback) {
    var response = {
      'message': 'Hello from users GET'
    };
  
    callback(constants.HTTP_STATUS_OK, response);
  
  });


};

userService.validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

module.exports = userService;


