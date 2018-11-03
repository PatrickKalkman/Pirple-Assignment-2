/* 
 * Helpers contain helper functions that are too small to .... their own module
 */

'use strict';

 // Dependencies
 const url = require('url');

 const lib = {};

 lib.getTrimmedPath = function(rawUrl) {
    const parsedUrl = url.parse(rawUrl, true);
    // return the path name from the url and remove slashes before and after.
    return parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
 };

 module.exports = lib;