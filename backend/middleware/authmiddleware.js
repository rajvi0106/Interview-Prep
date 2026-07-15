import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const protect = async (req, res, next) => {
  try {
    // Check if token exists in header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select('-password');

    next();

  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;