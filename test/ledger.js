var expect = require('chai').expect;
var ledger = require('../lib/ledger');

describe('ledger', function() {
  it('smooth out the data', function() {
    var obj = {
      ledger_data: [{
        ledger_data_x: [1445, 1446, 1447],
        ledger_data_y: [0, 2, 4],
        name: 'MEE'
      }, {
        ledger_data_x: [1445, 1446, 1447],
        ledger_data_y: [0, 4, 8],
        name: 'YOU'
      }]
    };

    var actual = ledger(obj);
    var expected = {
      MEE: [[1445, 0], [1446, 2], [1447, 4]],
      YOU: [[1445, 0], [1446, 4], [1447, 8]]
    };

    expect(actual).to.deep.equal(expected);
  });
});
