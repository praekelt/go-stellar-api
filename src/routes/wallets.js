var express = require('express'),
    wallets = require('../api').wallets;


module.exports = express.Router()
  .post('/', function(req, res, next) {
    var conf = req.app.get('conf');

    // TODO validate request body
    // TODO handle errors given back from api
    wallets.create({
        wallet_server: conf.wallet_server,
        kdf_params: conf.kdf_params,
        username: req.body.username,
        password: req.body.password
      })
      .then(function() { res.send({}); })
      .nodeify(next);
  });
