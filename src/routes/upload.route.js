const upload = require('src/multer/storage');
const express = require('express');
const router = express.Router();
const tokenVerifier = require("src/middlewares/token-verifier")

// Mint a new nft
router.post('', tokenVerifier(), upload.single('file'), function(req, res) {
    const { file } = req;
    res.send({ file });
});

module.exports = router;
