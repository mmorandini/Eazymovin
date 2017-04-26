const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: { type: String, trim: true},
  bedrooms: { type: String},
  ppw: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  ratings: [{
    value: [{ type: Number }],
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }]
}, {
  timestamps: true
});




module.exports = mongoose.model('Property', propertySchema);
