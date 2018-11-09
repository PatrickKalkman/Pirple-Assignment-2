/*
* Primary file for the API
*
*/

'use strict';

//Dependencies
var server = require('./lib/server');
var stripe = require('./lib/stripe');

stripe.performPayment('123456', 1000, 'Order 123456', function(err) {
  if (!err) {
    console.log(err);
  } else {
    console.log(err);
  }
});

var app = {};

app.init = function() {
  server.init();
};

// Execute the function
app.init();

module.exports = app;