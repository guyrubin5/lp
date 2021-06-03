export const byLanguage = (items, language) => (
  items.filter(item => item.node.language.code === language)
)
