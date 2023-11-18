const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const logger = require('src/logger')
const { web3 } = require('src/services/config.service');
const fs = require('fs');

function loadKeyPair(path) {
    const keypair_file = fs.readFileSync(path);
    
    const secret_key = Buffer.from(JSON.parse(keypair_file.toString()));
    const my_key_pair = Keypair.fromSecretKey(secret_key);
    
    return my_key_pair;
}

let wallet;

try {
    wallet = loadKeyPair(web3.walletKeyPair);
} catch(e) {
    logger.warn(`impossible to load your key pair from file. ${e}`);
    wallet = Keypair.generate();
}

module.exports =  { connection: new Connection(clusterApiUrl(web3.clusterUri)), wallet };
