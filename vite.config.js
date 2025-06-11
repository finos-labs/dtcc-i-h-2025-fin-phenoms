import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react()],

    // Production optimizations
    build: {
      // Generate source maps for production build
      sourcemap: true,

      // Minify output
      minify: 'terser',

      // Terser options
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },

      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,

      // Output directory (default is dist)
      outDir: 'dist',

      // Empty output directory before build
      emptyOutDir: true,

      // Rollup options
      rollupOptions: {
        output: {
          // Chunk files
          manualChunks: {
            vendor: ['react', 'react-dom', 'chart.js', 'react-chartjs-2'],
            // Add more manual chunks as needed
          },
        },
      },
    },

    // Server options (for development)
    server: {
      port: 3000,
      strictPort: true,
      host: true, // Listen on all addresses
    },

    // Preview options (for production preview)
    preview: {
      port: 8080,
      strictPort: true,
      host: true, // Listen on all addresses
    },
  }
})
