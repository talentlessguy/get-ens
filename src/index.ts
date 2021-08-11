import { namehash } from './getNamehash'
import ABI from '@ensdomains/ens-contracts/build/contracts/TextResolver.json'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

export const getENS = (provider: Provider, contractAddress: string = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41') => {
  const contract = new Contract(contractAddress, ABI, provider)

  const getRecord = async (node: string, record: string) => await contract.text(node, record)

  return async function getENS(domain: string) {
    const node = namehash(domain)

    const res = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      body: `{"query":"{domains(where:{name:\\"${domain}\\"}) { resolvedAddress{ id } resolver{ texts }}}"}`,
      method: 'POST'
    })
    const {
      data: { domains }
    } = await res.json()

    const records: Record<string, string | {}> & { web: Record<string, string> } = { web: {} }

    const {
      resolvedAddress: { id: address },
      resolver: { texts }
    } = domains[0]

    for (const record of texts) {
      if (record.startsWith('com.')) {
        records.web[record.slice(record.indexOf('.') + 1)] = await getRecord(node, record)
      } else {
        records[record] = await getRecord(node, record)
      }
    }

    return { address, records }
  }
}
