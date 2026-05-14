import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const leetCodeGraphqlProxy = {
  '/api/leetcode/graphql': {
    target: 'https://leetcode.com',
    changeOrigin: true,
    rewrite: () => '/graphql',
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: leetCodeGraphqlProxy,
  },
  preview: {
    proxy: leetCodeGraphqlProxy,
  },
})
