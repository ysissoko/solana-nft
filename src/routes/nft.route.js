const express = require('express');
const router = express.Router();
const nftCtrl = require('src/controllers/nft.controller');
const asyncHandler = require("express-async-handler");

// Mint a new nft
router.post('/mint', asyncHandler(nftCtrl.mint));
router.get("/:mintAddress", asyncHandler(nftCtrl.get));
router.post("/:mintAddress/transfer", asyncHandler(nftCtrl.transfer));
router.get("/", asyncHandler(nftCtrl.getAll));

module.exports = router;
