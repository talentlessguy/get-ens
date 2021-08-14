import { getDefaultProvider } from '@ethersproject/providers'
import { suite } from 'uvu'
import { deepStrictEqual } from 'assert'
import { getENS } from '../src/index'
import fetch from 'node-fetch'

// @ts-ignore
globalThis.fetch = fetch

const t = suite('getENS(provider, domain)')

const provider = getDefaultProvider()

t('resolves the address and text records', async () => {
  deepStrictEqual(await getENS(provider)('foda.eth'), {
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
  })
})

t('resolves without address', async () => {
  deepStrictEqual(await getENS(provider)('lilnasx.eth'), {
    address: null,
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963'
  })
})

t.run()
