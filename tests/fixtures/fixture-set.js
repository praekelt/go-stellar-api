module.exports = function(fixtures) {
  var store = {};
  fixtures = fixtures || {};
  fixtures.setup = fixtures.setup || noop;
  fixtures.teardown = fixtures.teardown || noop;


  function set(name) {
    return store[name];
  }


  set.add = function(name, fixture) {
    store[name] = fixture;
    return set;
  };


  set.setup = function() {
    fixtures.setup(set);
    return set;
  };


  set.teardown = function() {
    fixtures.teardown(set);
    store = {};
    return set;
  };


  return set;
};


function noop(){}
