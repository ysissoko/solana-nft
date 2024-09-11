const { join } = require('path');

module.exports = {
    app: {
        env: String(process.env.NODE_ENV ?? 'development'),
        port: Number(process.env.PORT ?? 3000)
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
        },
        auth: {
            clientId: String(process.env.WEB3AUTH_CLIENT_ID),
            web3AuthNetwork: String(process.env.WEB3AUTH_NET_ID),
            verifier: String(process.env.WEB3AUTH_VERIFIER),
            jwt: {
                privateKeyPath: String(process.env.JWT_PRIVATE_KEY_PATH),
                aud: String(process.env.JWT_AUDIENCE),
                iss: String(process.env.JWT_ISSUER),
                jwksEndpoint: String(process.env.WEB3AUTH_JWKS_ENDPOINT),
            },
            keyId: String(process.env.JWT_KEYID),
            provider: {
                solana: {
                    chainId: String(process.env.WEB3AUTH_PROVIDER_CHAIN_ID), // Please use 0x1 for Mainnet
                    rpcTarget: String(process.env.WEB3AUTH_PROVIDER_CHAIN_RPC_TARGET), // Please use some Production RPC Target for Solana Mainnet
                    displayName: String(process.env.WEB3AUTH_PROVIDER_CHAIN_DISPLAY_NAME), // e.g. "Solana Devnet", "Solana Testnet", "Solana Mainnet"
                    blockExplorer: "https://explorer.solana.com",
                    ticker: "SOL",
                    tickerName: "Solana",
                },
            }
        }
    }, 
    uploads: {
        dir: String(process.env.UPLOADS_DIR ?? './uploads'),
    },
    firebase: {
        serviceAccountKey: String(process.env.SERVICE_ACCOUNT_KEY || "ellitestamp-firebase-adminsdk-8d9iz-e604e81ef1.json"),
    },
    rateLimiter: {
        max: Number(process.env.RATE_LIMIT_MAX_PER_WINDOW ?? 100),
        windowMinutes: Number(process.env.RATE_LIMIT_WINDOW_MINUTES ?? 15),
        message: String(process.env.RATE_LIMIT_MSG ?? `You have exceeded your ${process.env.RATE_LIMIT_MAX_PER_WINDOW } requests per ${process.env.RATE_LIMIT_WINDOW_MINUTES} minute${process.env.RATE_LIMIT_WINDOW_MINUTES > 1 ? 's' : ''} limit.`)
    }
}
