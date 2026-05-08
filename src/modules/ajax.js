/**
 * Shoaib Aftab JS - AJAX Module
 */

export async function get(url, headers = {}) {
  const response = await fetch(url, { method: 'GET', headers });
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function post(url, data = {}, headers = {}) {
  const mergedHeaders = { 'Content-Type': 'application/json', ...headers };
  const response = await fetch(url, {
    method: 'POST',
    headers: mergedHeaders,
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}
