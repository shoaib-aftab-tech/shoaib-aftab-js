/**
 * Shoaib Aftab JS - AJAX Module
 */

export const interceptors = {
  request: [],
  response: []
};

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export async function get(url, headers = {}, options = {}) {
  let requestOptions = { method: 'GET', headers: { ...headers }, ...options };
  
  for (const interceptor of interceptors.request) {
    requestOptions = (await interceptor(url, requestOptions)) || requestOptions;
  }
  
  if (authToken && !requestOptions.headers['Authorization']) {
    requestOptions.headers['Authorization'] = `Bearer ${authToken}`;
  }

  let triggerButton = null;
  if (options.triggerId) {
    triggerButton = document.getElementById(options.triggerId);
    if (triggerButton) {
      triggerButton.setAttribute('disabled', 'true');
      triggerButton.dataset.originalText = triggerButton.innerHTML;
      triggerButton.innerHTML = `<span class="sa-icon sa-i-loader sa-spin sa-mr-2"></span>Loading...`;
    }
  }

  try {
    let response = await fetch(url, requestOptions);
    
    for (const interceptor of interceptors.response) {
      response = (await interceptor(response)) || response;
    }

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } finally {
    if (triggerButton) {
      triggerButton.removeAttribute('disabled');
      triggerButton.innerHTML = triggerButton.dataset.originalText;
    }
  }
}

export async function post(url, data = {}, headers = {}, options = {}) {
  const mergedHeaders = { 'Content-Type': 'application/json', ...headers };
  let requestOptions = {
    method: 'POST',
    headers: mergedHeaders,
    body: JSON.stringify(data),
    ...options
  };

  for (const interceptor of interceptors.request) {
    requestOptions = (await interceptor(url, requestOptions)) || requestOptions;
  }

  if (authToken && !requestOptions.headers['Authorization']) {
    requestOptions.headers['Authorization'] = `Bearer ${authToken}`;
  }

  let triggerButton = null;
  if (options.triggerId) {
    triggerButton = document.getElementById(options.triggerId);
    if (triggerButton) {
      triggerButton.setAttribute('disabled', 'true');
      triggerButton.dataset.originalText = triggerButton.innerHTML;
      triggerButton.innerHTML = `<span class="sa-icon sa-i-loader sa-spin sa-mr-2"></span>Saving...`;
    }
  }

  try {
    let response = await fetch(url, requestOptions);
    
    for (const interceptor of interceptors.response) {
      response = (await interceptor(response)) || response;
    }

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } finally {
    if (triggerButton) {
      triggerButton.removeAttribute('disabled');
      triggerButton.innerHTML = triggerButton.dataset.originalText;
    }
  }
}
