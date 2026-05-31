import { sanitizeHTML } from './security.js';

/*
=============================================================================
  Shoaib Aftab JS - Core Reactivity (Deep Proxy & DOM Batching)
=============================================================================
*/

export const pubsub = new EventTarget();
let activeEffect = null;
let updateQueue = new Set();
let isUpdateScheduled = false;

// 1. DOM Batching logic
function scheduleUpdate(task) {
  updateQueue.add(task);
  if (!isUpdateScheduled) {
    isUpdateScheduled = true;
    queueMicrotask(() => {
      updateQueue.forEach(fn => fn());
      updateQueue.clear();
      isUpdateScheduled = false;
    });
  }
}

// 1.1 Secure Path Resolution (Prototype Pollution Protection)
function resolvePath(obj, path) {
  if (!path || typeof path !== 'string') return undefined;
  return path.split('.').reduce((o, i) => {
    if (i === '__proto__' || i === 'constructor' || i === 'prototype') return undefined;
    return o ? o[i] : undefined;
  }, obj);
}

function setPath(obj, path, val) {
  if (!path || typeof path !== 'string') return;
  const parts = path.split('.');
  const last = parts.pop();
  if (last === '__proto__' || last === 'constructor' || last === 'prototype') return;
  const target = parts.reduce((o, i) => {
    if (i === '__proto__' || i === 'constructor' || i === 'prototype') return undefined;
    return o ? o[i] : undefined;
  }, obj);
  if (target) target[last] = val;
}

// 2. Deep Reactivity Proxy
export function createState(initialState, basePath = '') {
  const handler = {
    get(target, prop, receiver) {
      if (typeof target[prop] === 'object' && target[prop] !== null && !target[prop].__isProxy) {
        target[prop] = createState(target[prop], basePath ? `${basePath}.${String(prop)}` : String(prop));
      }
      
      if (activeEffect) {
        pubsub.addEventListener(`sa:update:${basePath ? basePath + '.' + String(prop) : String(prop)}`, activeEffect);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const oldVal = target[prop];
      if (oldVal !== value) {
        const result = Reflect.set(target, prop, value, receiver);
        const path = basePath ? `${basePath}.${String(prop)}` : String(prop);
        
        scheduleUpdate(() => {
          pubsub.dispatchEvent(new CustomEvent('sa:update', { detail: { path, value, oldVal } }));
          pubsub.dispatchEvent(new CustomEvent(`sa:update:${path}`, { detail: { value, oldVal } }));
        });
        
        return result;
      }
      return true;
    }
  };

  const proxy = new Proxy(initialState, handler);
  Object.defineProperty(proxy, '__isProxy', { value: true, enumerable: false });
  return proxy;
}

export function ref(value) {
  return createState({ value });
}

export function effect(fn) {
  activeEffect = () => fn();
  fn();
  activeEffect = null;
}

export function computed(fn) {
  const result = ref(null);
  effect(() => { result.value = fn(); });
  return result;
}

export function watch(path, callback) {
  pubsub.addEventListener(`sa:update:${path}`, (e) => callback(e.detail.value, e.detail.oldVal));
}

// 3. Declarative DOM Compiler with MutationObserver
export function mount(state, rootElement = document) {
  rootElement.querySelectorAll('[sa-cloak]').forEach(el => el.removeAttribute('sa-cloak'));

  function updateDOM() {
    rootElement.querySelectorAll('[sa-text]').forEach(el => {
      const prop = el.getAttribute('sa-text');
      const val = resolvePath(state, prop);
      if (val !== undefined && el.textContent !== String(val)) el.textContent = val;
    });
    
    rootElement.querySelectorAll('[sa-html]').forEach(el => {
      const prop = el.getAttribute('sa-html');
      const val = resolvePath(state, prop);
      if (val !== undefined) {
        const sanitized = sanitizeHTML(String(val));
        if (el.innerHTML !== sanitized) el.innerHTML = sanitized;
      }
    });

    rootElement.querySelectorAll('[sa-bind\\:class]').forEach(el => {
      const bindStr = el.getAttribute('sa-bind:class');
      try {
        // Secure parser: "{ 'active': isActive, 'hidden': user.isHidden }"
        const cleanStr = bindStr.trim().replace(/^\{|\}$/g, ''); // Remove braces
        if (!cleanStr) return;
        
        const pairs = cleanStr.split(',');
        pairs.forEach(pair => {
          const [clsPart, statePart] = pair.split(':');
          if (clsPart && statePart) {
            const className = clsPart.trim().replace(/['"]/g, '');
            const stateKey = statePart.trim();
            // Resolve stateKey safely
            const val = resolvePath(state, stateKey);
            if (val) el.classList.add(className);
            else el.classList.remove(className);
          }
        });
      } catch(e) {}
    });

    rootElement.querySelectorAll('[sa-show]').forEach(el => {
      const prop = el.getAttribute('sa-show');
      const val = resolvePath(state, prop);
      el.style.display = val ? '' : 'none';
    });
    
    rootElement.querySelectorAll('[sa-model]').forEach(el => {
      const prop = el.getAttribute('sa-model');
      const val = resolvePath(state, prop);
      if (val !== undefined && el.value !== String(val)) {
        el.value = val;
      }
    });
  }

  function bindEvents(root) {
    // Model binding setup
    root.querySelectorAll('[sa-model]').forEach(el => {
      if (el.__sa_bound) return;
      el.__sa_bound = true;
      const prop = el.getAttribute('sa-model');
      const isLazy = el.hasAttribute('sa-model.lazy');
      const isNumber = el.hasAttribute('sa-model.number');
      const isTrim = el.hasAttribute('sa-model.trim');
      
      el.addEventListener(isLazy ? 'change' : 'input', (e) => {
        let val = e.target.value;
        if (isTrim) val = val.trim();
        if (isNumber) val = Number(val);
        // Secure path setter
        setPath(state, prop, val);
      });
    });

    // Event binding setup
    root.querySelectorAll('[sa-on\\:click]').forEach(el => {
      if (el.__sa_bound_click) return;
      el.__sa_bound_click = true;
      const actionStr = el.getAttribute('sa-on:click');
      let timer;
      el.addEventListener('click', (e) => {
        if (el.hasAttribute('sa-on:click.prevent')) e.preventDefault();
        if (el.hasAttribute('sa-on:click.stop')) e.stopPropagation();
        if (el.hasAttribute('sa-on:click.self') && e.target !== el) return;
        if (el.hasAttribute('sa-on:click.once') && el.dataset.clicked) return;
        el.dataset.clicked = true;

        const run = () => {
          const method = resolvePath(state, actionStr);
          if (typeof method === 'function') method(e, state);
          else if (typeof window[actionStr] === 'function') window[actionStr](e, state);
        };

        if (el.hasAttribute('sa-on:click.debounce')) {
          clearTimeout(timer);
          timer = setTimeout(run, 500);
        } else {
          run();
        }
      });
    });
    
    // Observers Integration
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const method = entry.target.getAttribute('sa-intersect');
            const fn = resolvePath(state, method);
            if (typeof fn === 'function') fn(entry);
          }
        });
      });
      root.querySelectorAll('[sa-intersect]').forEach(el => io.observe(el));
    }
  }

  // Initial execution
  bindEvents(rootElement);
  updateDOM();
  pubsub.addEventListener('sa:update', () => scheduleUpdate(updateDOM));

  // MutationObserver for auto-binding dynamic HTML
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            bindEvents(node);
            scheduleUpdate(updateDOM);
          }
        });
      }
    });
  });
  observer.observe(rootElement, { childList: true, subtree: true });
}
