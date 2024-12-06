import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()]
//  server: {
//    proxy : {
//      '/api': {
//        target: 'http://localhost:8080',
//        changeOrgin: true,
//        rewrite: (path) => path.replace(/^\/api/, ''), // "/api"를 제거
//        // secure: false,
//      }
//    }
//  }
})

