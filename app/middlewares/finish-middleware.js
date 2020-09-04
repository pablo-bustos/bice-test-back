const responses = require('../utils/responses');

function FinishMiddleware(request, response){
  responses.send(response, response.locals.result); 
}

module.exports = FinishMiddleware;