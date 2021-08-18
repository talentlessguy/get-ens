import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    ts({ include: ['./src/**/*.ts'] }),
    terser({
      mangle: false
    })
  ],
  external: ['@ethersproject/contracts', 'keccak', '@ethersproject/providers', 'graphql-request']
}
