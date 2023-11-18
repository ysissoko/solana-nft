const { join } = require('path');

module.exports = {
    app: {
        env: String(process.env.NODE_ENV ?? 'development'),
        port: Number(process.env.PORT ?? 3000), 
    },
    logger: {
        name: String(process.env.LOG_SERVICE_NAME ?? 'solana-nft'),
        level: String(process.env.LOG_LEVEL ?? 'info') 
    },
    web3: {
        clusterUri: String(process.env.CLUSTER_API_URL ?? 'devnet'),
        seller_fee_basis_points: Number(process.env.SELLER_FEE_BASIS_POINTS ?? 500),
        walletKeyPair: process.env.WALLET_KEYPAIR ?? join(process.env.HOME, '.config', 'solana', 'id.json'),
        storage: {
            address: String(process.env.STORAGE_URL) ?? "https://devnet.bundlr.network",
            providerUrl: String(process.env.STORAGE_PROVIDER_URL) ?? 'https://api.devnet.solana.com',
            timeout: Number(process.env.STORAGE_CONN_TIMEOUT) ?? Number(60000),
        }
    }, 
    uploads: {
        dir: String(process.env.UPLOADS_DIR ?? './uploads'),
    },
}
