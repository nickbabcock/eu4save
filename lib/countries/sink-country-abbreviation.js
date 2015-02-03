var R = require('ramda');

// The default country structure in an eu4 save has the country's abbreviation
// as the key value. This isn't the most convenient structure, so we turn the
// countries object into an array with the abbreviation now a field in each
// country
function sinkCountryAbbreviation(obj) {
  obj.countries = R.foldl(function(acc, val) {
    return R.append(R.assoc('abbreviation', val, obj.countries[val]), acc);
  }, [], R.keys(obj.countries));
}

module.exports = sinkCountryAbbreviation;
