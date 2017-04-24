const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: { type: String, trim: true, required: true},
  bedrooms: { type: String, required: true },
  ppw: { type: String },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, {
  timestamps: true
});




module.exports = mongoose.model('Property', propertySchema);
