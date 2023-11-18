const metaplex = require("src/web3/metaplex");
const { join } = require("path");
const { toMetaplexFile } = require('@metaplex-foundation/js');
const { uploads, web3 } = require('./config.service');
const { wallet } = require('src/web3/solana/connection')
const {
  PublicKey,
} = require("@solana/web3.js");
const fs = require('fs');

async function createNft(nft_info) {
    const { name, filename, metadata } = nft_info;

    // Create and upload the metadata
    const created_nft_metadata = await createMetadata(join(uploads.dir, filename), filename, metadata);
    const { uri } = created_nft_metadata;
    const { seller_fee_basis_points } = web3;

    // Create the NFT
    const nft = await metaplex.nfts().create({
      uri,
      name,
      seller_fee_basis_points, // 5%
      creators: [{ address: wallet.publicKey, verified: true, share: 100 }],
    },
    { commitment: "finalized" });
  
    return nft;
}

async function getNft(mintAddress) {
  const nft = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) });
  return nft
}

async function getAllNfts() {
  const nfts = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });
  return nfts;
}

async function createMetadata(path, filename, metadata) {
    const { name, attributes, description } = metadata;

    // Upload the nft metadata
    const metadata_uri = await metaplex.nfts().uploadMetadata({
      name,
      description,
      image: toMetaplexFile(fs.readFileSync(path), filename),
      attributes
    });

    return metadata_uri;
}

module.exports =  { createNft, getNft, getAllNfts };
