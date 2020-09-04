const configs = require('../configs/config');

function LastRequest(){
  this.isValid = () => { return true; };

  this.getRequest = () => {
    return `${configs.api.protocol}://${configs.api.domain}${configs.api.endpoints.last.base_url}`;
  }
}

module.exports = LastRequest;