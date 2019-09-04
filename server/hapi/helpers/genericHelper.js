'use strict';

const _ = require('lodash');

const safeParseJsonReturnsPlainObject = function(jsonData) {
    const EAILoggerClass = require('helpers/eaiLogger.js');
    const EAILogger = new EAILoggerClass('helpers/genericHelper.js');

    let returnVal;
    try {
        returnVal = JSON.parse(jsonData);
        if (!_.isPlainObject(returnVal)) {
            EAILogger.log('warn', 'json data is not a plain object', { jsonData }, null);

            returnVal = {
                jsonData: returnVal
            };
        }
    } catch (e) {
        EAILogger.log('warn', 'invalid json data', { jsonData }, null);
        //default the parsed value to a plain object if it isn't
        returnVal = { jsonData };
    }

    return returnVal;
};

const getMapOfArray = function(array, keyInObjToUseAsMapKey) {
    const mapToReturn = {};

    //ensure all the items in the array are the same data type before using this method
    _.forEach(array, (item, index) => {
        let mapKey = index;
        if (_.isPlainObject(item)) {
            mapKey = _.get(item, keyInObjToUseAsMapKey);
        }

        if (_.isArray(item)) {
            mapKey = index;
        }

        if (_.isString(item) || _.isNumber(item)) {
            mapKey = item;
        }

        if (mapKey) {
            mapToReturn[mapKey] = item;
        }
    });
    return mapToReturn;
};

const getMethodToUse = function(operation, methodType) {
    const bls = require('service');
    const defaultMethod = () => {};

    if (methodType !== 'retrieve' && methodType !== 'process') {
        throw Error('method type - ' + methodType + ' - is not valid');
    }

    const method = _.get(bls, [operation, methodType], defaultMethod);
    return method;
};

const getDate = function() {
    const dateNow = new Date(Date.now());
    const YYYY_MM_DD_T_HH_MM_SS_SSSZ_Date = dateNow.toISOString();
    const YYYY_MM_DD_Date = YYYY_MM_DD_T_HH_MM_SS_SSSZ_Date.split('T')[0];
    return {
        YYYY_MM_DD_Date,
        YYYY_MM_DD_T_HH_MM_SS_SSSZ_Date
    };
};

const getBatchedListOfItems = function(list, batchSize) {
    const batches = [];
    let currBatch = [];
    _.forEach(list, (item, index) => {
        currBatch.push(item);

        if (currBatch.length === batchSize) {
            batches.push(currBatch);
            currBatch = [];
            return;
        }

        if (index + 1 === list.length) {
            batches.push(currBatch);
            currBatch = [];
            return;
        }
    });
    return batches;
};

const getArrayOfSizeN = _.memoize(function(n) {
    return _.reduce(
        [n],
        (acc, val) => {
            for (let i = 1; i <= val; i++) {
                acc.push(i);
            }
            return acc;
        },
        []
    );
});

module.exports = {
    safeParseJsonReturnsPlainObject,
    getMapOfArray,
    getMethodToUse,
    getDate,
    getBatchedListOfItems,
    getArrayOfSizeN
};
