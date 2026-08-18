const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "12345";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token is required"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization header"
      });
    }

    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    console.log("Token verified successfully");

    next();

  } catch (error) {
    console.log("Could not verify token:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

const generateToken = (userData) => {
  const generatedToken = jwt.sign(
    userData,
    secretKey,
    { expiresIn: "7d" }
  );

  console.log("Token generated successfully");

  return generatedToken;
};

module.exports = {
  verifyToken,
  generateToken
};