const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected To MongoDDb Database ${mongoose.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`Mongodb Databse Error ${error}`.bgWhite);
  }
};

module.exports = connectDB;
