import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/mdn-zoom.min.js',
      format: 'es',
    },
    plugins: [
      terser(),
      postcss({
        minimize: true,
        extensions: ['.css'],
        plugins: [autoprefixer()],
      }),
    ],
  },
  {
    input: 'src/style.css',
    output: {
      file: 'dist/mdn-zoom.min.css',
      format: 'es',
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        plugins: [autoprefixer()],
      }),
    ],
  },
]
