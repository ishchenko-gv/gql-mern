const mongoose = require("mongoose");

async function connectDB() {
  console.log(`Connecting MongoDB...`.cyan.underline);
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;
