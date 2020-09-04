const DateRequest = require('../models/date-request');
const LastRequest = require('../models/last-request');
const ValueRequest = require('../models/value-request');
const responses = require('../utils/responses');

function ValidateRequestMiddleware() {
  this.generateValidLastRequest = (request, response, next) => {
    response.locals.backendRequest = new LastRequest();
    next();
  }

  this.isValueRequestValid = (request, response, next) => {
    try {
      if (request.body && request.body.param) {
        const backendRequest = new ValueRequest(request.body.param);
        if (backendRequest.isValid()) {
          response.locals.backendRequest = backendRequest;
          next();
        } else {
          responses.incompleteOrInvalidRequest();
        }
      } else {
        responses.incompleteOrInvalidRequest();
      }
    } catch (exception) {
      responses.internalError(response, exception.toString());
    }
  };

  this.isDateRequestValid = (request, response, next) => {
    try {
      if (request.body && request.body.param && request.body.date) {
        const backendRequest = new DateRequest(request.body.param, request.body.date);
        if (backendRequest.isValid()) {
          response.locals.backendRequest = backendRequest;
          next();
        } else {
          responses.incompleteOrInvalidRequest();
        }
      } else {
        responses.incompleteOrInvalidRequest();
      }
    } catch (exception) {
      responses.internalError(response, exception.toString());
    }
  };
}

module.exports = ValidateRequestMiddleware;