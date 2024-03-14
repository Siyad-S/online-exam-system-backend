const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://siyad:NIZUEfw9BiGjNLt1@cluster0.kc66zvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("db connected successfully");
    connect.connection.name, connect.connection.hostname;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
