'use strict';

// logging
const fileNameAndLocation = 'hapi/routes/index.js';
const EAILoggerClass = require('helpers/eaiLogger.js');
const EAILogger = new EAILoggerClass(fileNameAndLocation);
const methodName = 'registerRoutes';

// routes
const apiHealth = require('./apiHealth');

module.exports.registerRoutes = async function(server) {
    // log the start of the method
    EAILogger.log('info', methodName);

    // register routes
    await apiHealth.registerRoutes(server);
};
