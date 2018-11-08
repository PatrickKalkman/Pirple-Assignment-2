/*
 *  Client library to work with Stripe for payments
 *
 */
'use strict';

// Dependencies
const https = require('https');

const stripe = {};

stripe.performPayment = function (orderId, amount, description, callback) {

    https.post('https://api.stripe.com/v1/charges', (resp) => {
        let data = '';

        //   curl https://api.stripe.com/v1/charges \
        //   -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
        //   -d amount=2000 \
        //   -d currency=usd \
        //   -d source=tok_amex \
        //   -d description="Charge for jenny.rosen@example.com"

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            callback(false);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        callback({ 'Error': `An error occurred while trying to pay the order. ${err}` });
    });

}


module.exports = stripe;