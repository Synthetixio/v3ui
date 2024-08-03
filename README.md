# Synthetix V3 UI Monorepo

[![main](https://github.com/synthetixio/v3ui/actions/workflows/main.yml/badge.svg)](https://github.com/synthetixio/v3ui/actions/workflows/main.yml)

## Upgrade contacts

```sh
yarn upgrade-contracts
```

## Upgrade browserlist

```sh
yarn upgrade-contracts
```

## Install

This repo uses Yarn workspaces to manage multiple packages in the same repo. To prepare the repository for use, run:

```sh
yarn install
```

This will install all dependencies, wire dependencies between packages in this repo, and allow for you to build projects.

## Build

If you make a change and want to generate the library JS code, run:

```
yarn build
```

This will ensure all projects are fully built in topological order. You are also free to run script commands from individual repositories if necessary or desired.

## Adding external library to the monorepo preserving git history

This is 3-step process:

1. Prepare original repo
2. Add remote to monorepo
3. Merge original repo branch and update build to match monorepo processes

Using `codegen-graph-ts` as an example

### 1. Prepare original repo

- Create a separate branch `move-to-monorepo`
- Create the intended destination folder inside monorepo `mkdir -p tools/codegen-graph-ts`
- Move all the package files into `tools/codegen-graph-ts`
- Remove all the files that won't be used (CI config, lockfile, etc)

### 2. Add remote to monorepo

```sh
cd ~/synthetix/v3ui
git remote add codegen-graph-ts ~/synthetix/codegen-graph-ts
git fetch --all

#
git merge codegen-graph-ts/move-to-monorepo --allow-unrelated-histories
```

### 3. Merge original repo branch

Using `--allow-unrelated-histories` allows merging independent git history

```sh
git merge codegen-graph-ts/move-to-monorepo --allow-unrelated-histories
```

Because we moved all the files into the separate folder we have no merge conflicts and at the same time we have full history added to the git tree

Now we can remove remote as it is no longer necessary and cleanup all the added tags too

```sh
git remote remove codegen-graph-ts

# Cleanup all local tags and re-fetch existing tags without just removed `codegen-graph-ts` remote
git tag -l | xargs git tag -d
git fetch --tags
```

### Rebasing unmerged branch

To preserve all the merge commits when rebasing on top of updated master use `--rebase-merges`

```sh
git rebase master --rebase-merge
```

Interactive rebase works too

```sh
git rebase master --rebase-merge --interactive
```
