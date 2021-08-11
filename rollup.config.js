import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    json(),
    ts({ include: ['./src/**/*.ts'] }),
    terser({
      mangle: false
    })
  ],
  external: ['@ethersproject/contracts', 'keccak', 'idna-uts46-hx']
}
