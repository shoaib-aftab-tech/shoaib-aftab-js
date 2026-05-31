/*
=============================================================================
  Shoaib Aftab JS - SPA Router (History API)
=============================================================================
*/

import { pubsub } from './reactivity.js';

let routes = {};

export function createRouter(routeMap) {
  routes = routeMap;
  
  // Handle sa-route clicks globally
  document.addEventListener('click', e => {
    const routeEl = e.target.closest('[sa-route]');
    if (routeEl) {
      e.preventDefault();
      const path = routeEl.getAttribute('sa-route');
      navigate(path);
    }
  });

  window.addEventListener('popstate', () => {
    renderView(window.location.pathname);
  });

  // Initial load
  renderView(window.location.pathname);
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  renderView(path);
}

async function renderView(path) {
  const viewEl = document.querySelector('sa-view') || document.querySelector('[sa-view]');
  if (!viewEl) return;

  const componentFn = routes[path] || routes['*'];
  if (componentFn) {
    let content = await componentFn();
    viewEl.innerHTML = typeof content === 'string' ? content : '';
    if (typeof content !== 'string') {
        viewEl.appendChild(content);
    }
    // Dispatch event so Reactivity engine can re-bind the new DOM
    pubsub.dispatchEvent(new CustomEvent('sa:router:view-changed'));
  }
}
