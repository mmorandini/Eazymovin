const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const rp         = require('request-promise');

const databaseURL = 'mongodb://localhost/proxy';
mongoose.connect(databaseURL);

const Property = require('../models/property');
const User     = require('../models/user');

Property.collection.drop();
User.collection.drop();


//hello

// var request = {
//   uri: `http://api.zoopla.co.uk/api/v1/property_listings.json?area=sw8&listing_status=rent&maximum_price=500&page_size=50`,
//   qs: {
//     api_key: '98t26raku5vfxj6zvdrtq9rr'
//   },
//   headers: {
//     'User-Agent': 'Request-Promise'
//   },
//   json: true
// };
//
// rp(request)
// .then(function (requestOutput) {
//   console.log(requestOutput.listing.length);
//   console.log(requestOutput.listing[0].image_645_430_url);
//
//
//   return requestOutput.listing.map(property => {
//
//     return{
//       address: property.displayable_address,
//       bedrooms: property.num_bedrooms,
//       ppw: property.rental_prices.per_week,
//       description: property.description,
//       imageUrl: property.image_645_430_url
//     };
//   });
// })
// .then(properties => {
//   return Property
//             .create(properties);
// })
// .then(properties => {
//   console.log(`${properties.length} properties were created!`);
// })
// .catch(err => {
//   console.log(`Error: ${err}`);
// })
// .finally(() => {
//   mongoose.connection.close();
// });
