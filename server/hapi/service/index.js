'use strict';

const operationsConfig = require('config/operations.js');

module.exports = {
    //account events
    [operationsConfig.OPERATION_CREATE_ACCOUNT]: require('./account.js').create,
    [operationsConfig.OPERATION_DELETE_ACCOUNT]: require('./account.js').delete,
    [operationsConfig.OPERATION_UPDATE_ACCOUNT]: require('./account.js').update,
    [operationsConfig.OPERATION_SYNCHRONIZE_HIERARCHY_ACCOUNT]: require('./account.js').syncAccountHierarchy,

    //product events
    [operationsConfig.OPERATION_ADD_PRODUCT]: require('./product.js').add,
    [operationsConfig.OPERATION_REMOVE_PRODUCT]: require('./product.js').remove,
    [operationsConfig.OPERATION_UPDATE_PRODUCT]: require('./product.js').update,
    [operationsConfig.OPERATION_PRODUCTADD_LINK_SETTINGS]: require('./product.js').addProductAndSettings,

    //email events
    [operationsConfig.OPERATION_POST_EMAIL_LISTS]: require('./email.js').postEmailLists,
    [operationsConfig.OPERATION_ADD_EMAIL]: require('./email.js').add,
    [operationsConfig.OPERATION_REMOVE_EMAIL]: require('./email.js').remove,
    [operationsConfig.OPERATION_UPDATE_EMAIL]: require('./email.js').update,
    [operationsConfig.OPERATION_ADD_EMAIL_TO_FEATURE]: require('./email.js').addEmailToFeature,
    [operationsConfig.OPERATION_REMOVE_EMAIL_FROM_FEATURE]: require('./email.js').removeEmailFromFeature,
    [operationsConfig.OPERATION_SET_EMAIL_ATTRIBUTE_FOR_FEATURE]: require('./email.js').setEmailAttributeForFeature,
    [operationsConfig.OPERATION_UPDATE_EMAIL_ATTRIBUTE_FOR_FEATURE]: require('./email.js').updateEmailAttributeForFeature,
    [operationsConfig.OPERATION_DELETE_EMAIL_ATTRIBUTE_FOR_FEATURE]: require('./email.js').deleteEmailAttributeForFeature,
    [operationsConfig.OPERATION_BULK_UPDATE_EMAIL_ATTRIBUTE_FOR_FEATURE]: require('./email.js').bulkUpdateEmailAttributeForFeature,

    //product link events
    [operationsConfig.OPERATION_LINK_PRODUCT_TO_ACCOUNT]: require('./productLink.js').linkProductToAccount,
    [operationsConfig.OPERATION_LINK_PRODUCTS_TO_ACCOUNTS]: require('./productLink.js').linkProductsToAccounts,
    [operationsConfig.OPERATION_UNLINK_PRODUCT_FROM_ACCOUNT]: require('./productLink.js').unlinkProductFromAccount,

    //settings events
    [operationsConfig.OPERATION_UPDATE_FEATURE_SETTINGS]: require('./settings.js').updateFeatureSettings
};
