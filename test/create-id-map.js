var expect = require('chai').expect;
var createIdMap = require('../lib/create-id-map');

describe('create-id-map', function() {
  it('should handle the simple case', function() {
    var obj = {
      foo: {
        name: 'me',
        id: {
          id: 10,
          type: 47
        }
      }
    };

    var map = createIdMap(obj);
    expect(map.size).to.equal(1);
    expect(map.has(10)).to.equal(true);
    expect(map.get(10).name).to.equal('me');
  });

  it('should handle multiple nested object', function() {
    var obj = {
      army: [{
        name: 'King me',
        id: {
          id: 10,
          type: 47
        },
        leader: {
          id: 202,
          type: 22
        },
        regiment: {
          name: 'reg 1',
          id: {
            id: 303,
            type: 20
          }
        }
      }, {
        name: 'King you',
        id: {
          id: 101,
          type: 48
        }
      }]
    };

    var map = createIdMap(obj);
    expect(map.size).to.equal(3);
    expect(map.get(10).name).to.equal('King me');
    expect(map.get(303).name).to.equal('reg 1');
    expect(map.get(101).name).to.equal('King you');
  });
});

