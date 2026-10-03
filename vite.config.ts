import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'maestra-api',
      async configureServer(server) {
        // @ts-expect-error servidor ESM sin declaraciones
        const { handleApi } = await import('./server/api.mjs')
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api/')) {
            next()
            return
          }
          void handleApi(req, res)
        })
      },
    },
  ],
})
