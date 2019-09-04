'use strict';

var util = require('util');
const pkg = require('../../../package.json');
const Logger = require('@moveinc/eai-logger');
const moment = require('moment');
const loggerForConsole = console;
const eaiError = require('./eaiError.js');
const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
const _ = require('lodash');
const ctxHelper = require('helpers/ctxHelper.js');
const uuid = require('uuid');

/*
example log method details = {
  "timestamp": "2019-05-09T14:45:32.650Z",
  "message": {
    "level": "info",
    "data": {
      "message": "EAILogger.prototype.logMethodDetail",
      "detail": {
        "file": "src/service/datalayer/utils/notification.js",
        "method_name": "_sendNotification",
        "log_point": "start of function call",
        "timing": {
          "start_time": "2019-05-09 14:45:32.649"
        },
        "method_parameters": {
          "method": "POST",
          "uri": "http://qa-ne.realtor.com/api/notification/v1.0/licensing",
          "json": true,
          "body": {
            "id": "2ea52638-ad14-4f98-ac17-b903dd75746d",
            "type": "licensing_user_create_lambda",
            "event_data": {
              "fulfillment_id": 8,
              "user_type": "A",
              "event_date_time": "2019-05-09T14:45:22.191Z",
              "correlation_id": "1b7110df-7a1a-5357-8cbe-4591455853bd",
              "change_detail": {
                "old_value": {

                },
                "new_value": {

                }
              }
            },
            "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc0MTY3MzIsImlzcyI6ImVhaS1saWNlbnNpbmciLCJkYXRhIjoibGljZW5zaW5nX3VzZXJfY3JlYXRlX2xhbWJkYSIsImlhdCI6MTU1NzQxMzEzMn0.37nC773x6bgUv_oGLuIGmZm2rAeng8fPeES9HnoQKkM"
          }
        },
        "extra_context_data": {
          "awsRequestId": "2ea52638-ad14-4f98-ac17-b903dd75746d",
          "logStreamName": "2019/05/09/[$LATEST]f1ada655912c4817bfa816a53ddd6092",
          "logGroupName": "/aws/lambda/licensing-events-service-pr-28-v1CompatibleHandler",
          "eventTime": "2019-05-09T14:45:22.191Z",
          "messageId": "1b7110df-7a1a-5357-8cbe-4591455853bd"
        }
      }
    },
    "correlation_id": "2ea52638-ad14-4f98-ac17-b903dd75746d",
    "module": "licensing-events-service"
  },
  "options": {
    "_logging_index": "",
    "type": "licensing-events-service"
  }
}
*/
class EAILogger {
    constructor(fileName) {
        this.logger = require('@moveinc/eai-logger').EAILogger;

        if (fileName) {
            this.fileName = fileName;
        }
        return this;
    }
}

EAILogger.prototype.initialize = function(customConfig) {
    const customConfigMinLogLevel = _.get(customConfig, 'minLogLevel');
    const customConfigElkLoggingIndex = _.get(customConfig, 'elkLoggingIndex');
    const customConfigPackageName = _.get(customConfig, 'packageName');

    const config = {
        moduleName: pkg.name, //this appears as "module" (see example log object above)
        minLogLevel: customConfigMinLogLevel || 'info',
        elkLoggingIndex: customConfigElkLoggingIndex || pkg.name, //this appears as "_logging_index" in the "options" object. As of May 9, 2019, this _logging_index was used by Splunk logging team as the "sourcetype" to filter the index's log data
        packageName: customConfigPackageName || pkg.name //this appears as "type" in the "options" object
    };

    Logger.init(config.moduleName, config.minLogLevel, config.elkLoggingIndex, config.packageName);
};
/**
 * Used to set the environment variables used by the logger based on a desired log type
 *    server = no debug points, logging not suppressed
 *    local = debug points allowed, logTiming and logMethodDetail output as debug points, logging not suppressed
 *    none = logging suppressed (no logs outputted at all)
 * @param {string} type - What type of logging to use.  Supports: 'server', 'local', 'none'
 * @return {undefined} -- no return from this function
 */
EAILogger.prototype.setLoggingType = function(type) {
    if (['server', 'local', 'none'].indexOf(type) === -1) {
        throw eaiError.createError('Logging Type must be one of: server, local, none', eaiError.SERVICE_ERROR);
    }
    process.env.TIMING_AS_DEBUGPOINT = type === 'local' ? 'true' : 'false';
    process.env.SUPRESS_TIMING = type === 'none' ? 'true' : 'false';
    process.env.SUPRESS_LOGGING = type === 'none' ? 'true' : 'false';
    process.env.SUPRESS_DEBUG_POINT = type === 'local' ? 'false' : 'true';
};

EAILogger.prototype.getTime = function() {
    return moment();
};

EAILogger.prototype.getMethodDetailsObject = function(method_name, log_point, start_time) {
    var method_details = {
        file: this.fileName,
        method_name: method_name,
        log_point: log_point,
        timing: {
            start_time: start_time ? start_time : this.getTime()
        }
    };

    if (start_time) {
        method_details.timing.end_time = this.getTime();
        method_details.timing.elapsed_time = method_details.timing.end_time.diff(method_details.timing.start_time);
    }
    method_name = method_name.toString();
    var name_values = method_name.split('.');

    if (name_values && name_values.length > 1) {
        method_details.file = name_values[0];
        method_details.method_name = name_values[1];
    }

    return method_details;
};

