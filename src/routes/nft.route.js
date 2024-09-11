const { createNft, getNft, getAllNfts } = require('src/services/nft.service');
const verifyToken = require('src/middlewares/token-verifier');
const express = require('express');
const router = express.Router();
const logger = require('src/logger')

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Mint a new nft
router.post('/mint', function(req, res) {
  createNft(req.user, req.body).then(nft => {
    res.send({ nft });
  }).catch((e) => {
    logger.error(`mint NFT failed ${e}`)
    res.status(500).send(e);
  });
});

router.get("/:mintAddress", async (req, res) => {
  const { mintAddress } = req.params;

  if (!mintAddress) {
    res.status(400).json({
      err: "Mint Address Not Provided",
    });
  }

  getNft(req.user, mintAddress).then(nft => {
      res.send({ nft });
    }).catch((e) => {
      logger.error(`mint NFT failed ${e}`)
      res.status(500).send(e);
    });
  });

router.get("/", async (req, res) => {
  getAllNfts(req.user).then(nfts => {
    res.send(nfts)
  }).catch(e => {
    logger.error(`get all owned NFTs failed ${e}`);
    res.status(500).send(e);
  });
})

module.exports = router;
