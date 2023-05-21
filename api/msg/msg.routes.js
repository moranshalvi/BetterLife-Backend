const express = require('express')
const { getMsgs, getMsg, updateMsg } = require('./msg.controller')
const router = express.Router()

router.post('/', getMsgs)
router.put('/:id', updateMsg)

module.exports = router