/**
 * Used to log the methond name and method parameters to the debug log.
 * This level of debug logging is not required for most cases, so only
 * do the logging if the appropriate debug level is set, or the
 * force_debug flag is passed
 * @param {string} method_name - The methos for which the parameters are being logged.
 * @param {object} method_parameters - The parameters passed to the method
 * @param {object} ctx - the ctx to be logged.
 * @return {object} the current time.
 */
EAILogger.prototype.logMethodDetail = function(loglevel, method_name, method_parameters, ctx) {
    if (process.env.SUPRESS_TIMING !== 'true') {
        // create method details object
        var MethodDetails = this.getMethodDetailsObject(method_name, 'start of function call');
        const start_time = MethodDetails.timing.start_time;
        this.stringifyTime(MethodDetails);
        if (method_parameters) {
            MethodDetails.method_parameters = method_parameters;
        }
        if (process.env.TIMING_AS_DEBUGPOINT !== 'true') {
            // log method details object
            this.log(loglevel, 'EAILogger.prototype.logMethodDetail', MethodDetails, ctx);
        } else {
            this.logMethodDetailsAsDebugPoint(MethodDetails, 'Log Method Details');
        }
        // return the start_time
        return start_time;
    }
    return null;
};

EAILogger.prototype.adjustLogLevel = function(loggingFunction, logLevel, messageType, elapsedTime) {
    if (loggingFunction === 'logTiming') {
        logLevel = logLevel.toLowerCase();
        if (logLevel === 'info' || logLevel === 'debug') {
            if (messageType === 'error') {
                logLevel = 'error';
            } else if (elapsedTime > 50) {
                logLevel = 'warn';
            }
        }
    }
    return logLevel;
};

EAILogger.prototype.logTiming = function(logLevel, method_name, log_point, start_time, ctx, message, message_type) {
    if (process.env.SUPRESS_TIMING !== 'true') {
        start_time = start_time ? start_time : this.getTime();
        var MethodDetails = this.getMethodDetailsObject(method_name, log_point, start_time);
        const end_time = MethodDetails.timing.end_time;
        this.stringifyTime(MethodDetails);
        // add the relevant message to the object to log
        if (message) {
            if (!message_type) {
                message_type = 'error';
            }
            if (_.isError(message)) {
                _.set(MethodDetails, 'error', eaiError.toPrintableError(message));
            } else {
                _.set(MethodDetails, message_type, message);
            }
        }

        // reduce logging by removing most logs by foricing info to debug for logTiming unless certain attributes are met
        logLevel = this.adjustLogLevel('logTiming', logLevel, message_type, _.get(MethodDetails, 'timing.elapsed_time', 0));

        // determine logging method
        if (process.env.TIMING_AS_DEBUGPOINT !== 'true') {
            // log method details object
            this.log(logLevel, 'EAILogger.prototype.logTiming', MethodDetails, ctx);
        } else {
            // log as a debug point
            this.logMethodDetailsAsDebugPoint(MethodDetails, 'Log Timing');
        }
        // return the end time
        return end_time;
    }
    return null;
};

EAILogger.prototype.logValidationError = function(method_name, error, ctx) {
    if (process.env.SUPRESS_TIMING !== 'true') {
        let start_time = this.getTime();
        var MethodDetails = this.getMethodDetailsObject(method_name, 'Input Validation Error', start_time);
        const end_time = MethodDetails.timing.end_time;

        this.stringifyTime(MethodDetails);

        // add the relevant error details to the object to log
        if (error) {
            MethodDetails.error = {
                message: error.message
            };
            if (error.stack) {
                MethodDetails.error.stack = error.stack;
            }
        }

        var message = _.get(error, 'message', 'EAILogger.prototype.logValidationError');
        // validate log method
        if (process.env.TIMING_AS_DEBUGPOINT !== 'true') {
            // log method details object
            this.log('error', message, MethodDetails, ctx);
        } else {
            // log as a debug point
            this.logMethodDetailsAsDebugPoint(MethodDetails, 'Log Validation Error');
        }
        // return the end time
        return end_time;
    }
    return null;
};

EAILogger.prototype.logError = function(method_name, error, loggingContext) {
    var methodDetails = this.getMethodDetailsObject(method_name, 'Error');
    let message = eaiError.buildFullErrorMessage(error);

    methodDetails.error = eaiError.toPrintableError(error);
    this.stringifyTime(methodDetails);

    if (process.env.TIMING_AS_DEBUGPOINT !== 'true') {
        // log method details object
        this.log('error', message, methodDetails, loggingContext);
        return null;
    } else {
        methodDetails.error = {
            message: error.message
        };
        if (error.stack) {
            methodDetails.error.stack = error.stack;
        }

        // log as a debug point
        this.logMethodDetailsAsDebugPoint(methodDetails, 'log Error');
    }
};

