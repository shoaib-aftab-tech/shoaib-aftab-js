/**
 * Shoaib Aftab JS - Number Module
 */
export function formatCurrency(num, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(num);
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
