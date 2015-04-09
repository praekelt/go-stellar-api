var extend = require('extend'),
    walletSdk = require('stellar-wallet-js-sdk');


module.exports = function(username) {
  return {
    'spam@ham.org': fixture({
      server: 'http://fakewalletserver.org/v2',
      username: 'spam@ham.org',
      password: 't00r',
      keyPair: {
        address: 'gajc65uAsK4AgQM771SqkntWyVQL48GBjK',
        secret: 'sfSU4rF2UuKTCQG5kTukEqNsuUgUTgf2UuC2gsEokxtypwCeJbZ',
        secretKey: 'JcLMbIfE9revV7Mj6uVoJapXemG5itPOcu1e1RpvUEC3Vp0MuWQM+AGaeRqF50cSiNZJxX4lX+nEaAVhGW88xg==',
        publicKey: 't1adDLlkDPgBmnkahedHEojWScV+JV/pxGgFYRlvPMY='
      },
      mainData: '',
      totpEnabled: false,
      kdfParams: {
        algorithm: 'scrypt',
        bits: 256,
        n: 2,
        r: 2,
        p: 1
      },
      masterKey: [
        -1830265364,
        -1060254570,
        1582592107,
        -1153518659,
        1094928358,
        -1750137082,
        1844095556,
        1487140878
      ],
      walletId: [
        -1342793472,
        -1175319241,
        -2095488028,
        -584959001,
        1196271854,
        -1396960380,
        430012030,
        -563619323
      ],
      walletKey: [
        -908878483,
        566593407,
        -1172243769,
        1318745934,
        977827846,
        -439033250,
        1277965531,
        -1050275274
      ]
    })
  }[username];
};


function fixture(data) {
  return extend(data, {
    wallet: walletSdk.createFromData({
      server: data.server,
      username: data.username,
      rawMasterKey: data.masterKey,
      rawWalletId: data.walletId,
      rawWalletKey: data.walletKey,
      rawMainData: data.mainData,
      rawKeychainData: JSON.stringify(data.keyPair),
      lockVersion: data.lockVersion,
      totpEnabled: data.totpEnabled
    })
  });
}
