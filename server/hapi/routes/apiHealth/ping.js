'use strict';

// logging related
const fileNameAndLocation = 'hapi/routes/apiHealth/ping.js';
const EAILoggerClass = require('helpers/eaiLogger.js');
const EAILogger = new EAILoggerClass(fileNameAndLocation);
const ContextHelper = require('helpers/ctxHelper.js');

// required business layer
const pingBL = require('service/ping.js');

// route constants
const path = '/restricted/ping';
const verb = 'GET';
const methodName = `End Point: ${path}: ${verb}`;

module.exports.registerRoute = async function(server) {
    await server.route({
        method: verb,
        path: path,
        config: {
            auth: false,
            tags: ['api', 'API Health'],
            description: 'Validate Service Returns',
            notes: ['End point used by other services to indicate connection can be established'].join('<br>'),
            handler: async function(request) {
                // create a context for the request
                const ctx = ContextHelper.initializeNewContext();

                // log the start of the method
                const methodParameters = {};
                EAILogger.logMethodDetail('info', methodName, methodParameters, ctx);

                // get object with api info from business layer
                const apiInfo = pingBL.getAPIInfoForReporting();

                // create the response
                const response = { apiInfo };

                // return response with status 200
                return response;
            }
        }
    });
};
