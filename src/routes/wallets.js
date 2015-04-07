var express = require('express'),
    wallets = require('../api').wallets,
    app = require('../app');


module.exports = express.Router()
  .post('/', function(req, res, next) {
    // TODO validate request body
    wallets.create(req.app.get('conf'), req.body)
      .then(function() { res.send({}); })
      .nodeify(next);
  });
