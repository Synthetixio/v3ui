#!/usr/bin/env bash

set -u

# cannon build omnibus-optimism-goerli.toml

rm -rf ./deployments/cannon
yarn cannon inspect synthetix-local:0.0.1 --chain-id 13370 --write-deployments ./deployments/cannon

rm -rf ./deployments/cannon/spotMarket/synthetix
mv ./deployments/cannon/synthetix/* ./deployments/cannon
rm -rf ./deployments/cannon/synthetix
yarn prettier --write ./deployments/cannon

yarn cannon inspect synthetix-local:0.0.1 --chain-id 13370 --json | jq '. | del(.state)' > ./metadata/cannon/metadata.json
yarn prettier --write ./metadata/cannon/metadata.json

yarn codegen
