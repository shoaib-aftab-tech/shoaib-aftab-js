/**
 * Shoaib Aftab JS - Validation Module
 */

export function isEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function isURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function isEmpty(val) {
  return val === undefined || val === null || val === '';
}
