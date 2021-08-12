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
      web: { twitter: 'twitter.com/fodasynthesis' },
      email: 'foda@just.is',
      url: 'instagram.com/foda.farm'
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
