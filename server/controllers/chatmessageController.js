const ChatMessages = require("../models/chatmessageModel");

module.exports.getChatMessages = async (req, res, next) => {
    try {
        const messages = await ChatMessages.find().sort({ updatedAt: 1 });
        const projectedChatMessages = messages.map((msg) => {
            return {
                userid: msg.userid,
                message: msg.message,
                currenttime: msg.updatedAt,
                avatarImage: msg.avatarImage,
                username: msg.username
            };
        });
        res.json(projectedChatMessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports.addChatMessage = async (req, res, next) => {
    try {
        const { userid, message, avatarImage, username } = req.body;
        const data = await ChatMessages.create({
            message: message,
            userid: userid,
            avatarImage: avatarImage,
            username: username
        });
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};
