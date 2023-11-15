#!/usr/bin/env bash

set -u

#yarn cannon build cannonfile.toml --chain-id 13370 --wipe
yarn cannon build cannonfile.toml

rm -rf ./tmp/cannon
yarn cannon inspect synthetix-local:1 --write-deployments ./tmp/cannon
#
#
#rm -rf ./deployments/13370
#mkdir -p ./deployments/13370
#mv ./deployments/cannon/synthetix/* ./deployments/cannon
#rm -rf ./deployments/cannon/synthetix
#yarn prettier --write ./deployments/cannon
#
#yarn cannon inspect synthetix-local:0.0.1 --chain-id 13370 --json | jq '. | del(.state)' > ./metadata/cannon/metadata.json
#yarn prettier --write ./metadata/cannon/metadata.json
#
#yarn codegen
