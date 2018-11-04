/* 
 * Helpers contain helper functions that are too small to .... their own module
 */

'use strict';

// Dependencies
const url = require('url');
const crypto = require('crypto');

const lib = {};

lib.getTrimmedPath = function (rawUrl) {
  const parsedUrl = url.parse(rawUrl, true);
  // return the path name from the url and remove slashes before and after.
  return parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
};

lib.generateId = function (length) {
  return crypto.randomBytes(length).toString('hex').toLowerCase();
};

// Parse a JSON string to an object in all cases, without throwing
lib.parseJsonToObject = function (jsonString) {
  try {
    if (typeof (jsonString) === 'string' && jsonString.length > 0) {
      var obj = JSON.parse(jsonString);
      return obj;
    } else {
      return {};
    }
  } catch (err) {
    console.log(`parseJsonToObject: An error occurred while 
      trying to parse "${jsonString}". ${err}`);
    return {};
  }
};

module.exports = lib;