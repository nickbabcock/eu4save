var expect = require('chai').expect;
var sink = require('../lib/provinces/sink-province-id');

describe('sink-province-id', function() {
  it('should sink id', function() {
    var obj = {
      provinces: {
        '-1': {
          name: 'Stockholm'
        },
        '-2': {
          name: 'Östergötland'
        }
      }
    };

    sink(obj);
    expect(obj.provinces).to.have.deep.members([{
        name: 'Stockholm',
        id: 1
      }, {
        name: 'Östergötland',
        id: 2
      }]);
  });

  it('should make provinces an array by default', function() {
    var obj = {};
    sink(obj);
    expect(obj.provinces).to.deep.equal([]);
  });

  it('should make provinces ordered by id', function() {
    var obj = {
      provinces: {
        '-1': {
          name: 'Stockholm'
        },
        '-2': {
          name: 'Östergötland'
        },
        '-1000': {
          name: 'Fort Saint-Jacques'
        },
      }
    };

    sink(obj);
    expect(obj.provinces).to.deep.equal([{
        name: 'Stockholm',
        id: 1
      }, {
        name: 'Östergötland',
        id: 2
      }, {
        name: 'Fort Saint-Jacques',
        id: 1000
      }]);
  });
});
