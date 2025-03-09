import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'robots.txt', '512.png'],
    //   manifest: {
    //     name: 'CutBG',
    //     short_name: 'CutBG',
    //     description: 'Cutbg - AI Background Remover | Remove Image Background Online for Free',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: '192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // }),
  ],
  build: {
    cssCodeSplit: true,
  },
  server: {
    allowedHosts: ['bd0c-139-138-196-56.ngrok-free.app'],
  }
})