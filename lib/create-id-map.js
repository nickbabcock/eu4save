var is = require('is_js');
var R = require('ramda');

// Recursively iterates a given objects properties looking for id objects and
// will return generator of key value pairs with the id's id integer value and
// the object that has this id.
function* generatePairs(obj) {
  var nestedObjs = R.filter(R.compose(is.object, R.propOf(obj)), R.keys(obj));
  if (R.contains('id', nestedObjs)) {
    yield [obj.id.id, obj];
  }

  for (var prop of nestedObjs) {
    yield* generatePairs(obj[prop]);
  }
};

// Creates a map of id values to objects
function createIdMap(obj) {
  return new Map(generatePairs(obj));
};

module.exports = createIdMap;
