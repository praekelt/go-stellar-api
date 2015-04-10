var assert = require('assert'),
    request = require('supertest'),
    defaults = require('defaults'),
    sinon = require('sinon'),
    walletSdk = require('stellar-wallet-js-sdk'),
    app = require('../src/app'),
    fixtures = require('./fixtures'),
    Promise = require('bluebird');


describe("/payments/", function() {
  describe("POST /payments/", function() {
    var conf;

    beforeEach(function() {
      conf = defaults({}, app.get('conf'));
      app.set('conf', conf);
      sinon.stub(walletSdk, 'getWallet');
      fixtures.requests.setup();
    });

    afterEach(function() {
      walletSdk.getWallet.restore();
      fixtures.requests.teardown();
    });

    it("should create a payment for stellar amounts", function(done) {
      var src = fixtures.wallets('spam@ham.org');
      var dest = fixtures.wallets('eggs@ham.org');
      conf.wallet_server = src.server;
      conf.stellar_api = fixtures.requests('stellarApi:url');

      walletSdk.getWallet
        .withArgs({
          server: conf.wallet_server,
          username: src.username,
          password: src.password
        })
        .returns(Promise.resolve(src.wallet));

      walletSdk.getWallet
        .withArgs({
          server: conf.wallet_server,
          username: dest.username,
          password: dest.password
        })
        .returns(Promise.resolve(dest.wallet));

      request(app)
        .post('/payments/')
        .send({
          src_username: src.username,
          src_password: src.password,
          dest_username: dest.username,
          dest_password: dest.password,
          amount: 1
        })
        .expect(200)
        .expect({})
        .expect(function() {
          assert(fixtures.requests('stellarApi:payment:str').isDone());
        })
        .end(done);
    });

    it("should create a payment for non-stellar amounts", function(done) {
      var src = fixtures.wallets('spam@ham.org');
      var dest = fixtures.wallets('eggs@ham.org');
      var issuer = fixtures.requests('stellarApi:issuer');
      conf.wallet_server = src.server;
      conf.stellar_api = fixtures.requests('stellarApi:url');

      walletSdk.getWallet
        .withArgs({
          server: conf.wallet_server,
          username: src.username,
          password: src.password
        })
        .returns(Promise.resolve(src.wallet));

      walletSdk.getWallet
        .withArgs({
          server: conf.wallet_server,
          username: dest.username,
          password: dest.password
        })
        .returns(Promise.resolve(dest.wallet));

      request(app)
        .post('/payments/')
        .send({
          src_username: src.username,
          src_password: src.password,
          dest_username: dest.username,
          dest_password: dest.password,
          amount: {
            value : 1,
            currency : 'USD',
            issuer : issuer
          }
        })
        .expect(200)
        .expect({})
        .expect(function() {
          assert(fixtures.requests('stellarApi:payment:usd').isDone());
        })
        .end(done);
    });
  });
});
