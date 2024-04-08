// Config service
const { web3 } = require("src/services/config.service");
const { Web3Auth } = require("@web3auth/node-sdk");
const { SolanaPrivateKeyProvider } = require("@web3auth/solana-provider");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const {
  clientId,
  web3AuthNetwork,
  provider,
  verifier,
  keyId: keyid,
  jwt: jwtConf,
} = web3.auth;
const logger = require("src/logger");
// IMP END - Verifier Creation

// SDK initialization
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork, // Get your Network ID from Web3Auth Dashboard
});

const solanaProvider = new SolanaPrivateKeyProvider({
  config: {
    chainConfig: provider.solana,
  },
});

/**
 * Generates a signed JWT token for the given user.
 *
 * @param {Object} user - The user object containing the necessary information.
 * @param {string} user.id - The unique identifier of the user.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email address of the user.
 * @returns {string} - The signed JWT token.
 */
function getSignedIdToken(user) {
  const { aud, iss, privateKeyPath } = jwtConf;

  // The private key to sign the jwt token. An asymetric check is made by web3auth to validate the token
  const privateKey = readFileSync(privateKeyPath);
  const { id: sub, name, email } = user;
  return jwt.sign(
    {
      sub, // must be unique to each user (the sub correspond to the id of the user)
      name,
      email,
      aud, // -> to be used in Custom Authentication as JWT Field
      iss, // -> to be used in Custom Authentication as JWT Field
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privateKey,
    { algorithm: "RS256", keyid } // <-- This has to be present in the JWKS endpoint (kid field of the jwks)
  );
}

/**
 * Retrieves a provider for the given user.
 *
 * @param {Object} user - The user object containing the necessary information.
 * @param {string} user.verifierId - The identifier of the verifier.
 * @returns {Promise<Object>} - A promise that resolves to the provider object.
 */
async function getProvider(user) {
  const { id: verifierId } = user;
  const loginParams = { verifier, verifierId, idToken: getSignedIdToken(user) };
  logger.debug(`Login params: ${JSON.stringify(loginParams)}`);
  const provider = await web3auth.connect(loginParams);

  return provider;
}

web3auth.init({ provider: solanaProvider });

// export the sdk instance for later use
module.exports = { getProvider };
