const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rank: { type: String, required: true },
    state: String,
    college: String,
    achievements: { type: [String], default: [] },
    speciality: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
