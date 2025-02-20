const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightID: { type: String, required: true, unique: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  available: { type: Boolean, required: true }
});

module.exports = mongoose.model('flight', FlightSchema);
