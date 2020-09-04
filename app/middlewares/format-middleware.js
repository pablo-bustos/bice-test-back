const responses = require('../utils/responses');
const formatController = new (require('../controllers/format-controller'));

function FormatMiddleware() {
  this.formatValuesForGoogleCharts = async (request, response, next) => {
    try {
      response.locals.result = formatController.formatValues(response.locals.result);
      next();
    } catch (exception) {
      responses.internalError(response, exception.toString());
    }
  }
}

module.exports = FormatMiddleware;