#!/bin/sh
source .env
docker build -t solana-nft-backend .
docker run -p $PORT:$PORT -v $(pwd)/keys:/usr/src/app/keys:ro -v $(pwd)/.env:/usr/src/app/.env:ro solana-nft-backend 
