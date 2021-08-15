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
[gh-actions-img]: https://img.shields.io/github/workflow/status/talentlessguy/get-ens/CI?style=for-the-badge&color=4D48F7&label=&logo=github
