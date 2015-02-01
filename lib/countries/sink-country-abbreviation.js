// The default country structure in an eu4 save has the country's abbreviation
// as the key value. This isn't the most convenient structure, so we turn the
// countries object into an array with the abbreviation now a field in each
// country
function sinkCountryAbbreviation(obj) {
  var countries = [];
  for (var prop in obj.countries) {
    obj.countries[prop].abbreviation = prop;
    countries.push(obj.countries[prop]);
  }

  obj.countries = countries;
};

module.exports = sinkCountryAbbreviation;
