/* Order service
 * Define the REST endpoint for /orders
 * The service manages orders 
 */
'use strict';

// Dependencies
const routes = require('./routes');
const constants = require('./constants');
const _data = require('./data');
const helpers = require('./helpers');

const ordersPath = 'orders';
const orderIdLength = 20;

const orderService = {};

orderService.init = function() {

};

module.exports = orderService;