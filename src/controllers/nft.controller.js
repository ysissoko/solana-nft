const nftCtrl = require('src/services/nft.service');
const HttpError = require('src/exceptions/http.error');

/**
 * Function to mint a new NFT.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves to the minted NFT.
 * @throws {Error} - If minting the NFT fails.
 */
async function mint(req, res) {
    const nft = await nftCtrl.createNft(req.user, req.body);
    res.send({ nft });
}

/**
 * Retrieves an NFT based on the provided mint address.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves with the retrieved NFT.
 * @throws {Error} - If the mint address is not provided or an error occurs while retrieving the NFT.
 */
async function get(req, res)  {
    const { mintAddress } = req.params;
  
    if (!mintAddress) {
      throw new HttpError(404, `NFT with mint address ${mintAddress} not found`);
    }
  
    const nft = await nftCtrl.getNft(req.user, mintAddress);
    res.send({ nft });
}

/**
 * Transfers an NFT from the user's mint address to the specified destination public key.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves with the transferred NFT data.
 * @throws {Error} If there is an error transferring the NFT.
 */
async function transfer(req, res) {
    const { mintAddress } = req.params;
    const { destinationPubKey } = req.body;

    const transferData = await nftCtrl.transferNft(req.user, mintAddress, destinationPubKey)
    res.send(transferData);
}

/**
 * Retrieves all NFTs for a given user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to an array of NFTs.
 * @throws {Error} If there is an error retrieving the NFTs.
 */
async function getAll(req, res) {
    const nfts = await nftCtrl.getAllNfts(req.user);
    res.send(nfts)
}

module.exports = { mint, get, getAll, transfer };
