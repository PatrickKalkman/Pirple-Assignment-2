/* Menu service
 * Define the REST endpoint for /Menu
 * The service manages the menu items of 
 */
'use strict';

// Dependencies
const routes = require('./routes');
const constants = require('./constants');
const _data = require('./data');
const helpers = require('./helpers');
const tokenService = require('./tokenService');

const menuPath = 'menu';
const menuFile = 'menu';

const menuService = {};

menuService.init = function() {

  // Read the available menu items 
  routes.add(menuPath, constants.HTTP_METHOD_GET, function (data, callback) {
    const email = typeof (data.queryStringObject.email) === 'string' && 
      data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
    if (email) {
      // Get the token from the header
      const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
      if (token) {
        tokenService.verifyToken(token, email, function(tokenIsValid) {
          if (tokenIsValid) {
            // We read the menu items from menu.json which is a json file retrieved from 
            // https://github.com/RIAEvangelist/node-dominos-pizza-api/tree/master/sampleResp
            // Which originates from the dominos pizza API.
            _data.read(menuPath, menuFile, function(err, data) {
              if (!err && data) {
                // Filter and select only the properties that 
                // we want to keep;
                const menuItems = [];
                for (const item in data.Variants) {
                  const sizeCode = data.Variants[item].SizeCode;
                  if (sizeCode === '10' || sizeCode === '12') {
                    const menuItem = {};
                    menuItem.code = data.Variants[item].Code;
                    menuItem.name = data.Variants[item].Name;
                    menuItem.price = data.Variants[item].Price;
                    menuItems.push(menuItem);
                  }
                }
                callback(constants.HTTP_STATUS_OK, menuItems);
              } else {
                callback(constants.HTTP_STATUS_NOT_FOUND);
              }
            });
          } else {
            callback(constants.HTTP_STATUS_UNAUTHORIZED, 
              {'Error' : 'users.get: The given token is invalid'});
          }
        });
      } else {
        callback(constants.HTTP_STATUS_UNAUTHORIZED, 
          {'Error' : 'users.get: Missing authentication token'});
      }
    } else {
        callback(constants.HTTP_BAD_REQUEST, 
          {'Error' : 'users.get: Missing required field, email.'});
    }
  });
};

module.exports = menuService;