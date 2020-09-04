const configs = require('../configs/config');
const cryptoUtils = require('../security/crypto-utils');
const _ = require('lodash');

function encryptEntireResponse(response) {
    if (!(response instanceof Object)) {
        console.info("no es objeto! ", response)
        if (undefined != response && null != response) {
            return cryptoUtils.aesEncrypt(response);
        } else {
            return response;
        }
    } else {
        Object.keys(response).forEach(key => {
            response[key] = this.encryptEntireResponse(response[key]);
        });
        return response;
    }
}

const Responses = {
    send: function (response, message, status = 200) {
        const result = "SUCCESS";
        if ('true' === process.env.ENCRYPTED_RESPONSES) {
            message = encryptEntireResponse(message);
        }
        response.status(status || configs.responseCode[result].code).send(message || configs.responseCode[result].default);
    },

    incompleteOrInvalidRequest: (response) => {
        const result = "BAD_REQUEST";
        response.status(configs.responseCode[result].code).send(configs.responseCode[result].default);
    },

    internalError: (response, exception) => {
        const result = "BAD_REQUEST";
        response.status(configs.responseCode[result].code).send(_.isUndefined(exception) ? configs.responseCode[result].default : exception);
    }
}

module.exports = Responses;