const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const appointmentsRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/appointments', appointmentsRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
