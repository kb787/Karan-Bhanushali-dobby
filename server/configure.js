const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();
const database_uri = process.env.mongodb_uri;
const Connection = async () => {
  try {
    await mongoose.connect(database_uri);
    console.log(`Successfully connected to mongodb database`.bgGreen);
  } catch (error) {
    console.log(`Unable to connect to database due to error`.bgRed);
  }
};

module.exports = Connection;
