import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

export default [
  {
    input: 'src/index.core.js',
    output: {
      file: 'dist/esm/index.core.js',
      format: 'esm',
    },
  },
  {
    input: 'src/index.core.js',
    output: {
      file: 'dist/imagnify.core.js',
      format: 'umd',
      name: 'imagnify',
    },
  },
  {
    input: 'src/index.core.js',
    output: {
      file: 'dist/imagnify.core.min.js',
      format: 'umd',
      name: 'imagnify',
    },
    plugins: [terser()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/esm/index.js',
      format: 'esm',
    },
    plugins: [
      postcss({
        minimize: true,
        extensions: ['.css'],
        plugins: [autoprefixer()],
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/imagnify.js',
      format: 'umd',
      name: 'imagnify',
    },
    plugins: [
      postcss({
        minimize: true,
        extensions: ['.css'],
        plugins: [autoprefixer()],
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/imagnify.min.js',
      format: 'umd',
      name: 'imagnify',
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
      file: 'dist/imagnify.css',
      format: 'es',
    },
    plugins: [
      postcss({
        extract: true,
        plugins: [autoprefixer()],
      }),
    ],
  },
  {
    input: 'src/style.css',
    output: {
      file: 'dist/imagnify.min.css',
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
