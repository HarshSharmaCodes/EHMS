const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Doctor = require("../models/doctor");
const checkAdmin = require("../middlewares/checkAdmin");
const Appointment = require("../models/appointment");
const Communication = require("../models/communication");

// Get all doctors
router.get("/get-doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get timings for a specific doctor
router.get("/get-timings/:id", async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ timings: doctor.timings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update doctor profile
router.put("/profile-update", async (req, res) => {
  const { userId, updatedProfile } = req.body;
  try {
    const updatedUser = await Doctor.findByIdAndUpdate(
      userId,
      { $set: updatedProfile },
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: "Success", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
});

// Update doctor details (including timings)
router.put("/update-doctor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, email, timings } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { name, specialization, email, timings },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Error updating doctor", error });
  }
});

// Delete doctor
router.delete("/delete-doctor/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await Doctor.findByIdAndDelete(userId);
    res.json({ msg: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-doctor", async (req, res) => {
  const { name, email, specialization, timings } = req.body;
  
  if (!name || !email || !specialization) {
    return res.status(400).json({ error: "Name, email, and specialization are required!" });
  }

  if (!Array.isArray(timings)) {
    return res.status(400).json({ error: "Doctor timings are required" });
  }

  try {
    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Doctor with this email already exists" });
    }

    const lastDoctor = await Doctor.findOne().sort({ doctorId: -1 });
    let doctorId;
    if (lastDoctor) {
      const lastDoctorId = parseInt(lastDoctor.doctorId, 10);
      doctorId = (lastDoctorId + 1).toString();
    } else {
      doctorId = "1";
    }

    const firstemail = email.split('@')[0];
    const password = firstemail + '@123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Doctor({
      name,
      email,
      doctorId,
      password: hashedPassword,
      specialization,
      timings
    });

    const savedUser = await newUser.save();
    res.status(200).json({ savedUser, message: "Doctor added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-appointments/:id", async (req, res) => {
  const doctorId = req.params.id;
  try {
    const appointments = await Appointment.find({ doctorId }).populate("doctorId");

    if (appointments.length === 0) {
      return res.json({ message: "No appointments found" });
    } else {
      res.json(appointments);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add message to communication
router.post("/add-message", async (req, res) => {
  const { email, message, from } = req.body;
  const newEntry = new Communication({ email, message, from });

  try {
    await newEntry.save();
    res.status(200).json("Successfully sent");
  } catch (error) {
    res.json("Could not send the message");
  }
});

// Get messages by email
router.get("/get-message/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const message = await Communication.find({ email });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Could not get the message" });
  }
});

module.exports = router;