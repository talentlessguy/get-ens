import { InfuraProvider } from '@ethersproject/providers'
import { suite } from 'uvu'
import { deepStrictEqual, strictEqual } from 'assert'
import { getENS } from '../src/index'
import fetch from 'node-fetch'

// @ts-ignore
globalThis.fetch = fetch

const t = suite('getENS(provider, domain)')

const provider = new InfuraProvider('homestead', '0c8c992691dc4bfe97b4365a27fb2ce4')

t('resolves the address and text records', async () => {
  const ens = await getENS(provider)('v1rtl.eth')

  strictEqual(ens.address, '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f')
  strictEqual(ens.records.github, 'talentlessguy')
  strictEqual(ens.domain, 'v1rtl.eth')
})

t('resolves without address', async () => {
  deepStrictEqual(await getENS(provider)('lilnasx.eth'), {
    address: null,
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963',
    domain: 'lilnasx.eth',
    records: {},
    coins: {}
  })
})

t('supports custom fetch options', async () => {
  const res = await getENS(provider)('lilnasx.eth', { mode: 'no-cors' })

  deepStrictEqual(res, {
    address: null,
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963',
    domain: 'lilnasx.eth',
    records: {},
    coins: {}
  })
})

t('does a reverse lookup if ethereum address is passed', async () => {
  const ens = await getENS(provider)('0xD3B282e9880cDcB1142830731cD83f7ac0e1043f')

  strictEqual(ens.address, '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f')
  strictEqual(ens.records.github, 'talentlessguy')
  strictEqual(ens.domain, 'v1rtl.eth')
})

t('returns "null" for a domain if ENS is not present', async () => {
  const res = await getENS(provider)('0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC')

  deepStrictEqual(res, {
    address: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    owner: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    domain: null,
    records: {},
    coins: {}
  })
})

t('throws an error on invalid input', async () => {
  try {
    await getENS(provider)('invalid')
  } catch (e) {
    strictEqual((e as Error).message, 'Invalid ENS domain or ethereum address: invalid')
  }
})

t.run()
