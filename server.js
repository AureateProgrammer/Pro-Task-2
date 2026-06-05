const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB();

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', (req, res) => {
  res.send('Pro-Tasker API is running');
});

app.use('/api', apiRoutes);

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Pro-Tasker API running on http://localhost:${port}`);
});

