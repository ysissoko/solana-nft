# ⛓️ Solana NFT backend

## Introduction

This project uses the Solana blockchain to mint and retrieve minted nfts. It uses the [metaplex](https://www.metaplex.com/) sdk for that to access to facilitate the access to the solana blockchain to manage digital assets.
The project is able to manage the wallets automatically to keep it secure and abstract users account thanks to [web3auth](https://web3auth.io/).

## Prerequisites

### Run the project locally

You need to install nodejs & npm to run the project.

1. Install the dependencies
   `npm install`

2. Run the project
   `npm start`

## Project structure
```
.
└── src
    ├── multer
    ├── routes
    ├── services
    └── web3
        └── solana
            ├── auth
            └── wallets

```

📁 multer
: multer package storage definition to store uploaded file on the disk.

📁 routes
: contains the express framework routes to handle http client requests.

📁 services
: The services contains all the business logic using metaplex sdk to manage nft which depends on the web3auth sdk to get the manage the nft wallet of the user.

📁 web3
: All web3 stuffs ➡️ connection to metaplex to manage nfts, connection to web3auth for wallet creation & retrieval (KeyPair generation / usage).

## Environment Parameters

This section describes the environment parameters required to configure and run the project.

### Configuration

Before running the project, rename the .env.example file to .env and configure your project properly.

### Setting Environment Variables

You can set environment variables in various ways, depending on your development environment. Here are a few common methods:

#### 1. Using a .env File

Create a `.env` file in the root directory of the project and define the environment variables there. Make sure to add `.env` to your `.gitignore` file to avoid committing sensitive information.

#### 2. Using command line environment variables

You can set environment variables directly via the command line.

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
   You can use this web [app](https://pem2jwk.vercel.app/) to convert your _.pem_ file to a _.jwks_ file

4. Host your jwks file to a publicly accessible folder located on a server

## Troubleshoot

### Credit dev account for testing

if you encouter this issue

> failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit

You need to credit the Solana wallet by getting the public key of the wallet and going to the [solana faucet](https://faucet.solana.com/).
The public key of the wallet of the current user is printed in the debug logs.

`info: wallet public key: 6STYMxu44cdvDRQ5aF86UkkicdpZLFpdDHe7F2wNCUHT {"service":"solana-nft"}`
