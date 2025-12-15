const Mentor = require("../models/Mentor");

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mentors" });
  }
};

module.exports = { getAllMentors };
