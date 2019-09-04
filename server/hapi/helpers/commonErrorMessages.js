'use strict';

const NO_ACCOUNT_RECORD_FOUND_MSG = 'no account record found';
const EMAIL_FOR_THE_ACCOUNT_IS_NOT_FOUND_MSG = 'Email for the account is not found';
const EMAIL_FOR_THE_ACCOUNT_ALREADY_EXISTS_MSG = 'Email for the account already exists';

const NO_PRODUCT_RECORD_FOUND_MSG = 'no product record found for the account';

const NOT_IMPLEMENTED_MSG = 'Not Implemented';
const INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error';
const SERVICE_UNAVAILABLE_MSG = 'Service temporarily unavailable';
const UNEXPECTED_ERROR_MSG = 'Unexpected Error';
const UNKNOWN_ERROR_MSG = 'UNKNOWN_ERROR';
const FEATURE_NOT_VALID_FOR_ACCOUNT = 'Feature is not valid for the account';
const INVALID_FEATURE_TYPE = 'invalid feature type';
const NOT_VALID_EMAIL_ADDRESS = 'not a valid email address';
const FEATURE_TYPE_IS_NOT_APPLICABLE_TO_ACCOUNT = 'feature type is not applicable to the account';
const FEATURE_TYPE_DOES_NOT_HAVE_EMAILS = 'feature type does not have emails';
const NOT_VALID_OBJECT = 'not a valid object';
const UNKNOWN_ERROR = 'Unknown error';
const ATTRIBUTE_NOT_FOUND = 'Attribute item(s) do not exist';
const ATTRIBUTE_NOT_VALID = 'Attribute is not valid for selected feature type';
const EMAIL_FEATURE_ATTRIBUTE_NOT_FOUND = 'Email feature config attribute does not exist';
const EMAIL_FEATURE_CONFIG_NOT_FOUND = 'Email feature config does not exist';
const MARKETS_DATA_IS_INVALID = 'markets data is invalid';
const NOT_VALID_EMAIL_TYPE = 'not a valid email type';
const NOT_VALID_PLAIN_TEXT = 'not a valid plainText value';
const CLEAR_ALL_ATTRIBUTES_NEEDS_NO_EMAIL_CONFIGS = 'clearAllAttributes cannot be specified if emails are specified for the featureType';
const CLEAR_ALL_ATTRIBUTES_NEEDS_NO_CONFLICTING_ATTRIBUTE_ASSIGNMENTS = 'clearAllAttributes cannot be specified if attributes are also being assigned for the featureType';
const CONFLICTING_ATTRIBUTE_CONFIG_FOR_FEATURE_TYPE = 'conflicting attribute configurations for featureType';

const REPORT_OF_FAILED_NOTIFICATIONS = 'report of failed notifications';
const REPORT_OF_FAILED_BATCH_ITEMS = 'report of failed batch items';
const SEND_NOTIFICATION_FAILED = 'send notification failed';
const SEND_MSG_BATCH_FAILED = 'send message batch failed';
const UNKNOWN_OPERATIONS = 'unknown operations';

module.exports = {
    NO_ACCOUNT_RECORD_FOUND_MSG,
    EMAIL_FOR_THE_ACCOUNT_IS_NOT_FOUND_MSG,
    EMAIL_FOR_THE_ACCOUNT_ALREADY_EXISTS_MSG,
    NO_PRODUCT_RECORD_FOUND_MSG,
    NOT_IMPLEMENTED_MSG,
    INTERNAL_SERVER_ERROR_MSG,
    SERVICE_UNAVAILABLE_MSG,
    UNEXPECTED_ERROR_MSG,
    UNKNOWN_ERROR_MSG,
    FEATURE_NOT_VALID_FOR_ACCOUNT,
    UNKNOWN_ERROR,
    EMAIL_FEATURE_ATTRIBUTE_NOT_FOUND,
    ATTRIBUTE_NOT_VALID,
    ATTRIBUTE_NOT_FOUND,
    EMAIL_FEATURE_CONFIG_NOT_FOUND,
    INVALID_FEATURE_TYPE,
    NOT_VALID_EMAIL_ADDRESS,
    FEATURE_TYPE_IS_NOT_APPLICABLE_TO_ACCOUNT,
    FEATURE_TYPE_DOES_NOT_HAVE_EMAILS,
    NOT_VALID_OBJECT,
    MARKETS_DATA_IS_INVALID,
    NOT_VALID_EMAIL_TYPE,
    NOT_VALID_PLAIN_TEXT,
    CLEAR_ALL_ATTRIBUTES_NEEDS_NO_EMAIL_CONFIGS,
    CLEAR_ALL_ATTRIBUTES_NEEDS_NO_CONFLICTING_ATTRIBUTE_ASSIGNMENTS,
    CONFLICTING_ATTRIBUTE_CONFIG_FOR_FEATURE_TYPE,

    REPORT_OF_FAILED_BATCH_ITEMS,
    REPORT_OF_FAILED_NOTIFICATIONS,
    SEND_NOTIFICATION_FAILED,
    UNKNOWN_OPERATIONS,
    SEND_MSG_BATCH_FAILED
};
