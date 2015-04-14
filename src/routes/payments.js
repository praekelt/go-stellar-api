var express = require('express'),
    payments = require('../api').payments;


module.exports = express.Router()
  .post('/', function(req, res, next) {
    var conf = req.app.get('conf');

    // TODO validate request body
    // TODO handle errors given back from api
    payments.create({
        wallet_server: conf.wallet_server,
        stellar_api: conf.stellar_api,
        src_username: req.body.src_username,
        src_password: req.body.src_password,
        dest_username: req.body.dest_username,
        dest_password: req.body.dest_password,
        amount: req.body.amount
      })
      .then(function() { res.send({}); })
      .nodeify(next);
  });
