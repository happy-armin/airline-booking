const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(cors());
app.use(bodyParser.json());

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/flight', require('./routes/api/flight'));
app.use('/api/book', require('./routes/api/book'));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
