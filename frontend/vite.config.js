// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Export Vite configuration
export default defineConfig({
  plugins: [
    // Uncomment the line below if you're using React
    // react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend URL
        changeOrigin: true, // Ensures the origin header is changed to match the target
      },
    },
  },
});