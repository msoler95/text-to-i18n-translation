<template>
  <div class="d-flex "  style="width: 100%; height: 100%;">
    <v-card class="column">
      <v-card-title  class="ma-2">Settings</v-card-title>
      <v-text-field v-model="componentNameInput" label="Component name" class="pa-4 pt-2"></v-text-field>
      <v-textarea v-model="translationsInput" rows="20" label="Translations" class="pa-4 pt-0"></v-textarea>
    </v-card>

    <v-card class="column">
      <v-card-title class="ma-2">Vue translation</v-card-title>
      <v-card-text>
        <v-textarea v-model="vueTranslationColumnText"></v-textarea>
      </v-card-text>
    </v-card>

    <v-card class="column">
      <v-card-title class="ma-2">i18n translation</v-card-title>
      <v-card-text>
        <v-textarea v-model="i18nTranslationColumnText"></v-textarea>
      </v-card-text>
    </v-card>

  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
  const componentNameInput = ref('')
  const translationsInput = ref('')

  function toCamelCase(originalText) {
    return originalText
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  }



  function toVueTranslation(originalText) {
    if(!originalText) return
    let i18nTranslation = `$q{{${toCamelCase(originalText)}}}`
    return i18nTranslation
  }

  function toI18n(originalText) {
    if(!originalText) return
    let i18nTranslation = `
    ${componentNameInput.value}: {
      ${toCamelCase(originalText)}: "${originalText}"
    }`
    return i18nTranslation
  }

  const vueTranslationColumnText = computed(() => {
    return toVueTranslation(translationsInput.value)
  })
  const i18nTranslationColumnText = computed(() => {
    return toI18n(translationsInput.value)
  })
</script>
<style>
.column {
  flex-grow: 1;
  margin: 10px;
}
</style>
