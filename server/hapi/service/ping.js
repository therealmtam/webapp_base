const _ = require('lodash');

const initializationDate = new Date();
const initializationDateUTC = initializationDate.toUTCString();

const getAPIInfoForReporting = function() {
    return {
        node_env: _.get(process, 'env.NODE_ENV', 'unknown'),
        server_url: _.get(process, 'env.URL', 'unknown'),
        server_initialization_date_UTC: initializationDateUTC
    };
};

module.exports = {
    getAPIInfoForReporting
};
