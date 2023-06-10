const { addChatMessage, getChatMessages } = require("../controllers/chatmessageController");
const router = require("express").Router();

router.post("/addchatmsg/", addChatMessage);
router.get("/getchatmsg/", getChatMessages);

module.exports = router;