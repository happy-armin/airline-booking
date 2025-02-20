const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();

const Book = require('../../models/Book');

router.post(
  '/add',
  check('flightID', 'flightID is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('seat', 'Please input valid number').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { flightID, email, seat } = req.body;

    const now = new Date();

    try {
      let book = await Book.findOne({ flightID, email, seat });

      if (book) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'book already exists' }] });
      }

      book = new Book({ flightID, email, seat, date: now });

      await book.save();

      res.json({ message: 'Book added successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Error adding book' });
    }
  }
);

router.get('/lists', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/weekly-lists', async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

    const books = await Book.find({
      date: {
        $gte: startOfWeek,
        $lt: endOfWeek
      }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/manage', async (req, res) => {
  try {
    const { flightID, email, seat } = req.body;

    let book = await Book.findOne({ flightID, email });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.seat = seat;
    await book.save();
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/cancel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
