/**
 * Common DB field names and property names
 */
const PARTY_ID = 'partyId';
const ACCOUNTS = 'accounts';
const ACCOUNT_ID = 'accountId';
const ACCOUNT_TYPE = 'accountType';
const LINKED_TO_ACCOUNT_ID = 'linkedToAccountId';
const LINKED_ACCOUNT_ID = 'linkedAccountId';
const LINK_TYPE = 'linkType';
const PRODUCT = 'product';
const PRODUCT_ID = 'productId';
const PRODUCT_TYPE_NAME = 'productTypeName';
const PRODUCT_TYPE_ID = 'productTypeId';
const PRODUCT_PROPERTIES = 'productProperties';
const ASSET = 'asset';
const ASSET_ID = 'assetId';
const EMAIL = 'email';
const EMAILS = 'emails';
const EMAIL_ID = 'emailId';
const EMAIL_TYPE = 'emailType';
const PLAIN_TEXT = 'plainText';
const FEATURE_TYPE_NAME = 'featureTypeName';
const FEATURE_TYPE = 'featureType';
const FEATURE_TYPE_ID = 'featureTypeId';
const ATTRIBUTES = 'attributes';
const CREATEDBY = 'createdBy';
const DELETED = 'deleted';
const CREATED = 'created';
const PROPAGATED = 'propagated';
const UPDATED = 'updated';
const VALUES = 'values';
const VALUE = 'value';
const NOTES = 'notes';
const MARKET_ZIPS = 'marketZips';
const MARKETS = 'markets';
const ATTRIBUTE_TYPE_VECTOR = 'vector';
const ATTRIBUTE_TYPE_SINGLETON = 'singleton';
const OWNER_AND_LINKED_ACCOUNTS = 'ownerAndLinkedAccounts';
const ACCOUNT_IDS = 'accountIds';
const FEATURE_TYPE_NAMES = 'featureTypeNames';
const VALID_MARKET_ZIPS = 'validMarketZips';
const INVALID_MARKET_ZIPS = 'invalidMarketZips';
const UNDEFINED = 'undefined';
const NUMBER_OF_LINKS = 'numberOfLinks';
const FEATURE_DATA_MAP = 'map';
const HAS_MARKETS = 'hasMarkets';
const HIERARCHY = 'hierarchy';
const SELF_OWNED = 'selfOwned';
const PRODUCT_LINK = 'productLink';
const FEATURE_LIST = 'featureList';
const SETTINGS = 'settings';
const RESULTSET_TYPE_ALL = '#1-ALL';
const RESULTSET_TYPE_ACCOUNTS_AND_FEATURE_TYPES = '#2-ACCOUNTS-AND-FEATURE-TYPES';
const RESULTSET_TYPE_FEATURES = '#3-FEATURE-TYPES';
const RESULTSET_TYPE_SUMMARY = '#4-SUMMARY';
const TYPE_ONLY = 'typeOnly';
const INCLUDE_ASSETS_AND_SUMMARY = 'include assets and summary';
const OWNER_SUMMARY = 'ownerSummary';
const CORE_SETTINGS_RECORD = 'rootSettings';
const UNPROPAGATED_SETTINGS_RECORD = 'unpropagated';
const FROM_UNPROPAGATED_HISTORY = 'fromUnpropagatedHistory';
const ACCOUNT_IDS_BY_ACCOUNT_TYPE = 'accountIdsByAccountType';
const PARENT_IDS_TO_CHILD_IDS = 'parentIdsToChildIds';
const STANDARD_MAP = 'standardMap';
const ANY = 'any';
const PRODUCT_FEATURE_SETTINGS_ID = 'productFeatureSettingsId';
const PRIORITY = 'priority';
const PARENTS = 'parents';
const CHILDREN = 'children';
const CHILD_SETTINGS = 'childSettings';
const FEATURE_CONFIG = 'featureConfig';
const EXCLUDE_ASSETS = 'exludeAssets';
const EXCLUDE_AUX_DATA = 'excludeAuxData';
const EXCLUDE_ACCOUNTS = 'excludeAccounts';
const DELETE_DETAILS = 'deleteDetails';
const MARKETS_DATA_SUMMARY = 'marketDataSummary';
const SUMMARY_DATA = 'summaryData';
const DEFAULT = 'default';
const LINKTYPES = Object.freeze({ L: 'L', O: 'O', P: 'P' });
const INCLUDE_EMAILS_OPTION = 'includeEmails';
const INCLUDE_EMAIL_FEATURE_CONFIGS = 'includeEmailFeatureConfigs';
const ID_TYPE = 'idType';
const HTTP_OK = 200;
const HTTP_NOT_CHANGED = 304;
const PARENT_ACCOUNT_ID = 'parentAccountId';
const PHONE_NUMBER = 'phoneNumber';
const ASSETS = 'assets';
const LINK_LIMIT = 'linkLimit';
const ALL_ASSET_IDS = '/.+/'; // Symbolically means 'any asset id' :)
const DATE_REGEX = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])/;
const ASSIGNED_ZIP_CODES = 'assignedZipCodes';
const TRUE_ONLY = 'trueOnly';
const ANY_BOOLEAN = 'anyBoolean';
const CLEAR_ALL_ATTRIBUTES = 'clearAllAttributes';
const CURRENT_RECORD_TYPE = 'currentRecordType';
const EXTRA_DATA = 'extraData';
const HIERARCHY_MAPS = 'hierarchyMaps';
const OPERATION_UPDATE = 'update';
const OPERATION_DELETE = 'delete';
const OPERATION = 'operation';
const PROSOFT_CONTEXT = 'prosoftContext';
const SUCCESS_ADD_PRODUCT = 'successfully added product';
const FEATURE_TYPE_EMAIL_DATA_TO_CREATE = 'featureTypeEmailDataToCreate';
const FEATURE_TYPE_EMAIL_DATA_TO_SET = 'featureTypeEmailDataToSet';
const FEATURE_TYPE_EMAIL_DATA_TO_DELETE = 'featureTypeEmailDataToDelete';
const ATTRIBUTES_ONLY_THESE_EMAILS_SHOULD_HAVE = 'attributesOnlyTheseEmailsShouldHave';
const INDIVIDUAL_EMAIL_CONFIGS = 'individualEmailConfigs';
const ACCOUNT = 'account';
const HIERARCHY_IDS = 'hierarchyIds';
const PRODUCT_TYPES = 'productTypes';

