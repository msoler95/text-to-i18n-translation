function toCamelCase(input) {
  return input
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
}

// Obtiene todos los argumentos a partir del índice 2 y los une en una cadena
const input = process.argv.slice(2).join(' ');

if (!input) {
  console.log("Por favor, proporciona un texto.");
} else {
  const camelCaseText = toCamelCase(input);
  const i18nTranslation = `camelCaseText: "${input}"`
  console.log(i18nTranslation);
}