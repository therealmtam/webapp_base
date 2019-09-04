'use strict';

const _ = require('lodash');
const REQUEST_ID = 'requestId';
const INVALID_EVENT_TIME = 'INVALID EVENT TIME';
const INVALID_EVENT_ID = 'INVALID EVENT ID';
const CUSTOM_LOG_DATA = 'customLogData';
const EVENT_ID = 'eventId';
const EVENT_TIME = 'eventTime';
const SERVER_INSTANCE_ID = 'serverInstanceId';

const uuid = require('uuid');

const _getEmptyContext = function() {
    return {
        [CUSTOM_LOG_DATA]: {
            [SERVER_INSTANCE_ID]: _.get(process, 'env.SERVER_INSTANCE_ID', 'NO SERVER INSTANCE ID')
        }
    };
};

const initializeNewContext = function(dataToAdd) {
    let context = _getEmptyContext();

    if (!_.isEmpty(dataToAdd)) {
        addDataToContext(context, dataToAdd);
    }

    return context;
};

const initializeContextForSqsPoll = function(sqsData, loggingContext) {
    let context = _getEmptyContext();

    if (!_.isEmpty(loggingContext) && _.has(loggingContext, CUSTOM_LOG_DATA)) {
        addDataToContext(context, loggingContext[CUSTOM_LOG_DATA]);
    }

    if (!_.isEmpty(sqsData)) {
        const sqsDl = require('service/datalayer/sqs.js');
        addDataToContext(context, {
            [REQUEST_ID]: sqsDl.getSqsRequestId(sqsData)
        });
    }

    return context;
};

const initializeContextForRequest = function(request) {
    const path_name = _.get(request, ['url', 'pathname']);
    const client_id = _.get(request, 'query.client_id', 'unknown');

    let context = _getEmptyContext();

    addDataToContext(context, {
        client_id,
        path_name,
        [REQUEST_ID]: uuid.v4()
    });

    return context;
};

const initializeContextForAccountUpdate = function(loggingContext) {
    let copyOfLoggingContext = _.cloneDeep(loggingContext);

    if (!_.isPlainObject(copyOfLoggingContext)) {
        copyOfLoggingContext = {};
    }
    const genericHelper = require('helpers/genericHelper.js');
    const dataToAdd = {
        [EVENT_TIME]: genericHelper.getDate().YYYY_MM_DD_T_HH_MM_SS_SSSZ_Date,
        [EVENT_ID]: uuid.v4()
    };
    addDataToContext(copyOfLoggingContext, dataToAdd);

    return copyOfLoggingContext;
};

const addDataToContext = function(loggingContext, dataToAdd) {
    _.assign(loggingContext[CUSTOM_LOG_DATA], dataToAdd);
};

const initializeContextForEvent = function(loggingContext, eventData) {
    let copyOfLoggingContext = _.cloneDeep(loggingContext);

    if (!_.isPlainObject(copyOfLoggingContext)) {
        copyOfLoggingContext = {};
    }

    const snsDl = require('service/datalayer/sns.js');
    const sqsDl = require('service/datalayer/sqs.js');
    const dataToAdd = {
        [EVENT_TIME]: snsDl.getEventTimestamp(eventData),
        [EVENT_ID]: snsDl.getEventMessageId(eventData),
        [sqsDl.KEY_FOR_SQS_MSG_DELETION]: sqsDl.getKeyForSqsMsgDeletion(eventData)
    };
    addDataToContext(copyOfLoggingContext, dataToAdd);

    return copyOfLoggingContext;
};

const initializeContextForEventForSendingToBatchQueue = function(loggingContext, dataForSend) {
    let copyOfLoggingContext = _.cloneDeep(loggingContext);

    if (!_.isPlainObject(copyOfLoggingContext)) {
        copyOfLoggingContext = {};
    }

    const sqsDl = require('service/datalayer/sqs.js');
    const dataToAdd = {
        [EVENT_TIME]: sqsDl.getTimestampForTracking(dataForSend),
        [EVENT_ID]: sqsDl.getIdForTracking(dataForSend),
        [sqsDl.KEY_FOR_SQS_MSG_DELETION]: sqsDl.getKeyForSqsMsgDeletion(dataForSend)
    };
    addDataToContext(copyOfLoggingContext, dataToAdd);

    return copyOfLoggingContext;
};

const initializeContextForSqsDelete = function(loggingContext, dataToAdd) {
    let copyOfLoggingContext = _.cloneDeep(loggingContext);

    if (!_.isPlainObject(copyOfLoggingContext)) {
        copyOfLoggingContext = {};
    }

    addDataToContext(copyOfLoggingContext, dataToAdd);

    return copyOfLoggingContext;
};

const getTheRequestId = function(ctx) {
    return _.get(ctx, `${CUSTOM_LOG_DATA}.${REQUEST_ID}`);
};

const getEventId = function(ctx) {
    return _.get(ctx, `${CUSTOM_LOG_DATA}.${EVENT_ID}`, INVALID_EVENT_ID);
};

const getEventTime = function(ctx) {
    return _.get(ctx, `${CUSTOM_LOG_DATA}.${EVENT_TIME}`, INVALID_EVENT_TIME);
};

const getSqsDeletionKey = function(ctx) {
    const sqsDl = require('service/datalayer/sqs.js');
    return _.get(ctx, `${CUSTOM_LOG_DATA}.${sqsDl.KEY_FOR_SQS_MSG_DELETION}`);
};

module.exports = {
    initializeContextForSqsPoll,
    addDataToContext,
    initializeContextForEvent,
    initializeContextForEventForSendingToBatchQueue,
    initializeContextForSqsDelete,
    getTheRequestId,
    getEventId,
    getEventTime,
    getSqsDeletionKey,
    initializeContextForRequest,
    initializeContextForAccountUpdate,
    initializeNewContext
};