EAILogger.prototype.stringifyTime = function(MethodDetails) {
    if (MethodDetails && MethodDetails.timing) {
        // convert start_time date time to string
        if (MethodDetails.timing.start_time) {
            MethodDetails.timing.start_time = moment(MethodDetails.timing.start_time).format(dateFormat);
        }
        // convert end_time date time to string
        if (MethodDetails.timing.end_time) {
            MethodDetails.timing.end_time = moment(MethodDetails.timing.end_time).format(dateFormat);
        }
    }
};

EAILogger.prototype.logMethodDetailsAsDebugPoint = function(MethodDetails, LogType) {
    // determine if timing values exist
    this.stringifyTime(MethodDetails);
    // log as a debug point
    if (!process.env.TEST_ENV) {
        this.debugPoint(MethodDetails, LogType);
    }
};

EAILogger.prototype.formatDetailObject = function(detail, ctx) {
    if (_.isError(detail)) {
        detail = eaiError.toPrintableError(detail);
    } else if (!_.isPlainObject(detail) && detail) {
        detail = { info_to_log: detail };
    }
    if (_.has(ctx, 'customLogData')) {
        detail.extra_context_data = ctx.customLogData;
    }
    return detail;
};

EAILogger.prototype.log = function(type, methodName, detail, ctx) {
    detail = detail ? detail : {};
    if (process.env.SUPRESS_LOGGING !== 'true') {
        detail = this.formatDetailObject(detail, ctx);

        let correlationId = ctxHelper.getTheRequestId(ctx);
        if (!correlationId) {
            correlationId = uuid.v4() + '_not_request_id';
        }

        this.logger.log(type, detail, correlationId, methodName);
    }
};

EAILogger.prototype.print = function(message) {
    loggerForConsole.log(message);
};

/**
 * Used to write the debug point information
 * @param {string} header_line - The header line for the debug point message.
 * @param {string} message_line - The body of the debug point message.
 * @param {string} footer_line - The footer line for the debug point message.
 * @return No return value.
 */
EAILogger.prototype.debugPoint_Output = function(header_line, message_line, footer_line, recursive_attempt) {
    if (process.env.SUPRESS_LOGGING !== 'true') {
        // preceding spaces for recursive calls
        var preceding_spaces = Array(recursive_attempt * 3).join(' ');
        // log the first separator line
        this.print(preceding_spaces + header_line);

        // if the value to debug is JSON
        if (message_line.constructor === {}.constructor) {
            // ensure that the entire object gets logged
            this.print(util.inspect(message_line, false, null));
        } else {
            // if not JSON, then log it
            this.print(preceding_spaces + message_line);
        }

        // log the second separator line
        this.print(preceding_spaces + footer_line);
    }
};

/**
 * Used to do a console.log of the debug_message surrounded by a start line and a finish line to help the debug point stand out.
 * @param {string} debug_message - The message to print out.
 * @param {string} header - Additional text to add to the header line.
 * @param {character} separator_line_character - the character to use for the header and footer line.  Default = '-'
 * @param {number} line_length - The length of the header and footer lines.  Default = 81
 * @param {boolean} center_header - true = center the header text.  default = false.
 * @return No return value.
 */
EAILogger.prototype.debugPoint = function(debug_message, header, separator_line_character, line_length, center_header, recursive_attempt) {
    recursive_attempt = recursive_attempt ? recursive_attempt : 0;
    if (process.env.SUPRESS_DEBUG_POINT !== 'true') {
        var current_time = ' ' + this.getTime().format('hh:mm:ss.SSS') + ' ';

        // default line_length if not supplied
        line_length = line_length || 81;

        // set the separator to the default if one not supplied
        separator_line_character = separator_line_character || '-';

        var header_line = Array(line_length).join(separator_line_character);
        var footer_line = header_line;
        var initial_characters = 3;
        var start_of_line = Array(initial_characters).join(separator_line_character) + current_time + separator_line_character;

        // add the header text to the start of the line
        if (header) {
            // add spacing around the message to allow it to stand out
            header = ' ' + header + ' ';
            // determine spacing required to center the header text
            if (center_header) {
                var spacing_required_to_center = '';
                var length_of_line_after_start = line_length - start_of_line.length;
                if (length_of_line_after_start > header.length) {
                    spacing_required_to_center = Array(Math.trunc((length_of_line_after_start - header.length) / 2)).join(separator_line_character);
                }
                header = spacing_required_to_center + header;
            }

            // because we are showing the time in the header, use a colon to separate the time from the main body
            start_of_line += header;
        }

        var end_of_line_length = start_of_line.length < line_length ? line_length - start_of_line.length : 0;
        // compose the header line
        header_line = start_of_line + Array(end_of_line_length).join(separator_line_character);

        // if the message is null, convert that to a string to prevent errors in the code
        if (typeof debug_message === 'undefined' || debug_message === null) {
            debug_message = 'null';
        }

        this.debugPoint_Output(header_line, debug_message, footer_line, recursive_attempt);
    }
};

module.exports = EAILogger;
