/**
 * Shoaib Aftab JS - String Utilities
 */

export function toTitleCase(str) {
  if (!str) return '';
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function slugify(str) {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
