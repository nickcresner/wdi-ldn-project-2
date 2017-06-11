const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  pointName: { type: String, required: true },
  address: { type: String, required: true},
  lat: { type: Number, required: true },
  lng: { type: Number },
  available: { type: String },
  format: { type: String },
  createdBy: { type: String }
});

module.exports = mongoose.model('Point', pointSchema);
