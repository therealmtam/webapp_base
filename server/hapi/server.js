'use strict';

//load config
require('config/configLoader.js').run();

//request timeout set to 2 mins. AWS ELB default timeout is set to 1 minute https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/config-idle-timeout.html.
const DEFAULT_SERVER_TIMEOUT_MS = 1000 * 60 * 2;

// socket timeout must be > server timeout.
const DEFAULT_SOCKET_TIMEOUT_MS = 1000 * 60 * 60;

const EAILoggerClass = require('helpers/eaiLogger.js');
let EAILogger = null;
const fileNameAndLocation = 'src/server.js';

class Server {
    constructor(hapiTimeoutConfig) {
        this.hapiTimeoutConfig = hapiTimeoutConfig || {
            server: DEFAULT_SERVER_TIMEOUT_MS,
            socket: DEFAULT_SOCKET_TIMEOUT_MS
        };
    }

    async initHapi() {
        const Hapi = require('@hapi/hapi');
        this.server = await new Hapi.Server({
            port: 8080,
            routes: {
                cors: {
                    credentials: true
                },
                security: {
                    xframe: false
                },
                files: {
                    relativeTo: __dirname
                },
                response: {
                    modify: true,
                    options: {
                        stripUnknown: true,
                        abortEarly: false
                    }
                },
                validate: {},
                timeout: this.hapiTimeoutConfig
            }
        });
    }

    async start() {
        try {
            // create new instance of EAI logger after loading env variable needed for the logger
            EAILogger = new EAILoggerClass(fileNameAndLocation);

            //initialize the logger
            EAILogger.initialize();

            //set the logging type based on the development environment
            let loggingType = process.env.NODE_ENV === 'local' ? 'local' : 'server';
            //if running a test locally with this env variable set in the package.json npm command, log as if running local
            if (process.env.LOCAL_TEST_ENV === 'true') {
                loggingType = 'local';
            }
            EAILogger.setLoggingType(loggingType);

            // create and configure the server
            await this.initHapi();

            // if SWAGGER_USES_LOCAL_SERVER=true, set base API URL=localhost to environment (dev, qa, prod URLs are passed in via Docker).
            // The URL env variable is used when displaying extra API status info via ping route.
            if (process.env.SWAGGER_USES_LOCAL_SERVER === 'true') {
                process.env.URL = this.server.info.uri;
            }

            //register inert plugin
            await this.server.register({
                plugin: require('inert')
            });

            // register the server routes with the server
            const routes = require('routes');
            await routes.registerRoutes(this.server);

            // start the server
            await this.server.start();
            EAILogger.log('info', 'Server running at: ' + this.server.info.uri);
        } catch (err) {
            // if logger instance = null, create new instance of EAI logger
            if (!EAILogger) {
                EAILogger = new EAILoggerClass(fileNameAndLocation);
            }

            // log the server creation error
            EAILogger.logError('server creation error', err);
        }
    }

    async stop() {
        await this.server.stop();
        return;
    }
}

module.exports = Server;
