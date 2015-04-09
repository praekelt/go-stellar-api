var request = require('supertest'),
    defaults = require('defaults'),
    sinon = require('sinon'),
    walletSdk = require('stellar-wallet-js-sdk'),
    app = require('../src/app'),
    fixtures = require('./fixtures'),
    Promise = require('bluebird').Promise;


describe("/wallets/", function() {
  describe("POST /wallets/", function() {
    var conf;

    beforeEach(function() {
      conf = defaults({}, app.get('conf'));
      app.set('conf', conf);
      sinon.stub(walletSdk, 'createWallet');
      sinon.stub(walletSdk.util, 'generateKeyPair');
    });

    afterEach(function() {
      sinon.restore();
    });

    it("should create a wallet", function(done) {
      var wallet = fixtures.wallets('spam@ham.org');
      conf.wallet_server = wallet.server;
      conf.kdf_params = wallet.kdfParams;

      walletSdk.util.generateKeyPair
        .returns(wallet.keyPair);

      walletSdk.createWallet
        .withArgs({
          server: wallet.server,
          username: wallet.username,
          password: wallet.password,
          kdfParams: wallet.kdfParams,
          keychainData: JSON.stringify(wallet.keyPair),
          publicKey: wallet.keyPair.publicKey,
          mainData: wallet.mainData
        })
        .returns(Promise.resolve());

      request(app)
        .post('/wallets/')
        .send({
          username: wallet.username,
          password: wallet.password
        })
        .expect(200)
        .end(done);
    });
  });
});
