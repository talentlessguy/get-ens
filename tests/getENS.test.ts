import { getDefaultProvider } from '@ethersproject/providers'
import { suite } from 'uvu'
import { deepStrictEqual } from 'assert'
import { getENS } from '../src/index'
import fetch from 'node-fetch'

// @ts-ignore
globalThis.fetch = fetch

const t = suite('getENS(provider, domain)')

t('resolves the address and text records', async () => {
  deepStrictEqual(await getENS(getDefaultProvider())('foda.eth'), {
    address: '0xf75ed978170dfa5ee3d71d95979a34c91cd7042e',
    records: {
      web: { twitter: 'twitter.com/fodasynthesis' },
      email: 'foda@just.is',
      url: 'instagram.com/foda.farm'
    }
  })
})

t.run()
