var debug = require('debug')('error');
var errors = exports;


errors.internal = function(err, req, res, next) {
  debug(err.stack);

  res
    .status(500)
    .send({
      errors: [{
        type: 'internal_error',
        message: 'Internal Error'
      }]
    });
};
