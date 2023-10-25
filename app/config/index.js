const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  envPort: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  firebaseApiKey: process.env.FIREBASE_API_KEY,
};
