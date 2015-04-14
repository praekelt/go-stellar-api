var assert = require('assert'),
    fixtureSet = require('./fixture-set');


describe("fixtureSet", function() {
  it("should support getting and setting fixtures", function() {
    var fixtures = fixtureSet();
    fixtures.add('foo', 'bar');
    assert.equal(fixtures('foo'), 'bar');
  });

  it("should support setting up", function() {
    var fixtures = fixtureSet({setup: setup});

    assert(typeof fixtures('foo') == 'undefined');
    fixtures.setup();
    assert.equal(fixtures('foo'), 'bar');

    function setup(fixtures) {
      fixtures.add('foo', 'bar');
    }
  });

  it("should support tearing down", function() {
    var givenFixtures;
    var fixtures = fixtureSet({teardown: teardown});

    assert(typeof givenFixtures == 'undefined');
    fixtures.teardown();
    assert.strictEqual(fixtures, givenFixtures);

    function teardown(fixtures) {
      givenFixtures = fixtures;
    }
  });

  it("should clear its fixtures on tear down", function() {
    var fixtures = fixtureSet({setup: setup}).setup();

    assert.equal(fixtures('foo'), 'bar');
    fixtures.teardown();
    assert(typeof fixtures('foo') == 'undefined');

    function setup(fixtures) {
      fixtures.add('foo', 'bar');
    }
  });
});
