
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  console.log('Authorization header:', req.header('Authorization'));

  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token
  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied, no token provided.' });
  }

  try {
    console.log('Token received:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log('Decoded token:', decoded);

    if (!decoded.role) {
      console.error('Role missing in token payload.');
      return res.status(403).json({ success: false, message: 'Role not defined in token.' });
    }

    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Token has expired:', err);
      return res.status(401).json({ success: false, error: 'Token has expired. Please log in again.' });
    }

    console.error('Token verification failed:', err);
    res.status(400).json({ success: false, error: 'Invalid token.' });
  }
};

