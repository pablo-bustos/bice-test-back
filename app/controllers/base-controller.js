const service = new (require('../services/base-service'));

function BaseController () {
  this.getData = async (request) => {
    try {
      return await service.call(request);
    } catch (exception) {
      throw exception.toString();
    }
  }
}

module.exports = BaseController;