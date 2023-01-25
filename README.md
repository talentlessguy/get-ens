<div align="center">
<img src="https://www.pngkit.com/png/full/152-1526200_ens-logo-ethereum-name-service.png" height="150px" /><br />

# get-ens

[![Version][v-badge-url]][npm-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][gh-actions-img]][github-actions] [![Codecov][cov-badge-url]][cov-url] [![][docs-badge]][docs]

<sub>Get text records of an [ENS](app.ens.domains) address with ease.</sub>

</div>

This library simplifies the process of retreiving ENS data with the help of [TheGraph ENS explorer](https://thegraph.com/explorer/subgraph/ensdomains/ens) and ENS [TextResolver](https://github.com/ensdomains/ens-contracts/blob/master/contracts/resolvers/profiles/TextResolver.sol) contract.

## Features

- Fully Typed
- Custom ENS contract address and TheGraph endpoint support
- Reverse ENS lookup if address is passed

## Install

```sh
pnpm i get-ens
```

## Usage

### Node.js

```ts
import { getDefaultProvider } from '@ethersproject/providers'
import { getENS } from 'get-ens'
import fetch from 'node-fetch'

const provider = getDefaultProvider()

// @ts-ignore
globalThis.fetch = fetch

const { address, records, owner } = await getENS(provider)('foda.eth')

/*
{
  address: '0xf75ed978170dfa5ee3d71d95979a34c91cd7042e',
  owner: '0xf75ed978170dfa5ee3d71d95979a34c91cd7042e',
  records: {
    avatar: 'https://slate.textile.io/ipfs/bafkreiddogjj5m6nhru72cqvj7napv3knwyqcvxlfxu4axkwhhlg55t5cu',
    color: '#f0da91',
    description: 'ⓕ™',
    email: 'foda@just.is',
    url: 'https://asf.is',
    web: {
      github: 'https://github.com/a-s-f',
      instagram: 'https://instagram.com/foda.farm',
      twitter: 'twitter.com/fodasynthesis'
    }
  }
}
*/
```

### Deno

```ts
import { getENS } from 'https://esm.sh/get-ens'
import { getDefaultProvider } from 'https://esm.sh/@ethersproject/providers'

const provider = getDefaultProvider()

const { address, records, owner } = await getENS(provider)('foda.eth')
```

[v-badge-url]: https://img.shields.io/npm/v/get-ens.svg?style=for-the-badge&color=4D48F7&label=&logo=npm
[npm-url]: https://www.npmjs.com/package/get-ens
[cov-badge-url]: https://img.shields.io/coveralls/github/talentlessguy/get-ens?style=for-the-badge&color=4D48F7
[cov-url]: https://coveralls.io/github/talentlessguy/get-ens
[dl-badge-url]: https://img.shields.io/npm/dt/get-ens?style=for-the-badge&color=4D48F7
[github-actions]: https://github.com/talentlessguy/get-ens/actions
[gh-actions-img]: https://img.shields.io/github/actions/workflow/status/talentlessguy/get-ens/main.yml?branch=master&style=for-the-badge&color=4D48F7
[docs-badge]: https://img.shields.io/badge/Docs-4D48F7?style=for-the-badge&logo=deno
[docs]: https://doc.deno.land/https/esm.sh/get-ens
