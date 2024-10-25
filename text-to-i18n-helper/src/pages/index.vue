<template>
  <div class="d-flex "  style="width: 100%; height: 100%;">
    <v-card class="column d-flex flex-column">
      <v-card-title  class="ma-2">Settings</v-card-title>
      <v-text-field v-model="componentNameInput" label="Component name" class="pa-4 pt-2"></v-text-field>
      <v-textarea @paste="handlePaste" v-model="translationsInput" rows="24" label="Translations" class="pa-4 pt-0"></v-textarea>
    </v-card>

    <v-card class="column">
      <v-card-title class="ma-2">Vue translation</v-card-title>
      <v-card-text>
        <v-textarea rows="30" v-model="vueTranslationColumnText"></v-textarea>
      </v-card-text>
    </v-card>

    <v-card class="column">
      <v-card-title class="ma-2">i18n translation</v-card-title>
      <v-card-text>
        <v-textarea rows="30" v-model="i18nTranslationColumnText"></v-textarea>
      </v-card-text>
    </v-card>

  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
  const componentNameInput = ref('')
  const translationsInput = ref('')

  const handlePaste = async (event) => {
    // Obtener el texto pegado
    const pastedData = event.clipboardData.getData('text');

    // Aquí puedes ejecutar cualquier lógica que necesites con el texto pegado
    console.log('Texto pegado:', getVueTranslation(pastedData))
    await navigator.clipboard.writeText(getVueTranslation(pastedData));
    translationsInput.value += '\n'
  }

  function toCamelCase(originalText) {
    return originalText
      .replace(/"/g, "'") // Reemplaza comillas dobles por comillas simples
      .replace(/\./g, '') // Elimina los puntos
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  }

  const getVueTranslation = (line) => {
  return `{{$q("${toCamelCase(line)}")}}`
}


  function toVueTranslation(originalText) {
    if(!originalText) return
    const lines = originalText.split("\n").map(getVueTranslation);
    return lines.join('\n')
  }

  function toI18n(originalText) {
    if(!originalText) return
    const lines = originalText.replace(/"/g, "'").split("\n").map((line, i) => {
      const camelCaseKey = toCamelCase(line);
      if(i === 0) return `  "${camelCaseKey}": "${line}"`;
      return `
        "${camelCaseKey}": "${line}"`;
    });
    let i18nTranslation = `"${componentNameInput.value}": {
      ${lines}
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
