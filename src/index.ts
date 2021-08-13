import { namehash } from './namehash'
import { ABI } from './abi'
import { Contract } from '@ethersproject/contracts'
import { Provider, getDefaultProvider } from '@ethersproject/providers'

export type ENSRecords = Record<string, string | {}> & { web: Record<string, string> }

export interface ResolvedENS {
  owner: string | null
  address: string | null
  records?: ENSRecords
}

/**
 *
 * @param provider Ethereum provider
 * @param contractAddress ENS resolver contract address
 * @returns
 */
export const getENS = (
  provider: Provider = getDefaultProvider(),
  contractAddress: string = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
) => {
  const contract = new Contract(contractAddress, ABI, provider)

  const getRecord = async (node: string, record: string) => await contract.text(node, record)

  return async function getENS(domain: string): Promise<ResolvedENS> {
    const node = namehash(domain)

    const res = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      body: `{"query":"{domains(where:{name:\\"${domain}\\"}) { resolvedAddress{ id } resolver{ texts } owner{ id } }}"}`,
      method: 'POST'
    })
    const {
      data: { domains }
    } = await res.json()

    const records: ENSRecords = { web: {} }

    const { resolvedAddress: address, resolver, owner } = domains[0]

    let data: { owner: string | null; address: string | null; records?: typeof records } = {
      owner: null,
      address: null
    }

    if (owner) data.owner = owner.id

    if (address) data.address = address.id

    if (!resolver?.texts) {
      return data
    } else {
      for (const record of resolver.texts) {
        if (record.startsWith('com.') || record.startsWith('vnd.')) {
          records.web[record.slice(record.indexOf('.') + 1)] = await getRecord(node, record)
        } else {
          records[record] = await getRecord(node, record)
        }
      }

      data.records = records

      return data
    }
  }
}
