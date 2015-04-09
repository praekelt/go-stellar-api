module.exports = function() {
  return {
    wallet_server: 'http://localhost:3000/v2',

    kdf_params: {
      algorithm: 'scrypt',
      bits: 256,
      n: 2,
      r: 2,
      p: 1
    }
  };
};
