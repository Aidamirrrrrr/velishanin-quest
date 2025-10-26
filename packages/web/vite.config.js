import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
            },
        }),
        tailwindcss(),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 10240,
            deleteOriginFile: false,
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 10240,
            deleteOriginFile: false,
        }),
    ],

    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },

    base: './',

    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        emptyOutDir: false,

        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'],
            },
            format: {
                comments: false,
            },
        },

        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'query-vendor': ['@tanstack/react-query'],
                    'state-vendor': ['zustand'],
                    'utils-vendor': ['zod'],
                },

                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
                        return 'assets/images/[name]-[hash][extname]'
                    }
                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]'
                    }
                    return 'assets/[name]-[hash][extname]'
                },
            },
        },

        chunkSizeWarningLimit: 1000,

        assetsInlineLimit: 10240,
    },

    server: {
        port: 3000,
        host: true,
        open: false,
    },

    preview: {
        port: 4173,
        host: true,
    },

    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'zustand', 'zod'],
    },
})
