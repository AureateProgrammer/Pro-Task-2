const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    return next(new Error('Authorization token missing')); 
  }

  try {
    const secret = process.env.JWT_SECRET || 'protasker_secret';
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found for authorization token');
    }

    next();
  } catch (error) {
    res.status(401);
    next(new Error('Invalid or expired authorization token'));
  }
};
