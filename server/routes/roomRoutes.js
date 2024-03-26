const express = require('express');
const router = express.Router();

const { generateRandomRoomId,roomCreate } = require("../controllers/Room");
const extractUserId = require("../middelwares/user"); // Fix the path if needed

router.post("/generate-room",generateRandomRoomId);
router.post("/create-room",extractUserId, roomCreate);

module.exports = router;
