/**
 * Shoaib Aftab JS - Animation Module
 */
import { $ } from './dom.js';

export function fadeIn(element, duration = 400) {
  if (typeof element === 'string') element = $(element);
  if (!element) return;
  element.style.opacity = 0;
  element.style.display = element.dataset.display || 'block';

  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.min(progress / duration, 1);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

export function fadeOut(element, duration = 400) {
  if (typeof element === 'string') element = $(element);
  if (!element) return;
  element.style.opacity = 1;

  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.max(1 - (progress / duration), 0);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      element.dataset.display = window.getComputedStyle(element).display;
      element.style.display = 'none';
    }
  }
  window.requestAnimationFrame(step);
}