const PROCESSED = 'processed';
const REPROCESS = 'reprocess';
const SUCCESS = 'success';
const FAILURE = 'failure';
const EVENT_SNS_MESSAGE_ID = 'eventSnsMessageId';
const EVENT_SNS_TIMESTAMP = 'eventSnsTimestamp';
const EVENT_OPERATION = 'eventOperation';
const BATCHING_QUEUE = 'batchingQueue';
const EVENTS_QUEUE = 'eventsQueue';
const EVENTS_DEADLETTER_QUEUE = 'eventsDeadLetterQueue';
const BATCHING_DEADLETTER_QUEUE = 'batchingDeadLetterQueue';
const LICENSING_EVENT_DATA = 'licensingEventData';
const POTENTIALLY_AFFECTED_IDS = 'potentiallyAffectedAccountIds';
const PAYLOAD = 'payload';

module.exports = {
    PARTY_ID,
    ACCOUNTS,
    ACCOUNT_ID,
    ATTRIBUTES,
    CREATEDBY,
    ATTRIBUTE_TYPE_VECTOR,
    VALUES,
    VALUE,
    ATTRIBUTE_TYPE_SINGLETON,
    ACCOUNT_TYPE,
    ASSET_ID,
    LINKED_ACCOUNT_ID,
    LINK_TYPE,
    EMAIL,
    EMAIL_TYPE,
    UNDEFINED,
    PLAIN_TEXT,
    DELETED,
    EMAIL_ID,
    FEATURE_TYPE_ID,
    CREATED,
    PROPAGATED,
    PRODUCT,
    PRODUCT_ID,
    OWNER_AND_LINKED_ACCOUNTS,
    LINKED_TO_ACCOUNT_ID,
    PRODUCT_TYPE_NAME,
    PRODUCT_TYPE_ID,
    PRODUCT_PROPERTIES,
    ASSET,
    FEATURE_TYPE_NAME,
    UPDATED,
    NOTES,
    MARKET_ZIPS,
    ACCOUNT_IDS,
    FEATURE_TYPE_NAMES,
    VALID_MARKET_ZIPS,
    INVALID_MARKET_ZIPS,
    MARKETS,
    NUMBER_OF_LINKS,
    FEATURE_DATA_MAP,
    HAS_MARKETS,
    HIERARCHY,
    SELF_OWNED,
    PRODUCT_LINK,
    FEATURE_LIST,
    SETTINGS,
    EMAILS,
    RESULTSET_TYPE_ALL,
    RESULTSET_TYPE_ACCOUNTS_AND_FEATURE_TYPES,
    RESULTSET_TYPE_FEATURES,
    RESULTSET_TYPE_SUMMARY,
    TYPE_ONLY,
    INCLUDE_ASSETS_AND_SUMMARY,
    OWNER_SUMMARY,
    CORE_SETTINGS_RECORD,
    UNPROPAGATED_SETTINGS_RECORD,
    FROM_UNPROPAGATED_HISTORY,
    ACCOUNT_IDS_BY_ACCOUNT_TYPE,
    PARENT_IDS_TO_CHILD_IDS,
    STANDARD_MAP,
    ANY,
    PRODUCT_FEATURE_SETTINGS_ID,
    FEATURE_TYPE,
    PRIORITY,
    PARENTS,
    CHILDREN,
    CHILD_SETTINGS,
    FEATURE_CONFIG,
    EXCLUDE_ASSETS,
    EXCLUDE_AUX_DATA,
    EXCLUDE_ACCOUNTS,
    DELETE_DETAILS,
    MARKETS_DATA_SUMMARY,
    SUMMARY_DATA,
    DEFAULT,
    LINKTYPES,
    INCLUDE_EMAILS_OPTION,
    INCLUDE_EMAIL_FEATURE_CONFIGS,
    ID_TYPE,
    HTTP_OK,
    HTTP_NOT_CHANGED,
    PARENT_ACCOUNT_ID,
    PHONE_NUMBER,
    ASSETS,
    LINK_LIMIT,
    ALL_ASSET_IDS,
    DATE_REGEX,
    ASSIGNED_ZIP_CODES,
    TRUE_ONLY,
    ANY_BOOLEAN,
    CLEAR_ALL_ATTRIBUTES,
    CURRENT_RECORD_TYPE,
    EXTRA_DATA,
    HIERARCHY_MAPS,
    OPERATION_UPDATE,
    OPERATION_DELETE,
    OPERATION,
    PROSOFT_CONTEXT,
    SUCCESS_ADD_PRODUCT,
    FEATURE_TYPE_EMAIL_DATA_TO_CREATE,
    FEATURE_TYPE_EMAIL_DATA_TO_SET,
    FEATURE_TYPE_EMAIL_DATA_TO_DELETE,
    ATTRIBUTES_ONLY_THESE_EMAILS_SHOULD_HAVE,
    INDIVIDUAL_EMAIL_CONFIGS,
    ACCOUNT,
    HIERARCHY_IDS,
    PRODUCT_TYPES,

    PROCESSED,
    REPROCESS,
    SUCCESS,
    FAILURE,
    EVENT_SNS_MESSAGE_ID,
    EVENT_SNS_TIMESTAMP,
    EVENT_OPERATION,
    EVENTS_QUEUE,
    EVENTS_DEADLETTER_QUEUE,
    BATCHING_DEADLETTER_QUEUE,
    BATCHING_QUEUE,
    LICENSING_EVENT_DATA,
    POTENTIALLY_AFFECTED_IDS,
    PAYLOAD
};
