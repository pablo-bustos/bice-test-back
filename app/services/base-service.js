const request = require('request');

function BaseService() {
  this.call = (requestObj) => {
    return new Promise((resolve, reject) => {
      request.get(
        requestObj.getRequest(),
        (error, response) => {
          if (error) {
            reject(error.statusCode)
          } else {
            resolve(response.body);
          }
        }
      );
    });
  }
}

module.exports = BaseService;