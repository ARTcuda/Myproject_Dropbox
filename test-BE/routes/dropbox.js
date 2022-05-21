const express = require('express')
const { listFiles, downloadFile, getMoreFiles} = require('../middlewares/dropbox')

var router = express.Router();

router.get('/list', listFiles);
router.get('/file', downloadFile);
router.get('/addItems', getMoreFiles);

module.exports = router;
