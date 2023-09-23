const express = require("express");
const router = express.Router({ messageParams: true});

const { createMessage, getMessage, deleteMessage } = require("../handlers/messages");

router.route("/").post(createMessage);

router.route("/:message_id").get(getMessage).delete(deleteMessage);



module.exports = router;