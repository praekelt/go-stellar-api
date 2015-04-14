var extend = require('extend'),
    walletSdk = require('stellar-wallet-js-sdk'),
    fixtureSet = require('./fixture-set');


module.exports = fixtureSet()
  .add('spam@ham.org', fixture({
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
  }))
  .add('eggs@ham.org', fixture({
    server: 'http://fakewalletserver.org/v2',
    username: 'eggs@ham.org',
    password: 'r00t',
    kdfParams: {
      algorithm: 'scrypt',
      bits: 256,
      n: 2,
      r: 2,
      p: 1
    },
    masterKey: [
      -679916462,
      -1550398217,
      -1551266150,
      -1929235214,
      -216986543,
      342694780,
      1925262505,
      -1820042274
    ],
    walletId: [
      -632544014,
      -2131742615,
      -430146105,
      -1176756687,
      -1446227894,
      -304491366,
      1692485075,
      -837484427
    ],
    walletKey: [
      1934014606,
      -1459061741,
      -1927411001,
      1654647685,
      -595060025,
      -801144034,
      -539896453,
      -1936240292
    ],
    mainData: '',
    keyPair: {
      address: 'gLk2FP9PFw1TFAt7kyAVuJpr4vLapiVRSJ',
      secret: 's3VJj1XUuJKgDAc95jyJYN5mSvZZk7gbnkmD2PNPQz5x3DdQZ1Y',
      secretKey: 'sIShOWVGPcXhF/yXvz5zHOUKFKe8XxhoMqmQviVC7RRnibz7CcHChsUfS/mKcGPElbz0MZy02QN8s8b94nboaw==',
      publicKey: 'Z4m8+wnBwobFH0v5inBjxJW89DGctNkDfLPG/eJ26Gs='
    }
  }));


function fixture(data) {
  return extend({
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
  }, data);
}
