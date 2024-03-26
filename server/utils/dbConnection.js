const mongoose = require("mongoose");

require("dotenv").config;

const db_url = process.env.DB_URL;

const dbConnect = () => {
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("Connected to the database");
      // process.exit(1);
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
      process.exit(1);
    });
};

module.exports = dbConnect;
