const express = require('express');
const upload = require('src/multer/storage');
const tokenVerifier = require("src/middlewares/token-verifier")
const uploadCtrl = require('src/controllers/upload.controller');

const router = express.Router();

router.post('', tokenVerifier(), upload.single('file'), uploadCtrl.upload);

module.exports = router;
