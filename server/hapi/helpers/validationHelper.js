'use strict';

const _ = require('lodash');
const eaiError = require('helpers/eaiError.js');
const operationsConfig = require('config/operations.js');
const mapOfKnownOperations = operationsConfig.getMapOfKnownOperations();
const VALID = 'valid';
const INVALID = 'invalid';
const ARRAY_ITEM_IS_NOT_VALID = 'Invalid parameter. Array item is not valid';

const isStringAndIsNotEmpty = function(val, name, errorMsgToThrow) {
    if (_.isEmpty(val) || !_.isString(val)) {
        throw eaiError.createError(errorMsgToThrow, null, {
            [name]: val
        });
    }
};

const isValidOperation = function(operation) {
    return _.has(mapOfKnownOperations, operation);
};

const validateListOfEventsData = function(listOfEventsData) {
    const listOfValidEvents = [];
    const listOfInvalidEvents = [];

    const snsDl = require('service/datalayer/sns.js');

    _.forEach(listOfEventsData, eventData => {
        const operation = snsDl.getEventOperation(eventData);

        //validate the operation
        if (isValidOperation(operation)) {
            listOfValidEvents.push(eventData);
        } else {
            listOfInvalidEvents.push(eventData);
        }
    });

    return {
        [VALID]: listOfValidEvents,
        [INVALID]: listOfInvalidEvents
    };
};

const isValidArrayOfIds = function(array, name, optional) {
    try {
        validateArrayOfIds(array, name, optional);
    } catch (error) {
        return false;
    }
    return true;
};

function validateArrayOfIds(array, name, optional) {
    return validateArray(
        array,
        name,
        function(value) {
            return _.isInteger(value);
        },
        optional
    );
}

function validateArray(array, name, validator, optional) {
    let useErrorType = null;

    if (!array && optional) {
        return array;
    }

    if (!_.isArray(array)) {
        throw eaiError.createError('Invalid parameter. Array is expected', useErrorType, {
            name: name,
            value: array
        });
    }
    if (array.length === 0) {
        if (!optional) {
            throw eaiError.createError('Invalid parameter. Zero length array is unexpected', useErrorType, {
                name: name,
                value: array
            });
        } else {
            return null;
        }
    }

    let invalidItemIdx = _.findIndex(array, function(item) {
        return !validator(item);
    });

    if (invalidItemIdx >= 0) {
        throw eaiError.createError(ARRAY_ITEM_IS_NOT_VALID, useErrorType, {
            name: name,
            index: invalidItemIdx,
            value: array[invalidItemIdx]
        });
    }
    return array;
}

module.exports = {
    isStringAndIsNotEmpty,
    isValidOperation,
    validateListOfEventsData,
    isValidArrayOfIds,

    VALID,
    INVALID
};
