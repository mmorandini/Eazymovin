const Property = require('../models/property');
const rp       = require('request-promise');
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

function propertiesIndex(req, res) {
  Property
  .find()
  .exec()
  .then(properties => {
    return res.status(200).json(properties);
  })
  .catch(err => {
    return res.status(500).json({ message: err });
  });
}

function propertiesShow(req, res) {
  Property
  .findById(req.params.id)
  .exec()
  .then(property => {
    if (!property) {
      return res.render('error', { error: 'No property found' });
    }
    return res.render('properties/show', { property });
  })
  .catch(err => {
    return res.render('error', { err });
  });
}

function propertiesCreate(req, res) {
  Property.collection.drop();

  var request = {
    uri: `http://api.zoopla.co.uk/api/v1/property_listings.json?area=${req.body.postcode}&listing_status=rent&minimum_price=${req.body.min_price}&maximum_price=${req.body.max_price}&page_size=50`,
    qs: {
      api_key: '98t26raku5vfxj6zvdrtq9rr'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(request)
  .then(function (requestOutput) {
    console.log(requestOutput)
    return requestOutput.listing.map(property => {
      return{
        address: property.displayable_address,
        bedrooms: property.num_bedrooms,
        ppw: property.rental_prices.per_week,
        description: property.description,
        imageUrl: property.image_645_430_url,
        postcode: property.outcode,
        property_type: property.property_type,
        agent: property.agent_name,
        agent_logo: property.agent_logo,
        phone: property.agent_phone,
        coords: {
          lat: property.latitude,
          long: property.longitude
        }
      };
    });
  })
  .then(properties => {
    return Property.create(properties);
  })
  .then(properties => {
    console.log(`${properties.length} properties were created!`);

    res.render('properties/index', { properties, query: req.body.postcode });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
}

function propertiesRate (req, res, next){
  Property
    .findById(req.params.id)
    .exec()
    .then(property => {
      if (!property ) {
        const err = new Error('Property not found');
        err.status = 404;
        throw err;
      }
      console.log(req.body);
      const rating = {
        user: res.locals.user._id,
        value: req.body.rate
      };

      property.ratings.push(rating);

      return property.save();
    })
    .then((property) => {
      console.log(property);
      res.redirect(`/properties/${req.params.id}`);
    })
    .catch(next);
}


module.exports = {
  index: propertiesIndex,
  show: propertiesShow,
  create: propertiesCreate,
  rate: propertiesRate
};
