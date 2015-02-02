var expect = require('chai').expect;
var flatten = require('../lib/flatten-history');

describe('flatten-history', function() {
  it('should know undated events are initial events', function() {
    var history = {
      culture: 'chipewyan',
      religion: 'totemism',
      capital: 'Chipewyan'
    };

    var actual = flatten(history);
    expect(actual).to.deep.equal([{
      date: new Date(Date.UTC(1, 0, 1)),
      events: {
        culture: 'chipewyan',
        religion: 'totemism',
        capital: 'Chipewyan'
      }
    }]);
  });

  it('should sink dated events', function() {
    var history = {
      '1800.1.1': {
        owner: 'FRA'
      }
    };

    var actual = flatten(history);
    expect(actual).to.deep.equal([{
      date: new Date(Date.UTC(1800, 0, 1)),
      events: {
        owner: 'FRA'
      }
    }]);
  });

  it('should sink nested dated events', function() {
    var history = {
      '1800.1.1': [{
        owner: 'FRA'
      }, {
        controller: 'HAB'
      }]
    };

    var actual = flatten(history);
    expect(actual).to.deep.equal([{
      date: new Date(Date.UTC(1800, 0, 1)),
      events: {
        owner: 'FRA',
        controller: 'HAB'
      }
    }]);
  });
});
