const { createNft, getNft, getAllNfts } = require('src/services/nft.service');
const express = require('express');
const router = express.Router();
const logger = require('src/logger')

// Mint a new nft
router.post('/mint', function(req, res) {
  createNft(req.body).then(nft => {
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

  getNft(mintAddress).then(nft => {
      res.send({ nft });
    }).catch((e) => {
      logger.error(`mint NFT failed ${e}`)
      res.status(500).send(e);
    });
  });

router.get("/", async (_req, res) => {
  getAllNfts().then(nfts => {
    res.send(nfts)
  }).catch(e => {
    logger.error(`get all owned NFTs failed ${e}`);
    res.status(500).send(e);
  });
})
module.exports = router;
