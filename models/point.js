const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const bookingSchema = new mongoose.Schema({
  bookedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  bookingStartTime: { type: Date },
  bookingEndTime: { type: Date }
});

bookingSchema.methods.belongsTo = function bookingBookedBy(user) {
  return this.bookedBy.id === user.id;
};

const pointSchema = new mongoose.Schema({
  pointName: { type: String, required: true },
  address: { type: String, required: true},
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  available: { type: String },
  format: { type: String },
  notes: { type: String },
  bookingStartTime: { type: Number },
  bookingEndTime: { type: Number },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
  bookings: [bookingSchema]
});

pointSchema.methods.belongsTo = function pointBelongsTo(user) {
  return this.createdBy.id === user.id;
};



module.exports = mongoose.model('Point', pointSchema);
