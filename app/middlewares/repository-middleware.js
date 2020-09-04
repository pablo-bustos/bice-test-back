const responses = require('../utils/responses');
const baseController = new (require('../controllers/base-controller'));
const lastRequest = new (require('../models/last-request'));

function RepositoryMiddleware() {
  this.getData = async (request, response, next) => {
    try {
      //responses.send(response, await baseController.getData(response.locals.backendRequest));
      response.locals.result = await baseController.getData(response.locals.backendRequest);
      next();
    } catch (exception) {
      responses.internalError(response, exception.toString());
    }
  }
}

module.exports = RepositoryMiddleware;