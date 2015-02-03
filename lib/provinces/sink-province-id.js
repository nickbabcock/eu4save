var R = require('ramda');

// The default province structure in an eu4 save has the province's id as the
// key value. This isn't the most convenient structure, so we turn the
// provincea object into an array with the id now a field in each province
function sinkProvinceId(obj) {
  var func = function (acc, val) {
    return R.append(R.assoc('id', -(+val), obj.provinces[val]), acc);
  };
  var provinces = R.foldl(func, [], R.keys(obj.provinces));
  obj.provinces = R.sortBy(R.prop('id'), provinces);
}

module.exports = sinkProvinceId;
