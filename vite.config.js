import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5174,
    open: true,
    fs: {
      // Permitir servir arquivos de fora do projeto (apenas em desenvolvimento)
      allow: process.env.NODE_ENV === 'development' ? ['..'] : []
    }
  },
  // Criar alias para a pasta Processos
  resolve: {
    alias: {
      '@processos': resolve(__dirname, 'Processos')
    }
  }
})

