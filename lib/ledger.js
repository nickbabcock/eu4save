var R = require('ramda');

function smoothLedger(ledger) {
  var func = function(acc, val) {
    acc[val.name] = R.zip(val.ledger_data_x, val.ledger_data_y);
    return acc;
  };

  return R.foldl(func, {}, ledger.ledger_data);
};

module.exports = smoothLedger;
