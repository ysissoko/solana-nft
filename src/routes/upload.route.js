const express = require('express');
const upload = require('src/multer/storage');
const uploadCtrl = require('src/controllers/upload.controller');

const router = express.Router();

router.post('', upload.single('file'), uploadCtrl.upload);

module.exports = router;
