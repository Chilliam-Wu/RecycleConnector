// npm i mongoose config
const mongoose = require('mongoose');
const config = require('config');
const dbCloud = config.get('mongoDBCloud');

const connectDB = async () => {
  try {
    await mongoose.connect(dbCloud);
    console.log('Successfully connected to MongoDB...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
