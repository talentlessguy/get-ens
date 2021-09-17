import { getDefaultProvider, InfuraProvider } from '@ethersproject/providers'
import { suite } from 'uvu'
import { deepStrictEqual } from 'assert'
import { getENS } from '../src/index'
import fetch from 'node-fetch'

// @ts-ignore
globalThis.fetch = fetch

const t = suite('getENS(provider, domain)')

const provider = new InfuraProvider('homestead', '0c8c992691dc4bfe97b4365a27fb2ce4')

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

t('supports custom fetch options', async () => {
  const res = await getENS(provider)('lilnasx.eth', { mode: 'no-cors' })

  deepStrictEqual(res, {
    address: null,
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963'
  })
})

t('returns an address if input was an address', async () => {
  const res = await getENS(provider)('0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963', { mode: 'no-cors' })

  deepStrictEqual(res, {
    address: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963',
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963'
  })
})

t.run()
