var request = require('supertest'),
    defaults = require('defaults'),
    sinon = require('sinon'),
    walletSdk = require('stellar-wallet-js-sdk'),
    app = require('../src/app'),
    Promise = require('bluebird').Promise;


describe("/wallets/", function() {
  describe("POST /wallets/", function() {
    var keys;
    var conf;

    beforeEach(function() {
      conf = {
        wallet_server: 'http://fakewalletserver.org',
        kdf_params: {
          algorithm: 'scrypt',
          bits: 256,
          n: 2,
          r: 2,
          p: 1
        }
      };

      defaults(conf, app.get('conf'));
      app.set('conf', conf);

      keys = walletSdk.util.generateKeyPair();
      sinon.stub(walletSdk, 'createWallet');
      sinon.stub(walletSdk.util, 'generateKeyPair').returns(keys);
    });

    afterEach(function() {
      walletSdk.util.generateKeyPair.restore();
      walletSdk.createWallet.restore();
    });

    it("should create a wallet", function(done) {
      walletSdk.createWallet
        .withArgs({
          server: 'http://fakewalletserver.org/v2',
          username: 'spam@ham.org',
          password: 'r00t',
          kdfParams: conf.kdf_params,
          keychainData: JSON.stringify(keys),
          publicKey: keys.publicKey,
          mainData: ''
        })
        .returns(Promise.resolve());

      request(app)
        .post('/wallets/')
        .send({
          username: 'spam@ham.org',
          password: 'r00t'
        })
        .expect(200)
        .end(done);
    });
  });
});
