<div align="center">
  <br>
  <strong>🌍 Official Live Documentation:</strong> <a href="https://shoaibaftab.com/shoaib-aftab-js-docs">https://shoaibaftab.com/shoaib-aftab-js-docs</a>
  <br><br>
</div>

# Shoaib Aftab JS Framework - Complete Documentation

Welcome to the comprehensive, offline reference manual for the **Shoaib Aftab JS Framework (V2)**. This framework is an ultra-secure, zero-dependency JavaScript reactivity engine and SPA router designed for enterprise Web Applications.

This document serves as an exhaustive guide to utilizing the framework's state management, DOM binding, routing, and security features.

---

## Table of Contents
1. [Core Philosophy](#core-philosophy)
2. [State Management & Reactivity](#state-management--reactivity)
3. [DOM Binding Directives](#dom-binding-directives)
4. [The SPA Router](#the-spa-router)
5. [Enterprise Security & Sanitization](#enterprise-security--sanitization)

---

## 1. Core Philosophy

### The "Zero Dependency" Rule
The defining feature of this framework is its absolute independence. It requires **0 NPM packages**. You do not need Webpack, Vite, Babel, or React. The compiled `shoaib-aftab.min.js` file works natively in any browser.

### Microtask Batching
Unlike older frameworks that update the DOM immediately on every variable change (causing layout thrashing), this framework utilizes `queueMicrotask`. If you change 100 variables in a single function, the framework waits until the function finishes, and updates the DOM exactly *once*.

---

## 2. State Management & Reactivity

The framework uses native JavaScript `Proxy` objects to deeply watch your data.

### Creating State
You must use `SA.Store.createState()` to initialize your reactive data.

```javascript
// Initialize state
const globalState = SA.Store.createState({
    user: {
        name: "Shoaib Aftab",
        role: "Admin"
    },
    notifications: 5,
    isVisible: true
});
```

### Initializing the DOM
Once your state is created, tell the framework to scan the HTML document and bind the data.

```javascript
// Bind to the entire body, or a specific container
SA.Store.initReactivity(document.body, globalState);
```

---

## 3. DOM Binding Directives

The framework scans the DOM for specific `sa-*` attributes to establish reactivity.

### `sa-text`
Updates the text content of an element. It is completely safe from XSS.
```html
<p>Welcome, <span sa-text="user.name"></span>!</p>
```

### `sa-html`
Injects raw HTML into the element. **Note:** This automatically runs through our Enterprise DOM Sanitizer to strip `<script>` and malicious attributes.
```html
<div sa-html="user.bio"></div>
```

### `sa-model` (Two-Way Binding)
Binds an input field to a state variable. When the user types, the state updates. When the state updates, the input updates.
```html
<input type="text" sa-model="user.name">
```

### `sa-show` (Conditional Rendering)
Toggles `display: none` based on a boolean value in the state.
```html
<div sa-show="isVisible">This box can be hidden.</div>
```

### `sa-bind:class` (Dynamic Classes)
Toggles a CSS class based on a condition.
```html
<!-- If notifications > 0, the class 'alert-red' is applied -->
<div sa-bind:class="{ 'alert-red': notifications > 0 }">
  You have messages!
</div>
```

---

## 4. The SPA Router

Build Single Page Applications (SPAs) without page reloads using the native HTML5 History API.

### Setup

1. Define a container in your HTML where pages will be injected.
```html
<main sa-view></main>
```

2. Create navigation links using the `sa-route` attribute.
```html
<a sa-route="/dashboard">Dashboard</a>
<a sa-route="/settings">Settings</a>
```

3. Initialize the router with your page templates.
```javascript
SA.Router.initRouter({
    '/dashboard': '<h1>Dashboard Content</h1>',
    '/settings': '<h1>Settings Content</h1>'
});
```

*Pro Tip: Listen for the `sa-route-changed` event on the `window` object to re-initialize your reactivity when a new page loads.*

---

## 5. Enterprise Security & Sanitization

Security is not an afterthought; it is built into the core.

### Prototype Pollution Protection
When binding deeply nested data (e.g., `sa-text="user.profile.age"`), the framework's internal path resolver strictly blocks `__proto__`, `constructor`, and `prototype` keys. This prevents attackers from poisoning the global Object prototype.

### DOM Sanitizer
When using `sa-html`, the data passes through `SA.Security.sanitizeHTML()`.
- **Blocked Tags:** `script`, `iframe`, `object`, `embed`, `form`, `svg`, `math`, `base`, `meta`, `link`, `style`.
- **Blocked Attributes:** Neutralizes `onerror`, `onload`, and strips `javascript:` or `data:` URIs from `href` and `src` attributes.
- **Whitespace Evasion:** It aggressively strips invisible characters (like `&#x09;`, `&#x0A;`) that attackers use to bypass basic regex filters.

---
*For interactive demos and more details, please visit [shoaibaftab.com](https://shoaibaftab.com).*
