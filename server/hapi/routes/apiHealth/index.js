'use strict';

// logging
const fileNameAndLocation = 'hapi/routes/apiHealth/index.js';
const EAILoggerClass = require('helpers/eaiLogger.js');
const EAILogger = new EAILoggerClass(fileNameAndLocation);
const methodName = 'registerRoutes - API Health';

// routes
const pingGet = require('./ping.js');

module.exports.registerRoutes = async function(server) {
    // log the start of the method
    EAILogger.log('info', methodName);

    // register routes
    await pingGet.registerRoute(server);
};
