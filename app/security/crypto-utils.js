const config = require('../configs/config');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const algorithm = "aes-256-cbc";
//const iv = "8dde22651bf488c3fad899b508a50c50"; //crypto.randomBytes(16);
const iv = Buffer.from("1234123412341234", "utf8").toString('hex');
const llave = "f25df5319b19b5ac04e023e5e672ca80b2335090ff7bd3ce2a696373212f40d2"; //crypto.randomBytes(16);


const CryptoSec = {
  encrypt: (data) => {
    const key = fs.readFileSync(path.resolve('./security/keys/bice.pub'), 'utf8');
    return crypto.publicEncrypt(key, Buffer.from(data)).toString("base64");
  },

  decrypt: (data) => {
    const key = fs.readFileSync(path.resolve('./security/keys/bice.priv'), 'utf8');
    return crypto.privateDecrypt(key, Buffer.from(data, "base64")).toString();
  },

  aesEncrypt: (data, password) => {
    const cipherer = crypto.createCipheriv(algorithm, Buffer.from(llave, "hex"), Buffer.from(iv,"hex"))
    let result = cipherer.update(data);
    result = Buffer.concat([result, cipherer.final()])
    return result.toString('base64');
  },

  aesDecrypt: (data, password) => {
    data = Buffer.from(data, "base64");
    const cipherer = crypto.createDecipheriv(algorithm, Buffer.from(llave, "hex"), Buffer.from(iv, "hex"));
    let result = cipherer.update(data);
    result = Buffer.concat([result, cipherer.final()]);
    return result.toString('utf8'); 
  },
};

module.exports = CryptoSec;

