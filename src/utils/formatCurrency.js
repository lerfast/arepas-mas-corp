// src/utils/formatCurrency.js
export default function formatCurrency(value, locale) {
  const lang = locale?.startsWith('en') ? 'en-US' : 'es-CO';
  // Ajusta la moneda si quieres COP en ES:
  const currency = 'USD';
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(value || 0);
}
