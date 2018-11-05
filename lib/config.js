/* 
 * Create and export configuration variables
 *
 */
'use strict';

// Container for all environments
var environments = {};

environments.staging = {
  'httpport': 3000,
  'httpsport': 3001,
  'envName': 'staging',
  'hashingSecret': 'hashingSecretStaging'
};

environments.production = {
  'httpport': 5000,
  'httpsport': 5001,
  'envName': 'production',
  'hashingSecret': 'hashingSecretProduction'
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? 
  process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environment defined above, 
// if not default to staging
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? 
  environments[currentEnvironment] : environments.staging;

// export the module
module.exports = environmentToExport;

