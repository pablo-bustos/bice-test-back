const configs = require('../configs/config');
const _ = require('lodash');
const validateDate = require('validate-date');

function DateRequest(param, date){
  this.isValid = () => {
    return _.isString(param) && configs.api.endpoints.date.params.key.split('|').indexOf(param) >= 0
      && validateDate(date, responseType="boolean", dateFormat=configs.api.endpoints.date.params.date);
  }

  this.getRequest = () => {
    return `${configs.api.protocol}://${configs.api.domain}${configs.api.endpoints.date.base_url}/${param}/${date}`;
  }
}

module.exports = DateRequest;