const upload = require('src/multer/storage');
const express = require('express');
const router = express.Router();


// Mint a new nft
router.post('', upload.single('file'), function(req, res) {
    const { file } = req;
    res.send({ file });
});

module.exports = router;
