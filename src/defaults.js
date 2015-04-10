module.exports = function() {
  return {
    wallet_server: 'http://localhost:3000/v2',

    // scrypt is designed to be computationally intensive, as this makes
    // brute-force attacks difficult. For clients that are capable of running
    // an implementation of scrypt and have the time and computational power
    // (for eg, browser clients), this works well. For low-end mobile phones
    // interacting over USSD, this is not the case. Since we need to do the
    // encryption for our users when they interact with our services, a
    // computationally intensive algorithm running for each request is not
    // feasible. For this reason, we tweak the scrypt parameters to be less
    // computationally intensive, and need to rely on rate-limiting or a
    // similar approach to prevent brute-force attacks. scrypt's parameters can
    // be tweaked to choose whether it should be computationally intensive or
    // memory intensive. Simple tests don't show much of an impact on memory
    // with these current parameters, but we still need to test this more
    // thoroughly.
    // http://en.wikipedia.org/wiki/Scrypt
    kdf_params: {
      algorithm: 'scrypt',
      bits: 256,
      n: 2,
      r: 2,
      p: 1
    }
  };
};
