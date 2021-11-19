import { namehash } from './namehash'
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

  return json.data
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
  contractAddress: string = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
) => {
  const contract = new Contract(contractAddress, ABI, provider)

  const getRecord = async (node: string, record: string) => await contract.text(node, record)

  return async function getENS(_domain: string, fetchOptions?: RequestInit): Promise<ResolvedENS> {
    const domain = ADDRESS_REGEX.test(_domain) ? await provider.lookupAddress(_domain) : _domain

    if (domain == null && ADDRESS_REGEX.test(_domain)) {
      return {
        owner: _domain,
        address: _domain,
        domain: null,
        records: {}
      }
    }

    const node = namehash(domain)

    const { domains } = await request(
      ENDPOINT,
      QUERY,
      {
        domain
      },
      fetchOptions
    )

    const records: ENSRecords = {}

    if (domains?.[0]) {
      const { resolvedAddress: address, resolver, owner } = domains?.[0]

      let data = {
        owner: null,
        address: null,
        domain,
        records: {}
      }

      if (owner) data.owner = owner.id

      if (address) data.address = address.id

      if (!resolver?.texts) {
        return data
      } else {
        for (const record of resolver.texts) {
          if (record.startsWith('com.') || record.startsWith('vnd.')) {
            records[record.slice(record.indexOf('.') + 1)] = await getRecord(node, record)
          } else {
            records[record] = await getRecord(node, record)
          }
        }

        data.records = records

        return data
      }
    }
  }
}
