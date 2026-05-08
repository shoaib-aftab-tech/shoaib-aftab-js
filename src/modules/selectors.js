/**
 * Shoaib Aftab JS - Selectors Module
 */
import { $, $$ } from './dom.js';

export function siblings(element) {
  if (typeof element === 'string') element = $(element);
  if (!element || !element.parentNode) return [];
  return Array.prototype.filter.call(element.parentNode.children, function(child) {
    return child !== element;
  });
}

export function closest(element, selector) {
  if (typeof element === 'string') element = $(element);
  if (!element) return null;
  return element.closest(selector);
}
