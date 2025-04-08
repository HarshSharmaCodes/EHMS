const express = require("express");
const router = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");

const Doctor = require("../models/doctor");
const User = require("../models/user");
const ContactUs = require("../models/contactUs");
const newsLetter = require("../models/newsLetter");

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({ role: "patient" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-contacts", async (req, res) => {
  try {
    const contacts = await ContactUs.find({});

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-count", async (req, res) => {
  try {
    const patientcou = await User.countDocuments({ role: "patient" }).exec();
    const queriescou = await ContactUs.countDocuments({}).exec();
    const doccou = await Doctor.countDocuments({}).exec();
    const newcou = await newsLetter.countDocuments({}).exec();

    res.json({
      patientcou,
      queriescou,
      newcou,
      doccou,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/new-letter", async (req, res) => {
  const { email } = req.body
  try {
    const newletter = new newsLetter({
      email,
    });
    const savedletter = await newletter.save();
    res.status(200).json({ status: "Saved", savedletter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.get("/get-sent-newsletter", async (req, res) => {
  try {
    const sentnews = await newsLetter.find();
    res.json(sentnews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
