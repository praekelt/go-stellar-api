module.exports = function(username) {
  return {
    'spam@ham.org': {
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
      kdfParams: {
        algorithm: 'scrypt',
        bits: 256,
        n: 2,
        r: 2,
        p: 1
      }
    }
  }[username];
};
