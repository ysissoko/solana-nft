const express = require('express');
const router = express.Router();
const tokenVerifier = require('src/middlewares/token-verifier');
const nftCtrl = require('src/controllers/nft.controller');
const asyncHandler = require("express-async-handler");

// Mint a new nft
router.post('/mint', tokenVerifier(), asyncHandler(nftCtrl.mint));
router.get("/:mintAddress", tokenVerifier(), asyncHandler(nftCtrl.get));
router.post("/:mintAddress/transfer", tokenVerifier(), asyncHandler(nftCtrl.transfer));
router.get("/", tokenVerifier(), asyncHandler(nftCtrl.getAll));

module.exports = router;
