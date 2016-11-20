import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/fetcher.js',
  format: 'cjs',
  plugins: [babel()],
  external: ['isomorphic-fetch', 'querystring'],
  dest: 'index.js'
};
