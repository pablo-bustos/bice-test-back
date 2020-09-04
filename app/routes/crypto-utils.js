var express = require('express');
var router = express.Router();
const cryptoUtils = require('../security/crypto-utils');

router.post('/encrypt', (req, res) => {
  try {
    const response = {};
    Object.keys(req.body).forEach(e => {
      response[e] = cryptoUtils.encrypt(req.body[e]);
    });
    res.status(200).send(response);
  } catch (exception) {
    res.status(500).send(exception.toString());
  }
});

router.post('/decrypt', (req, res) => {
  try {
    const response = {};
    Object.keys(req.body).forEach(e => {
      response[e] = cryptoUtils.decrypt(req.body[e]);
    });
    res.status(200).send(response);
  } catch (exception) {
    res.status(500).send(exception.toString());
  }
});

router.post('/aes/encrypt', (req, res) => {
  try {
    const response = {};
    Object.keys(req.body).forEach(e => {
      response[e] = cryptoUtils.aesEncrypt(req.body[e]);
    });
    res.status(200).send(response);
  } catch (exception) {
    res.status(500).send(exception.toString());
  }
});

router.post('/aes/decrypt', (req, res) => {
  try {
    const response = {};
    Object.keys(req.body).forEach(e => {
      response[e] = cryptoUtils.aesDecrypt(req.body[e]);
    });
    res.status(200).send(response);
  } catch (exception) {
    res.status(500).send(exception.toString());
  }
});

module.exports = router;