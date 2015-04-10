var request = require('supertest'),
    app = require('../src/app'),
    routes = require('../src/routes');


describe("errors", function() {
  it("should handle internal errors", function(done) {
    routes
      .get('/foo', function(req, rep, next) {
        throw new Error(':/');
      });

    request(app)
      .get('/foo')
      .expect(500)
      .expect({
        errors: [{
          type: 'internal_error',
          message: 'Internal Error'
        }]
      })
      .end(done);
  });
});
