require("dotenv").config();

exports.adapterConfig = {
  mongoUri: process.env.MONGO_URI,
};
