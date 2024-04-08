const logger = require("src/logger");
const fs = require("fs");

function loadKeyPair(path) {
  const keypair_file = fs.readFileSync(path);

  const secret_key = Buffer.from(JSON.parse(keypair_file.toString()));
  const my_key_pair = Keypair.fromSecretKey(secret_key);

  return my_key_pair;
}

/**
 * Create a new wallet
 * @returns a solana wallet
 */
function createWallet() {
  return Keypair.generate();
}

/**
 * Retrieve a solana walled from an existing keypair (id.json file)
 * @param {*} path the path to your id.json file
 * @returns the solana wallet
 */
function useExistingWallet(path) {
  try {
    return loadKeyPair(path);
  } catch (e) {
    logger.warn(`impossible to load your key pair from file. ${e}`);
    return null;
  }
}

module.exports = { useExistingWallet, createWallet };
