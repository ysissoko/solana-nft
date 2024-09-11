const express = require('express');
const upload = require('src/multer/storage');
const uploadCtrl = require('src/controllers/upload.controller');

const router = express.Router();
const verifyToken = require('src/middlewares/token-verifier');

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Mint a new nft
router.post('', upload.single('file'), function(req, res) {
    const { file } = req;
    res.send({ file });
});

module.exports = router;
