const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const my_secret_key = process.env.secret_key;

const validateAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({ message: "No token found", status: 404 });
    } else {
      jwt.verify(token, my_secret_key, (error, decoded) => {
        if (error) {
          return res.json({ message: `Invalid token due to error ${error}` });
        }
        req.userId = decoded.userId;
        next();
      });
    }
  } catch (error) {
    return res.json({
      message: `Could not process your request due to error ${error}`,
      status: 500,
    });
  }
};

module.exports = validateAuthentication;
