var R = require('ramda');
var util = require('util');
var jomini = require('jomini');

function flattenHistory(history) {
  var isDate = R.pipe(R.split('.'), R.length, R.gt(2));
  var split = R.partition(isDate, R.keys(history));

  var initial = {
    date: new Date(Date.UTC(1, 0, 1)),
    events: R.omit(split[1], history)
  };

  // Some of the dates may have multiple events spread over multiple
  // instances, for eg: '1800.1.1': [{owner: 'FRA'}, {religion: 'reformed'}].
  // We want to combine these arrays into a single object
  var acct = function(acc, val) {
    var valArr = util.isArray(history[val]) ? history[val] : [history[val]];
    return R.append({
      date: jomini.toDate(val),
      events: R.foldl(R.mixin, {}, valArr)
    }, acc);
  };

  var arr = R.foldl(acct, [], split[1]);
  return split[0].length > 0 ? R.prepend(initial, arr) : arr;
}

module.exports = flattenHistory;
