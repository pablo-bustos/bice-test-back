var express = require('express');
var router = express.Router();
const repositoryMiddleware = new (require('../middlewares/repository-middleware'));
const validateRequestMiddleware = new (require('../middlewares/validate-request-middleware'));
const formatMiddleware = new (require('../middlewares/format-middleware'));

router.post('/last', [
  validateRequestMiddleware.generateValidLastRequest,
  repositoryMiddleware.getData
]);

router.post('/values', [
  validateRequestMiddleware.isValueRequestValid, 
  repositoryMiddleware.getData,
  formatMiddleware.formatValuesForGoogleCharts
]);

router.post('/date', [
  validateRequestMiddleware.isDateRequestValid, 
  repositoryMiddleware.getData
]);


module.exports = router;
