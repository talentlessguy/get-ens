<div align="center">

# get-ens

[![Version][v-badge-url]][npm-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][gh-actions-img]][github-actions] [![Codecov][cov-badge-url]][cov-url]

<sub>Get text records of an ENS address with ease.</sub>

</div>

## Install

```sh
pnpm i get-ens
```

## Usage

```ts
import { getDefaultProvider } from '@ethersproject/provider'
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
    web: { twitter: 'twitter.com/fodasynthesis' },
    email: 'foda@just.is',
    url: 'instagram.com/foda.farm'
  }
}
*/
```

[v-badge-url]: https://img.shields.io/npm/v/get-ens.svg?style=for-the-badge&color=4D48F7&label=&logo=npm
[npm-url]: https://www.npmjs.com/package/get-ens
[cov-badge-url]: https://img.shields.io/coveralls/github/talentlessguy/get-ens?style=for-the-badge&color=4D48F7
[cov-url]: https://coveralls.io/github/talentlessguy/get-ens
[dl-badge-url]: https://img.shields.io/npm/dt/get-ens?style=for-the-badge&color=4D48F7
[github-actions]: https://github.com/talentlessguy/get-ens/actions
[gh-actions-img]: https://img.shields.io/github/workflow/status/talentlessguy/get-ens/CI?style=for-the-badge&color=4D48F7&label=&logo=github
