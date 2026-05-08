/**
 * Shoaib Aftab JS - DOM Manipulation Module
 */

export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function on(element, event, handler) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.addEventListener(event, handler);
  }
}

export function addClass(element, className) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.classList.add(className);
  }
}

export function removeClass(element, className) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.classList.remove(className);
  }
}

export function toggleClass(element, className) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.classList.toggle(className);
  }
}
