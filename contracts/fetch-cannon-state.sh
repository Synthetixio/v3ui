#!/usr/bin/env bash

rm -rf ./cannon
mkdir -p ./cannon

# Ethereum
yarn cannon inspect synthetix-omnibus:latest@main --chain-id 1 --json > ./cannon/1-main.json
yarn cannon inspect synthetix-omnibus:latest@main --chain-id 5 --json > ./cannon/5-main.json
yarn cannon inspect synthetix-omnibus:latest@main --chain-id 11155111 --json > ./cannon/11155111-main.json

# Optimism
yarn cannon inspect synthetix-omnibus:latest@main --chain-id 10 --json > ./cannon/10-main.json
yarn cannon inspect synthetix-omnibus:latest@main --chain-id 420 --json > ./cannon/420-main.json

# Base
yarn cannon inspect synthetix-omnibus:latest@andromeda --chain-id 8453 --json > ./cannon/8453-andromeda.json
yarn cannon inspect synthetix-omnibus:latest@andromeda --chain-id 84531 --json > ./cannon/84531-andromeda.json
yarn cannon inspect synthetix-omnibus:latest@andromeda --chain-id 84532 --json > ./cannon/84532-andromeda.json
yarn cannon inspect synthetix-omnibus:latest@main --chain-id 84531 --json > ./cannon/84531-main.json

# Arbitrum
yarn cannon inspect synthetix-omnibus:latest@arbthetix --chain-id 421614 --json > ./cannon/421614-arbthetix.json

# Local
yarn cannon inspect synthetix-local:latest@main --chain-id 13370 --json > ./cannon/13370-main.json
