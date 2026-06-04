const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
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

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Pro-Tasker API running on http://localhost:${port}`);
});
