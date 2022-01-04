import { getDefaultProvider, InfuraProvider } from '@ethersproject/providers'
import { suite } from 'uvu'
import { deepStrictEqual, strictEqual } from 'assert'
import { getENS } from '../src/index'
import fetch from 'node-fetch'

// @ts-ignore
globalThis.fetch = fetch

const t = suite('getENS(provider, domain)')

const provider = new InfuraProvider('homestead', '0c8c992691dc4bfe97b4365a27fb2ce4')

t('resolves the address and text records', async () => {
  deepStrictEqual(await getENS(provider)('v1rtl.eth'), {
    address: '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f',
    owner: '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f',
    records: {
      avatar: 'ipfs://bafkreia4t7isswz3fpqzwc7rokd5m7rd3dom7aavcbthxk5fggixncngru',
      description:
        '17 y/o nullstack developer. deno and web3 fan. (not actually) working at rainbow.me and brandname.tech',
      email: 'v1rtl@protonmail.com',
      url: 'https://v1rtl.site',

      github: 'talentlessguy',
      reddit: 'v1rtl'
    },
    domain: 'v1rtl.eth',
    coinTypes: {
      '0': '0xa9140575e888bbb4dc7fa0c344a20b07e99516ee9c0d87',
      '128': '0x124306de2e02868589c0709894b6c71daea74ed66b6007b17cbc08735a615703693b6b5d64bdc33e7f3920873b93d256116f5c4f8d47cf5adfd718a7a43f43c9495cdf6b7d',
      '2': '0xa914922122dc91b59071af4725d9d8dbcff796657f6d87',
      '3': '0x76a914b484c576c107ca6a614ce0dd024d1021f7ee4abe88ac',
      '60': '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f'
    },
  })
})

t('resolves without address', async () => {
  deepStrictEqual(await getENS(provider)('lilnasx.eth'), {
    address: null,
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963',
    domain: 'lilnasx.eth',
    records: {},
    coinTypes: {}
  })
})

t('supports custom fetch options', async () => {
  const res = await getENS(provider)('lilnasx.eth', { mode: 'no-cors' })

  deepStrictEqual(res, {
    address: null,
    owner: '0xe5501bc2b0df6d0d7daafc18d2ef127d9e612963',
    domain: 'lilnasx.eth',
    records: {},
    coinTypes: {}
  })
})

t('does a reverse lookup if ethereum address is passed', async () => {
  const res = await getENS(provider)('0xD3B282e9880cDcB1142830731cD83f7ac0e1043f')

  deepStrictEqual(res, {
    address: '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f',
    owner: '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f',
    records: {
      avatar: 'ipfs://bafkreia4t7isswz3fpqzwc7rokd5m7rd3dom7aavcbthxk5fggixncngru',
      description:
        '17 y/o nullstack developer. deno and web3 fan. (not actually) working at rainbow.me and brandname.tech',
      email: 'v1rtl@protonmail.com',
      url: 'https://v1rtl.site',

      github: 'talentlessguy',
      reddit: 'v1rtl'
    },
    domain: 'v1rtl.eth',
    coinTypes: {
      '0': '0xa9140575e888bbb4dc7fa0c344a20b07e99516ee9c0d87',
      '128': '0x124306de2e02868589c0709894b6c71daea74ed66b6007b17cbc08735a615703693b6b5d64bdc33e7f3920873b93d256116f5c4f8d47cf5adfd718a7a43f43c9495cdf6b7d',
      '2': '0xa914922122dc91b59071af4725d9d8dbcff796657f6d87',
      '3': '0x76a914b484c576c107ca6a614ce0dd024d1021f7ee4abe88ac',
      '60': '0xd3b282e9880cdcb1142830731cd83f7ac0e1043f'
    },
  })
})

t('returns "null" for a domain if ENS is not present', async () => {
  const res = await getENS(provider)('0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC')

  deepStrictEqual(res, {
    address: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    owner: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    domain: null,
    records: {},
    coinTypes: {},
  })
})

t('throws an error on invalid input', async () => {
  try {
    await getENS(provider)('invalid')
  } catch (e) {
    strictEqual(e.message, 'Invalid ENS domain or ethereum address')
  }
})

t.run()
