import { namehash } from '@ethersproject/hash'
import { ABI } from './abi'
import { Contract } from '@ethersproject/contracts'
import { BaseProvider, getDefaultProvider } from '@ethersproject/providers'
import assert from 'assert'

export type ENSRecords = {
  [key: string]: string
} & Partial<{
  avatar: string
  github: string
  reddit: string
  instagram: string
  twitter: string
  email: string
  url: string
  description: string
}>

export interface ResolvedENS {
  /**
   * Owner address
   */
  owner: string | null
  /**
   * Resolved address
   */
  address: string | null
  /**
   * ENS text records
   */
  records: ENSRecords
  /**
   * Crypto addresses
   */
  coins: Record<string, string>
  /**
   * Reverse lookup domain
   */
  domain: string | null
}

const ENDPOINT = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'

const QUERY = `
query($domain: String!) {
  domains(where:{name: $domain}) { 
    resolvedAddress {
      id
    }
    resolver {
      texts
      coinTypes
    }
    owner {
      id
    }
  }
}
`

const request = async (
  endpoint: string,
  query: string,
  variables: Record<string, any>,
  fetchOptions: RequestInit = {}
) => {
  const res = await fetch(endpoint, {
    ...fetchOptions,
    body: JSON.stringify({ query, variables }),
    method: 'POST'
  })

  assert.strictEqual(200, res.status)

  const json = await res.json()

  return json.data.domains[0] as {
    resolvedAddress: null | { id: string }
    resolver: { texts: string[]; coinTypes: number[] } | null
    owner: null | { id: string }
  }
}

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

/**
 *
 * @param provider Ethereum provider
 * @param contractAddress ENS resolver contract address
 * @returns
 */
export const getENS = (
  provider: BaseProvider = getDefaultProvider(),
  contractAddress: string = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
  endpointUrl = ENDPOINT
) => {
  const contract = new Contract(contractAddress, ABI, provider)

  const getRecord = async (node: string, record: string) => await contract.functions.text(node, record)
  const getCoin = async (node: string, coinType: number) => await contract.functions.addr(node, coinType)

  return async function getENS(_domain: string, fetchOptions?: RequestInit): Promise<ResolvedENS> {
    if (!(ADDRESS_REGEX.test(_domain) || _domain?.endsWith('.eth')))
      throw new Error(`Invalid ENS domain or ethereum address: ${_domain}`)
    const domain = ADDRESS_REGEX.test(_domain) ? await provider.lookupAddress(_domain) : _domain

    if (domain == null) {
      return {
        owner: _domain,
        address: _domain,
        domain: null,
        records: {},
        coins: {}
      }
    }

    const node = namehash(domain)

    const ens = await request(
      endpointUrl,
      QUERY,
      {
        domain
      },
      fetchOptions
    )

    if (ens) {
      const { resolvedAddress: address, resolver, owner } = ens

      let data: ResolvedENS = {
        owner: null,
        address: null,
        domain,
        records: {},
        coins: {}
      }

      if (owner?.id) data.owner = owner.id

      if (address?.id) data.address = address.id

      if (resolver?.texts) {
        for (const record of resolver.texts) {
          const value = (await getRecord(node, record))[0]
          if (record.startsWith('com.') || record.startsWith('vnd.') || record.startsWith('org.')) {
            data.records[record.slice(record.indexOf('.') + 1)] = value
          } else {
            data.records[record] = value
          }
        }
      }
      if (resolver?.coinTypes) {
        for (const coinType of resolver.coinTypes) {
          data.coins[coinType] = (await getCoin(node, coinType))[0]
        }
      }
      return data
    } else {
      return {
        owner: null,
        address: null,
        records: {},
        domain: null,
        coins: {}
      }
    }
  }
}
