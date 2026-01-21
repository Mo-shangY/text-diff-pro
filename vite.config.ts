export default defineConfig({
  base: '/text-diff-pro/',
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