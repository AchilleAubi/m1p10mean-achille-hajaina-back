const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/index');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL);

// Middleware
app.use(express.json());

// on init
app.get('/', (req, res) => {
  res.send('Hello')
})


// Routes
app.use('/', routes);

// Error middleware
app.use(require('./middleware/errorMiddleware'));

const PORT = process.env.PORT || 1400;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});