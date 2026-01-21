<template>
  <div class="h-full w-full">
    <VueMonacoDiffEditor
      v-model:original="diffStore.originalContent"
      v-model:modified="diffStore.modifiedContent"
      :language="diffStore.language"
      :theme="diffStore.theme"
      :options="editorOptions"
      class="h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { VueMonacoDiffEditor } from '@guolao/vue-monaco-editor'
import { useDiffStore } from '@/store/diffStore'

const diffStore = useDiffStore()

const editorOptions = {
  automaticLayout: true,
  renderSideBySide: true, // Split view
  originalEditable: true, // Allow editing original
  readOnly: false,
  minimap: { enabled: true }
}
</script>