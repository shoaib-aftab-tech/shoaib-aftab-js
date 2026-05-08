/**
 * Shoaib Aftab JS - Events Module
 */
import { $ } from './dom.js';

export function off(element, event, handler) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    element.removeEventListener(event, handler);
  }
}

export function trigger(element, eventType, detail = null) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) {
    const event = new CustomEvent(eventType, { detail });
    element.dispatchEvent(event);
  }
}
