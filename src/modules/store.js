import { createState, pubsub } from './reactivity.js';

/*
=============================================================================
  Shoaib Aftab JS - Global Store (State Management)
=============================================================================
*/

const stores = {};

export function createStore(storeName, initialState) {
  if (stores[storeName]) return stores[storeName];
  const state = createState(initialState, storeName);
  stores[storeName] = state;
  return state;
}

export function useStore(storeName) {
  return stores[storeName];
}
