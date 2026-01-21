<template>
  <div class="flex flex-col h-full bg-slate-900 text-slate-200">
    <header class="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shadow-lg z-10 gap-y-2">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-500/30 shadow-md">
          <FileDiff class="w-5 h-5" />
        </div>
        <h1 class="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hidden sm:block">
          {{ t('app.title') }}
        </h1>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        <!-- File Uploads -->
        <div class="flex gap-2">
            <input type="file" ref="originalFileInput" class="hidden" @change="(e) => handleFileUpload(e, 'original')" />
            <input type="file" ref="modifiedFileInput" class="hidden" @change="(e) => handleFileUpload(e, 'modified')" />
            
            <button @click="originalFileInput?.click()" 
              class="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-all text-sm border border-slate-600 hover:border-slate-500 hover:shadow-md active:scale-95 whitespace-nowrap">
                <Upload class="w-4 h-4" />
                <span class="hidden sm:inline">{{ t('actions.loadOriginal') }}</span>
                <span class="sm:hidden">原始</span>
            </button>
            <button @click="modifiedFileInput?.click()" 
              class="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-all text-sm border border-slate-600 hover:border-slate-500 hover:shadow-md active:scale-95 whitespace-nowrap">
                <Upload class="w-4 h-4" />
                <span class="hidden sm:inline">{{ t('actions.loadModified') }}</span>
                <span class="sm:hidden">修改</span>
            </button>
        </div>

        <div class="h-6 w-px bg-slate-600 mx-1 hidden sm:block"></div>

        <!-- Language Selector -->
        <div class="flex items-center gap-2">
            <Languages class="w-4 h-4 text-slate-400 hidden sm:block" />
            <select v-model="diffStore.language" 
              class="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer hover:bg-slate-600 transition-colors">
              <option v-for="(_, key) in languages" :key="key" :value="key">
                {{ t(`languages.${key}`) }}
              </option>
            </select>
        </div>

        <div class="h-6 w-px bg-slate-600 mx-1 hidden sm:block"></div>

        <!-- Theme Toggle -->
        <button @click="toggleTheme" 
          class="p-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-all text-slate-200 border border-slate-600 hover:border-slate-500 hover:shadow-md active:scale-95"
          :title="t('actions.toggleTheme')">
          <Sun v-if="diffStore.theme === 'vs'" class="w-4 h-4 text-yellow-400" />
          <Moon v-else class="w-4 h-4 text-blue-300" />
        </button>
      </div>
    </header>

    <main class="flex-1 overflow-hidden relative bg-slate-900">
      <DiffComponent />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FileDiff, Upload, Moon, Sun, Languages } from 'lucide-vue-next'
import DiffComponent from '@/components/DiffComponent.vue'
import { useDiffStore } from '@/store/diffStore'

const { t } = useI18n()
const diffStore = useDiffStore()
const originalFileInput = ref<HTMLInputElement | null>(null)
const modifiedFileInput = ref<HTMLInputElement | null>(null)

const languages = {
    plaintext: 'Plain Text',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    json: 'JSON',
    html: 'HTML',
    css: 'CSS',
    python: 'Python',
    sql: 'SQL',
    xml: 'XML',
    yaml: 'YAML',
}

const toggleTheme = () => {
  diffStore.theme = diffStore.theme === 'vs-dark' ? 'vs' : 'vs-dark'
}

const handleFileUpload = (event: Event, target: 'original' | 'modified') => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    if (target === 'original') diffStore.setOriginal(content)
    else diffStore.setModified(content)
  }
  reader.readAsText(file)
  
  // Reset input value to allow re-uploading the same file
  if (event.target instanceof HTMLInputElement) {
    event.target.value = ''
  }
}
</script>