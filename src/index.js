/**
 * Shoaib Aftab JS (Shoaib Aftab JS) - Main Entry Point
 */

import { core } from './modules/core.js';
import { initPolyfills } from './modules/polyfills.js';
import { $, $$, addClass, removeClass, toggleClass } from './modules/dom.js';
import { siblings, closest } from './modules/selectors.js';
import { on, off, trigger } from './modules/events.js';
import { get, post, setAuthToken, interceptors } from './modules/ajax.js';
import { local, session } from './modules/storage.js';
import { setCookie, getCookie, removeCookie } from './modules/cookies.js';
import { getQueryParam, getAllQueryParams } from './modules/url.js';
import { capitalize, debounce, uuid, isObject } from './modules/utilities.js';
import { toTitleCase, slugify } from './modules/string.js';
import { formatCurrency, random } from './modules/number.js';
import { unique, shuffle, chunk } from './modules/array.js';
import { deepClone, isEmptyObject } from './modules/object.js';
import { format as formatDate, isPast } from './modules/date.js';
import { isEmail, isURL, isEmpty, isCardNumber, validateForm } from './modules/validation.js';
import { fadeIn, fadeOut } from './modules/animation.js';
import { setRTL, setLTR } from './modules/i18n.js';
import { createState, ref, effect, computed, watch, mount, defineComponent, http, pubsub } from './modules/reactivity.js';
import { createRouter, navigate } from './modules/router.js';
import { createStore, useStore } from './modules/store.js';
import { sanitizeHTML } from './modules/security.js';
import { clipboard, modal, dropdown, theme } from './modules/components.js';

export const Reactivity = {
  createState,
  ref,
  effect,
  computed,
  watch,
  mount,
  defineComponent,
  http,
  pubsub
};

export const Router = {
  createRouter,
  navigate
};

export const Store = {
  createStore,
  useStore
};

export const Security = {
  sanitizeHTML
};

// Global Exposure for Script Tag Usage
window.ShoaibAftabJS = {
  Reactivity,
  Router,
  Store,
  Security
};
// Initialize polyfills
initPolyfills();

const SA = {
  core,
  dom: { $, $$, addClass, removeClass, toggleClass },
  selectors: { siblings, closest },
  events: { on, off, trigger },
  ajax: { get, post, setAuthToken, interceptors },
  storage: { local, session },
  cookies: { setCookie, getCookie, removeCookie },
  url: { getQueryParam, getAllQueryParams },
  string: { capitalize, toTitleCase, slugify },
  number: { formatCurrency, random },
  array: { unique, shuffle, chunk },
  object: { deepClone, isEmptyObject },
  date: { format: formatDate, isPast },
  validation: { isEmail, isURL, isEmpty, isCardNumber, validateForm },
  animation: { fadeIn, fadeOut },
  utilities: { isObject, debounce, uuid },
  framework: { ...Reactivity, ...Router, ...Store, ...Security },
  i18n: { setRTL, setLTR },
  clipboard,
  modal,
  dropdown,
  theme
};

export { SA };
export default SA;

if (typeof window !== 'undefined') {
  window.SA = SA;
}
