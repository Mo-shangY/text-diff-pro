import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDiffStore = defineStore('diff', () => {
  const originalContent = ref('// 原始版本示例\n// 这是一个使用 Vue 3 + Vite 构建的文本对比工具。\n\nfunction hello() {\n  console.log("你好，世界！");\n}')
  const modifiedContent = ref('// 修改版本示例\n// 这是一个使用 Vue 3 + Vite + Pinia 构建的文本对比工具。\n\nfunction hello() {\n  console.log("你好，Vue 3！");\n  // 添加了一行注释\n}')
  const language = ref('javascript')
  const theme = ref('vs-dark')

  function setOriginal(content: string) {
    originalContent.value = content
  }

  function setModified(content: string) {
    modifiedContent.value = content
  }

  return {
    originalContent,
    modifiedContent,
    language,
    theme,
    setOriginal,
    setModified
  }
})