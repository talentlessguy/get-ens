import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import cjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    ts({ include: ['./src/**/*.ts'] }),
    json(),
    cjs(),
    terser({
      mangle: false
    })
  ],
  external: ['@ethersproject/contracts', 'keccak', 'idna-uts46-hx']
}
