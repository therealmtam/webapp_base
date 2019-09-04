const _ = require('lodash');
const commonErrorMessages = require('./commonErrorMessages.js');

const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const REQUEST_TIMEOUT = 408;
const CONFLICT = 409;
const GONE = 410;
const IM_A_TEAPOT = 418; // :) https://tools.ietf.org/html/rfc7168
const INTERNAL_SERVER_ERROR = 500;
const NOT_IMPLEMENTED = 501;
const SERVICE_UNAVAILABLE = 503;
const SERVICE_ERROR = 'service error';

const DB_ERROR = 'dbError';
const TYPE = 'type';
const CAUSE = 'cause';
const DETAILS = 'details';

const SQL_AND_CODE_OUT_OF_SYNC_MSG = 'SQL query and error processing logic got out of sync';
const UNHANDLED_DB_ERROR_MSG = 'Unhandled DB Error';

class EaiError extends Error {
    constructor(message, parameters, implementationContext) {
        super(message);
        Error.captureStackTrace(this, implementationContext || EaiError);
        this.name = this.constructor.name;
        if (parameters) {
            _.set(this, TYPE, _.get(parameters, TYPE, SERVICE_ERROR));
            _.set(this, CAUSE, _.get(parameters, CAUSE));
            if (_.get(this, CAUSE)) {
                // Lame workaround for non-enumerable Error.message property
                this.causeMessage = _.get(this, [CAUSE, 'message']);
            }
            _.set(this, DETAILS, _.get(parameters, DETAILS));
        }
    }
}

function buildFullErrorMessage(error) {
    let message = null;
    let e = error;

    while (e) {
        if (message) {
            message += ' caused by: ';
        } else {
            message = '';
        }
        message += e.name;
        if (e.message) {
            message += '(' + e.message + ')';
        }
        e = _.get(e, CAUSE);
    }
    return message;
}

function fromError(error, message, details) {
    let type = null;

    if (error instanceof EaiError) {
        type = error.type;

        if (!message && !details) {
            // Return EaiError as-is if no additional information is provided
            return error;
        }
    }
    if (!message) {
        message = 'Unexpected Error';
    }
    if (!type) {
        type = SERVICE_ERROR;
    }
    let parameters = {
        [CAUSE]: error,
        [TYPE]: type
    };
    if (details) {
        _.set(parameters, DETAILS, details);
    }
    return new EaiError(message, parameters, fromError);
}

function checkUnhandledErrors(error) {
    if (error instanceof EaiError) {
        if (_.get(error, [DETAILS, DB_ERROR]) && _.get(error, TYPE) !== SERVICE_UNAVAILABLE) {
            // This error comes directly from the use-case independent DB layer and it is not a communication error
            // We should never throw errors like this because all expected DB errors should be handled in the Data Layer: (caught and warpped)
            // If we are here, it's our bug so report it as a bug
            return new EaiError(
                UNHANDLED_DB_ERROR_MSG,
                {
                    [CAUSE]: error,
                    [TYPE]: SERVICE_ERROR
                },
                checkUnhandledErrors
            );
        }
        return error; // This is an EaiError that's been thrown intentionally so return it "as-is"
    }
    // This is totally unexpected error, so it's our bug
    return new EaiError(
        commonErrorMessages.UNEXPECTED_ERROR_MSG,
        {
            [CAUSE]: error,
            [TYPE]: INTERNAL_SERVER_ERROR
        },
        checkUnhandledErrors
    );
}

async function wrap(aFunction, ...parameters) {
    try {
        return await aFunction(...parameters);
    } catch (err) {
        // This will wrap uhandled DB errors as well as unexpected non-EaiError errors in the EaiError(SERVICE_ERROR)
        // Intentionally thrown errors will be rethrown "as-is"
        throw checkUnhandledErrors(err);
    }
}

function toPrintableError(error) {
    if (!(error instanceof Error)) {
        return error;
    }

    var simpleObject = _.pick(error, ['message', TYPE, 'stack', DETAILS]);

    if (_.get(error, CAUSE)) {
        _.set(simpleObject, CAUSE, toPrintableError(_.get(error, CAUSE)));
    }

    return simpleObject;
}

function isErrorType(error, type) {
    if (!(error instanceof EaiError)) {
        return false;
    }

    return _.get(error, TYPE) === type;
}

function isConflict(error) {
    return isErrorType(error, CONFLICT);
}

function isNotFound(error) {
    return isErrorType(error, NOT_FOUND);
}

function isIllegalArguments(error) {
    return isErrorType(error, BAD_REQUEST);
}

function isServiceUnavailable(error) {
    return isErrorType(error, SERVICE_UNAVAILABLE);
}

function isDbError(error) {
    return error instanceof EaiError && _.get(error, [DETAILS, DB_ERROR]);
}

function isNoContent(error) {
    return isErrorType(error, NO_CONTENT);
}

function createError(message, type, details, cause) {
    return new EaiError(
        message,
        {
            [CAUSE]: cause,
            [TYPE]: type,
            [DETAILS]: details
        },
        createError
    );
}

function createSqlAndCodeOutOfSyncError(details) {
    return createError(SQL_AND_CODE_OUT_OF_SYNC_MSG, INTERNAL_SERVER_ERROR, details);
}

function createNotImplementedError(details) {
    return createError(commonErrorMessages.NOT_IMPLEMENTED_MSG, NOT_IMPLEMENTED, details);
}

function createNotFoundError(message, details) {
    return createError(message, NOT_FOUND, details);
}

function createNoContentError(message, details) {
    return createError(message, NO_CONTENT, details);
}

const createEaiErrorFromError = function(error, description, details) {
    return new EaiError(
        description,
        {
            [CAUSE]: error,
            [DETAILS]: details
        },
        checkUnhandledErrors
    );
};

module.exports = {
    EaiError,
    fromError,
    buildFullErrorMessage,
    toPrintableError,
    isErrorType,
    isConflict,
    isNotFound,
    isIllegalArguments,
    isServiceUnavailable,
    isDbError,
    isNoContent,
    checkUnhandledErrors,
    wrap,
    createError,
    createNotFoundError,
    createNotImplementedError,
    createSqlAndCodeOutOfSyncError,
    createNoContentError,
    createEaiErrorFromError,

    NO_CONTENT,
    BAD_REQUEST,
    FORBIDDEN,
    NOT_FOUND,
    REQUEST_TIMEOUT,
    CONFLICT,
    GONE,
    IM_A_TEAPOT,
    INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED,
    SERVICE_UNAVAILABLE,

    DB_ERROR,
    TYPE,
    CAUSE,
    DETAILS,

    SERVICE_ERROR
};
