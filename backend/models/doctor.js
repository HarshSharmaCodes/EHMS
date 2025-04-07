const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneno: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "patient"],
    default: "doctor",
  },
  timings: {
    type: [String],
    default: [],
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema, "doctors");
module.exports = Doctor;
