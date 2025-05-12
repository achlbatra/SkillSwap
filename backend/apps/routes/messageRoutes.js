const express = require('express');
const { sendMessage, getConversation, getLatestMessages } = require('../controllers/messageController');

const router = express.Router();

router.post('/send', sendMessage);
router.get('/conversation/:user1Id/:user2Id', getConversation);
router.get('/latest/:userId', getLatestMessages);

module.exports = router;
