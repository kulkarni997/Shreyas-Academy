const express = require("express");
const { getAllMentors } = require("../controllers/mentorController");

const router = express.Router();

router.get("/", getAllMentors);

module.exports = router;
