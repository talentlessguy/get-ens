import createHash from 'keccak'

const sha3 = (x: string | Buffer) => createHash('keccak256').update(x).digest().toString('hex')

export function namehash(name: string) {
  // Reject empty names:
  let node = ''
  for (var i = 0; i < 32; i++) {
    node += '00'
  }

  if (name) {
    const labels = name.split('.')

    for (let i = labels.length - 1; i >= 0; i--) {
      const labelSha = sha3(labels[i])
      node = sha3(Buffer.from(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
}
