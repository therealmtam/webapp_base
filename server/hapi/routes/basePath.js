'use strict';

const fs = require('fs');

// logging related
const fileNameAndLocation = 'hapi/routes/basePath.js';
const EAILoggerClass = require('helpers/eaiLogger.js');
const EAILogger = new EAILoggerClass(fileNameAndLocation);
const ContextHelper = require('helpers/ctxHelper.js');

// route constants
const path = '/{file*}';
const verb = 'GET';
const methodName = `End Point: ${path}: ${verb}`;

module.exports.registerRoute = async function(server) {
    await server.route({
        method: verb,
        path: path,

        //the setup to server static assets from a directory
        handler: {
            directory: {
                path: `${__dirname}/../../../client/reactApp/dist`
            }
        }

        //the setup to serve a single asset or to handle api calls as a backend server

        // config: {
        //     auth: false,
        //     tags: ['api', 'base'],
        //     description: 'slash path',
        //     notes: ['End point to return html'].join('<br>'),
        //     handler: async function(request) {
        //         // create a context for the request
        //         const ctx = ContextHelper.initializeNewContext();

        //         // log the start of the method
        //         const methodParameters = {};
        //         EAILogger.logMethodDetail('info', methodName, methodParameters, ctx);

        //         // create the response
        //         const response = fs.readFileSync(`${__dirname}/../../../client/plainHtml/dist/index.html`, { encoding: 'utf8'});

        //         // return response with status 200
        //         return response;
        //     }
        // }
    });
};
