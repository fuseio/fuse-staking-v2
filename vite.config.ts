import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import reactRefresh from '@vitejs/plugin-react-refresh'


const MODE = process.env.NODE_ENV
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  reactRefresh(),
  eslint(),
  MODE === 'development'
    ? nodePolyfills({
      include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
    })
    : eslint()
  ],
  optimizeDeps: {
    include: [
      'bn.js',
      'js-sha3',
      'hash.js',
    ]
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      '@ensdomains/address-encoder': '@ensdomains/address-encoder/lib/index.umd.js'
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  base: '/',
  appType: 'mpa',
})
