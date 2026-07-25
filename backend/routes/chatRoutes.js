const express = require("express");
const router = express.Router();

const {
  chat,
  getChats,
  getChat,
  deleteChat,
} = require("../controllers/chatController");

router.post("/" , chat);

// Get all chats
router.get("/", getChats);

// Get one chat
router.get("/:id", getChat);

// Delete chat
router.delete("/:id", deleteChat);

module.exports = router;