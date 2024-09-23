import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Expor na rede
    cors: {
      origin: 'https://dev.cetif.com', // Substitua pelo seu domínio
      methods: ['GET', 'POST'], // Métodos permitidos
      credentials: true // Se precisar enviar cookies ou autenticação
    }
  }
})
