## Prerequisites

### Run the project locally
You need to install nodejs & npm to run the project.
1. Install the dependencies
    `npm install`

2. Run the project
    `npm start`

# Solana NFT backend

## Serve the jwks file from a web server
### What is JWKS ?
[JWKS](https://web3auth.io/docs/auth-provider-setup/byo-jwt-providers#filled-custom-jwt-verifier) stands for JSON Web Key Set. It is a set of keys containing the public keys that should be used to verify any JSON Web Token (JWT) issued by the authorization server and signed using the RS256 signing algorithm.

The web3auth verifier need to access to the public key (.jwks) hosted on a public server domain.

### Generate keypair with openssl

1. Generate the private key (Keep it secret and in a secure place. DO NOT SHARE IT WITH ANYONE)

    `openssl genrsa -out privateKey.pem 2048`

2. Generate public key from private key

    `openssl rsa -in privateKey.pem -pubout -out publicKey.pem`

3. Convert the previously generated file to a jwks file
You can use this web [app](https://pem2jwk.vercel.app/) to convert your *.pem* file to a *.jwks* file

4. Host your jwks file to a publicly accessible folder located on a server
