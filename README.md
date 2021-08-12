# get-ens

Get text records of an ENS address with ease.

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
  records: {
    web: { twitter: 'twitter.com/fodasynthesis' },
    email: 'foda@just.is',
    url: 'instagram.com/foda.farm'
  }
}
*/
```
