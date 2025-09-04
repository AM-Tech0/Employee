// const mongoose = require('mongoose');
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {

//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Atlas Connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;
// for vecel
const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
    throw err;
  }
};

module.exports = connectDB;
