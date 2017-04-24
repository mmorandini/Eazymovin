const Property = require('../models/property');
const rp       = require('request-promise');


function propertiesIndex(req, res) {
  Property
    .find()
    .exec()
    .then(properties => {
      return res.render('properties', { properties });
    })
    .catch(err => {
      return res.render('error', { error: err });
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





module.exports = {
  index: propertiesIndex,
  show: propertiesShow
};
