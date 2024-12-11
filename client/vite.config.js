import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
const { PORT = 3000 } = process.env;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: `https://farmers-market-beta.vercel.app`,
        changeOrigin: true,
      },
      '/api/users': {
        target: `https://farmers-market-beta.vercel.app`,
        changeOrigin: true,
      },
      '/auth': {
        target: `https://farmers-market-beta.vercel.app`,
        changeOrigin: true,
      },
    },
  }
}
);
