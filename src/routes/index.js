var express = require('express');


module.exports = express.Router()
  .use('/wallets/', require('./wallets'));
