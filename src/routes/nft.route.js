const { createNft, getNft, getAllNfts } = require('src/services/nft.service');
const verifyToken = require('src/middlewares/token-verifier');
const express = require('express');
const router = express.Router();
const nftCtrl = require('src/controllers/nft.controller');
const asyncHandler = require("express-async-handler");

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Mint a new nft
router.post('/mint', asyncHandler(nftCtrl.mint));
router.get("/:mintAddress", asyncHandler(nftCtrl.get));
router.post("/:mintAddress/transfer", asyncHandler(nftCtrl.transfer));
router.get("/", asyncHandler(nftCtrl.getAll));

module.exports = router;
