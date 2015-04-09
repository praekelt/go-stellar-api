var wallets = exports,
    walletSdk = require('stellar-wallet-js-sdk');


wallets.create = function(params) {
  var keyPair = walletSdk.util.generateKeyPair();

  // TODO handle errors thrown by the sdk
  return walletSdk.createWallet({
    server: params.wallet_server,
    username: params.username,
    password: params.password,
    kdfParams: params.kdf_params,
    keychainData: JSON.stringify(keyPair),
    publicKey: keyPair.publicKey,
    mainData: ''
  });
};
