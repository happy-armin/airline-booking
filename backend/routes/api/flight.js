const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();

const Flight = require('../../models/Flight');

router.post(
  '/add',
  check('flightID', 'flightID is required').notEmpty(),
  check('departureAirport', 'departureAirport is required').notEmpty(),
  check('arrivalAirport', 'arrivalAirport is required').notEmpty(),
  check('departureTime', 'departureTime is required').notEmpty(),
  check('arrivalTime', 'arrivalTime is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      flightID,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime
    } = req.body;

    try {
      let flight = await Flight.findOne({ flightID });

      if (flight) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'flight already exists' }] });
      }

      flight = new Flight({
        flightID,
        departureAirport,
        arrivalAirport,
        departureTime,
        arrivalTime,
        available: false
      });

      await flight.save();

      res.json({ message: 'Flight added successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Error adding flight' });
    }
  }
);

router.put('/manage-available/:flightID', async (req, res) => {
  try {
    const { flightID } = req.params;

    let flight = await Flight.findOne({ flightID });
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    flight.available = !flight.available;
    await flight.save();
    res.json({ message: 'Flight availability updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/lists', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/availables', async (req, res) => {
  try {
    const { departure, arrival } = req.query;

    const query = { available: true };
    if (departure) {
      query.departureAirport = departure;
    }
    if (arrival) {
      query.arrivalAirport = arrival;
    }
    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
