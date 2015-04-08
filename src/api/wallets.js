var wallets = exports,
    urlJoin = require('url-join'),
    walletSdk = require('stellar-wallet-js-sdk');


wallets.create = function(params) {
  var keys = walletSdk.util.generateKeyPair();

  // TODO handle errors thrown by the sdk
  return walletSdk.createWallet({
    server: urlJoin(params.wallet_server, 'v2'),
    username: params.username,
    password: params.password,
    kdfParams: params.kdf_params,
    keychainData: JSON.stringify(keys),
    publicKey: keys.publicKey,
    mainData: ''
  });
};
