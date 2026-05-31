/**
 * Shoaib Aftab JS - Reactive Framework Module
 */

export function createState(initialState, onStateChange) {
  return new Proxy(initialState, {
    set(target, key, value) {
      target[key] = value;
      if (typeof onStateChange === 'function') {
        onStateChange(target, key, value);
      }
      return true;
    }
  });
}

export function bindInput(inputId, stateObject, stateKey) {
  const el = document.getElementById(inputId);
  if (!el) return;

  // Initial Sync from State to DOM
  el.value = stateObject[stateKey] || '';

  // DOM to State Synchronization
  el.addEventListener('input', (e) => {
    stateObject[stateKey] = e.target.value;
  });

  el.addEventListener('change', (e) => {
    stateObject[stateKey] = e.target.value;
  });
}
