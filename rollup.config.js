import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.ts',
  output: {
    name: 'alienUI'
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ],
}