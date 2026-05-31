/*
=============================================================================
  Shoaib Aftab JS - Enterprise Security (DOM Sanitizer)
=============================================================================
*/

// Lightweight DOM Sanitizer to prevent XSS in sa-html
export function sanitizeHTML(htmlStr) {
  if (typeof htmlStr !== 'string') return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlStr, 'text/html');

  // Remove dangerous tags
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'svg', 'math', 'base', 'meta', 'link', 'style'];
  dangerousTags.forEach(tag => {
    const elements = doc.body.querySelectorAll(tag);
    elements.forEach(el => el.remove());
  });

  // Remove dangerous attributes (on*)
  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach(el => {
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      const attrName = el.attributes[i].name.toLowerCase();
      // Strip all whitespace and control characters from the value to prevent 'java\tscript:' bypasses
      const attrVal = el.attributes[i].value.toLowerCase().replace(/[\s\x00-\x1F\x7F-\x9F]/g, '');
      if (attrName.startsWith('on') || attrVal.startsWith('javascript:') || attrVal.startsWith('data:') || attrVal.startsWith('vbscript:')) {
        el.removeAttribute(attrName);
      }
    }
  });

  return doc.body.innerHTML;
}
