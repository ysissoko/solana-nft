const {Keypair} = require('@solana/web3.js')
const { getProvider } = require("src/web3/solana/auth/web3auth");
const { SolanaWallet } = require("@web3auth/solana-provider");
const logger = require('src/logger')

async function initWallet(user) {
    logger.info("🔌 connecting to the web3 🔌")
    const { id } = user;
    const provider = await getProvider(user)
    
    const solanaWallet = new SolanaWallet(provider)
    const connectionConfig = await solanaWallet.request({
        method: "solana_provider_config",
        params: [],
    });

    const privateKeyHex = await provider.request({
        method: "solanaPrivateKey"
    });

    // The key is an hex string encoded in base58
    const privateKey = Buffer.from(privateKeyHex, "hex");

    logger.info(`👛 wallet available for user ${id} on rpc address ${connectionConfig.rpcTarget}`)
    wallet = Keypair.fromSecretKey(privateKey);
    logger.info(`wallet public key: ${wallet.publicKey}`);

    return wallet;
}

async function getWallet(user) {
    const wallet = await initWallet(user);
    return wallet;
}

module.exports = { getWallet }
