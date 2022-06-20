const express = require('express')

const router = express.Router()
const dropboxRouter = require('./dropbox')

router.get('/', (req, res) => res.status(200))

router.use('/dropbox', dropboxRouter)

module.exports = router
