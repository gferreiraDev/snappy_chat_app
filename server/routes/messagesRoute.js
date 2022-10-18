const { addMessage, getAllMessages } = require('../controllers/messagesController')

const router = require('express').Router()

router.post('/addMessage', addMessage)
router.post('/getMessages', getAllMessages)

module.exports = router