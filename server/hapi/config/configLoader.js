'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const uuid = require('uuid');

const loadEnvironmentVariables = function() {
    // Set the NODE_ENV env. variable to 'local' if it is not specified via Serverless.yml.
    process.env.NODE_ENV = process.env.NODE_ENV || 'local';

    // Select the config file to use
    const nodeEnv = process.env.NODE_ENV;
    const configFileName = 'config.json';
    const configFilePath = path.join(path.resolve('.') + '/server/hapi', '/config', nodeEnv, configFileName);

    // Get the JSON obj that contains the environment variables
    const rawData = fs.readFileSync(configFilePath);
    const environmentVariablesToCreate = JSON.parse(rawData);

    // Set default environment variables
    _.forIn(environmentVariablesToCreate, (value, envirVarName) => {
        process.env[envirVarName] = _.isObject(value) ? value.value : value;
    });

    // Set the package.json info to the environment
    process.env.API_VERSION = require('../../../package.json').version;
    process.env.API_NAME = require('../../../package.json').name;

    //identify each server instance to be able to track which instance do a set of logs belong to
    process.env.SERVER_INSTANCE_ID = uuid.v4();
};

const run = function() {
    loadEnvironmentVariables();
};

module.exports = {
    loadEnvironmentVariables,
    run
};
