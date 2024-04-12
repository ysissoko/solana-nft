const { Metaplex, keypairIdentity , bundlrStorage } = require('@metaplex-foundation/js');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const { getWallet } = require('./solana/wallets/web3auth');
const { web3 } = require('src/services/config.service');
const { address, providerUrl, timeout } = web3.storage;
const logger = require("src/logger")

const connections = {};
async function initMetaplex(user) {
    const { id } = user;
    const wallet = await getWallet(user)

    logger.debug(JSON.stringify(keypairIdentity(wallet)))
    const bundlrOpts = { address, providerUrl, timeout };
    logger.debug(`bundlr options: ${JSON.stringify(bundlrOpts)}`)
    const metaplex = Metaplex.make(new Connection(clusterApiUrl(web3.clusterUri)))
    .use(keypairIdentity(wallet))
    .use(bundlrStorage(bundlrOpts))

    connections[id] = metaplex;
    return metaplex;
}

async function getMetaplex(user) {
    const { id } = user;
    return connections[id] ?? await initMetaplex(user)
 }

module.exports = { getMetaplex };
