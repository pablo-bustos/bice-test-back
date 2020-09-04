const configs = require('../configs/config');
const _ = require('lodash');
const validateDate = require('validate-date');

function ValueRequest(param){
  this.isValid = () => {
    return _.isString(param) && configs.api.endpoints.values.params.key.split('|').indexOf(param) >= 0;
  }

  this.getRequest = () => {
    return `${configs.api.protocol}://${configs.api.domain}${configs.api.endpoints.values.base_url}/${param}`;
  }
}

module.exports = ValueRequest;