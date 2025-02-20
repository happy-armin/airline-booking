const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  email: { type: String, required: true },
  flightID: { type: String, required: true, unique: true },
  seat: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('book', BookSchema);
