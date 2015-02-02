var expect = require('chai').expect;
var sink = require('../lib/countries/sink-country-abbreviation');

describe('sink-country-abbreviation', function() {
  it('should sink abbreviations', function() {
    var obj = {
      countries: {
        REB: {
          name: 'Rebel'
        },
        FRA: {
          name: 'France'
        }
      }
    };

    sink(obj);
    expect(obj.countries).to.have.deep.members([{
        name: 'Rebel',
        abbreviation: 'REB'
      }, {
        name: 'France',
        abbreviation: 'FRA'
      }]);
  });

  it('should make countries an array by default', function() {
    var obj = {};
    sink(obj);
    expect(obj.countries).to.deep.equal([]);
  });
});
