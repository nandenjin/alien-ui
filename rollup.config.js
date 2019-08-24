import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.ts',
  output: {
    name: 'alienUI',
    exports: 'named'
  },
  plugins: [
    typescript(),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ],
  external: ['vue-property-decorator', 'vue']
}
