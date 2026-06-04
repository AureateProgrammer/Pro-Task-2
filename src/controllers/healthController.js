const mongoose = require('mongoose');

exports.getHealth = (req, res) => {
  const readyState = mongoose.connection.readyState;
  const database = readyState === 1 ? 'connected' : readyState === 2 ? 'connecting' : 'disconnected';

  res.json({
    success: true,
    message: 'Pro-Tasker API is healthy',
    environment: process.env.NODE_ENV || 'development',
    database,
  });
};
