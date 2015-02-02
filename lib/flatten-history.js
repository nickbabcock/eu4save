var R = require('ramda');
var util = require('util');
var jomini = require('jomini');

function flattenHistory(history) {
  var result = [];

  var isDate = R.pipe(R.split('.'), R.length, R.gt(2));
  var split = R.partition(isDate, R.keys(history));

  var initial = {
    date: new Date(Date.UTC(1, 0, 1)),
    events: R.omit(split[1], history)
  };

  // Some of the dates may have multiple events spread over multiple
  // instances, for eg: '1800.1.1': [{owner: 'FRA'}, {religion: 'reformed'}].
  // We want to combine these arrays into a single object
  var arr = [];
  for (var i = 0; i < split[1].length; i++) {
    if (!util.isArray(history[split[1][i]])) {
      arr.push({
        date: jomini.toDate(split[1][i]),
        events: history[split[1][i]]
      });
    } else {
      arr.push({
        date: jomini.toDate(split[1][i]),
        events: R.foldl(R.mixin, {}, history[split[1][i]])
      });
    }
  }

  return split[0].length > 0 ? R.prepend(initial, arr) : arr;
}

module.exports = flattenHistory;
