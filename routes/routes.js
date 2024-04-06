const express = require('express')
const router = express.Router()
const {uploadFile, fileCount} = require('../controllers/fileUpload')
const sendMail = require('../controllers/sendMail')

router.post('/upload', fileCount, uploadFile)
router.post('/send', sendMail)

module.exports = router