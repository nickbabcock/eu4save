var R = require('ramda');

// The default province structure in an eu4 save has the province's id as the
// key value. This isn't the most convenient structure, so we turn the
// provincea object into an array with the id now a field in each province
function sinkProvinceId(obj) {
  var provinces = [];
  for (var prop in obj.provinces) {
    // province ids are somehow negative, so we flip them
    obj.provinces[prop].id = -(+prop);
    provinces.push(obj.provinces[prop]);
  }

  obj.provinces = R.sortBy(R.prop('id'), provinces);
}

module.exports = sinkProvinceId;