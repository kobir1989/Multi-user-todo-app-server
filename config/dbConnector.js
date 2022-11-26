const mongoose = require("mongoose");

const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("Database connected successfully")
  } catch (error) {
    console.log("Database connection Failed", error);
  }
};

module.exports = dbConnector;
