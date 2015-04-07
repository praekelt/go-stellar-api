module.exports = function() {
  return {
    wallet_server: 'http://localhost:3000',

    kdf_params: {
      algorithm: 'scrypt',
      bits: 256,
      n: 2,
      r: 2,
      p: 1
    }
  };
};
