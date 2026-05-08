/**
 * Shoaib Aftab JS (Shoaib Aftab JS) - Main Entry Point
 */

import { core } from './modules/core.js';
import { initPolyfills } from './modules/polyfills.js';
import { $, $$, addClass, removeClass, toggleClass } from './modules/dom.js';
import { siblings, closest } from './modules/selectors.js';
import { on, off, trigger } from './modules/events.js';
import { get, post } from './modules/ajax.js';
import { local, session } from './modules/storage.js';
import { setCookie, getCookie, removeCookie } from './modules/cookies.js';
import { getQueryParam, getAllQueryParams } from './modules/url.js';
import { capitalize, debounce, uuid, isObject } from './modules/utilities.js';
import { toTitleCase, slugify } from './modules/string.js';
import { formatCurrency, random } from './modules/number.js';
import { unique, shuffle, chunk } from './modules/array.js';
import { deepClone, isEmptyObject } from './modules/object.js';
import { format as formatDate, isPast } from './modules/date.js';
import { isEmail, isURL, isEmpty } from './modules/validation.js';
import { fadeIn, fadeOut } from './modules/animation.js';
import { setRTL, setLTR } from './modules/i18n.js';

// Initialize polyfills
initPolyfills();

const SA = {
  core,
  dom: { $, $$, addClass, removeClass, toggleClass },
  selectors: { siblings, closest },
  events: { on, off, trigger },
  ajax: { get, post },
  storage: { local, session },
  cookies: { setCookie, getCookie, removeCookie },
  url: { getQueryParam, getAllQueryParams },
  string: { capitalize, toTitleCase, slugify },
  number: { formatCurrency, random },
  array: { unique, shuffle, chunk },
  object: { deepClone, isEmptyObject },
  date: { format: formatDate, isPast },
  validation: { isEmail, isURL, isEmpty },
  animation: { fadeIn, fadeOut },
  utilities: { isObject, debounce, uuid },
  i18n: { setRTL, setLTR }
};

export { SA };
export default SA;

if (typeof window !== 'undefined') {
  window.SA = SA;
}
