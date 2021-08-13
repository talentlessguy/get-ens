import createHash from 'keccak'
import uts46 from 'tr46'

const sha3 = (x: string | Buffer) => createHash('keccak256').update(x).digest().toString('hex')

export function namehash(inputName: string) {
  // Reject empty names:
  let node = ''
  for (var i = 0; i < 32; i++) {
    node += '00'
  }

  const name = normalize(inputName)

  if (name) {
    const labels = name.split('.')

    for (let i = labels.length - 1; i >= 0; i--) {
      const labelSha = sha3(labels[i])
      node = sha3(Buffer.from(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
}

export function normalize(name: string) {
  return name ? uts46.toASCII(name, { useSTD3ASCIIRules: true, verifyDNSLength: true }) : name
}
