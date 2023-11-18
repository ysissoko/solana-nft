const { Metaplex, keypairIdentity , bundlrStorage } = require('@metaplex-foundation/js');
const { connection, wallet } = require('./solana/connection');
const { web3 } = require('src/services/config.service');
const { address, providerUrl, timeout } = web3.storage;

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage({ address, providerUrl, timeout }))

module.exports = metaplex;
