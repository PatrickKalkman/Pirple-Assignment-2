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

const usersPath = 'menu';

const menuService = {};

menuService.init = function() {

};

module.exports = menuService;