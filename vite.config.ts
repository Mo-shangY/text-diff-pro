import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    (monacoEditorPlugin as any).default ? (monacoEditorPlugin as any).default({}) : monacoEditorPlugin({})
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})