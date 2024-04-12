const { createNft, getNft, getAllNfts, transferNft } = require('src/services/nft.service');
const express = require('express');
const router = express.Router();
const logger = require('src/logger');
const tokenVerifier = require('src/middlewares/token-verifier');

// Mint a new nft
router.post('/mint', tokenVerifier(), function(req, res) {
  createNft(req.user, req.body).then(nft => {
    res.send({ nft });
  }).catch((e) => {
    logger.error(`mint NFT failed ${e}`)
    res.status(500).send(e);
  });
});

router.get("/:mintAddress", tokenVerifier(), async (req, res) => {
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

router.post("/:mintAddress/transfer", tokenVerifier(), async(req, res) => {
  const { mintAddress } = req.params;
  const { destinationPubKey } = req.body;
  transferNft(req.user, mintAddress, destinationPubKey).then(data => {
    res.send(data);
  }).catch((e) => {
    logger.error(`mint NFT failed ${e}`)
    res.status(500).send(e);
  });
})

router.get("/", tokenVerifier(), async (req, res) => {
  getAllNfts(req.user).then(nfts => {
    res.send(nfts)
  }).catch(e => {
    logger.error(`get all owned NFTs failed ${e}`);
    res.status(500).send(e);
  });
});

module.exports = router;
