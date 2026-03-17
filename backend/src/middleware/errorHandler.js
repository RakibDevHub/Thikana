export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, errors });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate field value entered' });
  }
  
  res.status(500).json({ success: false, message: 'Something went wrong!' });
};

export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};