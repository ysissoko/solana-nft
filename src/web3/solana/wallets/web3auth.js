const {Keypair} = require('@solana/web3.js')
const { getProvider } = require("src/web3/solana/auth/web3auth");
const { SolanaWallet } = require("@web3auth/solana-provider");
const bs58 = require('bs58')

const logger = require('src/logger')

let wallets = {};

async function initWallet(user) {
    logger.info("🔌 connecting to the web3 🔌")
    const { id } = user;
    const provider = await getProvider(user)
    
    const solanaWallet = new SolanaWallet(provider)
    const connectionConfig = await solanaWallet.request({
        method: "solana_provider_config",
        params: [],
    });

    const privateKey = await provider.request({
        method: "solanaPrivateKey"
    });
    logger.info(`👛 wallet available for user ${id} on rpc address ${connectionConfig.rpcTarget}`)
    logger.debug(`privateKey: ${privateKey} length: ${privateKey.length}`)
    wallets[id] = Keypair.fromSecretKey(bs58.decode(privateKey));

    return wallets[id];
}

async function getWallet(user) {
    const { id } = user;
    const wallet = wallets[id] ?? await initWallet(user);
    return wallet;
}

module.exports = { getWallet }
