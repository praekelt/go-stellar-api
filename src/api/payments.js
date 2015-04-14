var payments = exports,
    request = require('axios'),
    extend = require('extend'),
    Promise = require('bluebird'),
    wallets = require('./wallets');


payments.create = function(params) {
  return Promise.resolve(params)
    .then(setSrcData)
    .then(setDestData)
    .then(pay);
};


function setSrcData(params) {
  return wallets.getKeyPair({
      wallet_server: params.wallet_server,
      username: params.src_username,
      password: params.src_password
    })
    .then(function(keyPair) {
      return extend({
        src_address: keyPair.address,
        src_secret: keyPair.secret
      }, params);
    });
}


function setDestData(params) {
  // TODO replace with a way to get the address from a username once we have a
  // service for mapping usernames to addresses
  return wallets.getKeyPair({
      wallet_server: params.wallet_server,
      username: params.dest_username,
      password: params.dest_password
    })
    .then(function(keyPair) {
      return extend({dest_address: keyPair.address}, params);
    });
}


function pay(params) {
  // TODO replace with a way to make payments via horizon once horizon is
  // stable enough for us to use
  // TODO handle errors responses from stellar api
  return request.post(params.stellar_api, {
    method: 'submit',
    params: [{
      secret: params.src_secret,
      tx_json: {
        TransactionType: 'Payment',
        Account: params.src_address,
        Destination: params.dest_address,
        Amount: params.amount
      }
    }]
  });
}
