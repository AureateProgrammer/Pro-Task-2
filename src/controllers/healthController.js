exports.getHealth = (req, res) => {
  const dbState = req.app.get('dbState') || 'unknown';

  res.json({
    success: true,
    message: 'Pro-Tasker API is healthy',
    environment: process.env.NODE_ENV || 'development',
    database: dbState,
  });
};
