const jwt = require("jsonwebtoken");
// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
// Check for token
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
// Extract token
  const token = authHeader.split(" ")[1];
// Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
