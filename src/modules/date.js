/**
 * Shoaib Aftab JS - Date Utilities
 */

export function format(date, locale = 'en-US') {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale).format(d);
}

export function isPast(date) {
  return new Date(date).getTime() < new Date().getTime();
}
