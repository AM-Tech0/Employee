// /models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalInfo: {
    name: String,
    fatherName: String,
    dob: Date,
    pan: String,
    aadhar: String,
  },
  employeeInfo: {
    doj: Date,
    designation: String,
    employeeId: String,
    uan: String,
    gratuity: String,
    pfNominee: String,
    resignDate: Date,
  },
  bankInfo: {
    accountNo: String,
    ifsc: String,
    bankName: String,
    nomineeName: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
