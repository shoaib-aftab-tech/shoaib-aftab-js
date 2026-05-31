# 📋 shoaib-aftab-js | Documentation

Welcome to the official documentation for **shoaib-aftab-js**—a high-performance, zero-dependency vanilla JavaScript library offering jQuery-like syntax and modern reactive capabilities for the web.

---

## 🗺️ Documentation Map (Pattern: shoaibaftab.com/shoaib-aftab-js-docs)

### 1. Getting Started
* [Introduction](#introduction)
* [Installation](#installation)
* [The SA Global Object](#global-object)

### 2. Core API
* [DOM Manipulation](#dom)
* [DOM Traversing](#traversing)
* [Event Handling](#events)
* [AJAX & Fetch API](#ajax)

### 3. Utilities & Modules
* [Reactive State Engine (New!)](#framework)
* [Form & Card Validation](#validation)
* [Local Storage](#storage)
* [Cookie Management](#cookies)
* [Date & String Utilities](#utilities)

---

## 🚀 1. Getting Started

### Introduction
`shoaib-aftab-js` is a lightweight utility-first JavaScript framework written in 100% pure Vanilla JS (ES6). It packs 150+ functions under the global `SA` namespace to power fast client-side scripting.

### Installation
Include the minified Javascript file at the bottom of your HTML document:
```html
<!-- 1. jsDelivr CDN (NPM Scoped - Recommended) -->
<!-- Versioned (Stable) -->
<script src="https://cdn.jsdelivr.net/npm/@shoaibaftabtech/js@2.0.0/dist/shoaib-aftab.min.js"></script>
<!-- Latest (Auto-updates) -->
<script src="https://cdn.jsdelivr.net/npm/@shoaibaftabtech/js@latest/dist/shoaib-aftab.min.js"></script>

<!-- 2. jsDelivr CDN (GitHub - Backup) -->
<script src="https://cdn.jsdelivr.net/gh/ShoaibAftabTech/shoaib-aftab-js@main/dist/shoaib-aftab.min.js"></script>
```

---

## 📐 2. Core API

### DOM Manipulation
Query elements and adjust styles effortlessly:
```javascript
// Query single and multiple nodes
const button = SA.dom.$('.sa-btn');
const cards = SA.dom.$$('.sa-card');

// Toggle styling classes
SA.dom.addClass(button, 'sa-active');
SA.dom.removeClass(button, 'sa-hidden');
```

### Event Handling
```javascript
SA.events.on('#submitBtn', 'click', (e) => {
    console.log('Button clicked!');
});
```

---

## ⚡ 3. Utilities & Modules

### Reactive State Engine (New!)
Bind input fields directly to JS states with standard Proxy-based reactive data structures:
```javascript
// 1. Create a reactive state proxy
const myState = SA.framework.createState({ name: '' }, (state, key, value) => {
    // Re-render callback triggered on any state update
    SA.dom.$('#displayName').textContent = `Hello, ${state.name}`;
});

// 2. Automatically bind input to state (Two-way Data Binding)
SA.framework.bindInput('myInputField', myState, 'name');
```

### AJAX & Fetch API
Perform AJAX requests with token interceptors and auto button loading handlers:
```javascript
// Set Authorization header Bearer Token globally
SA.ajax.setAuthToken('my-secret-jwt-token');

// Perform POST request with automated loading text/spinner on button
SA.ajax.post('https://api.example.com/save', { status: 'active' }, {}, { triggerId: 'saveBtn' })
  .then(data => console.log('Saved successfully:', data))
  .catch(err => console.error(err));
```

### Form & Card Validation
Validate forms easily using standard validation harnesses (includes credit card Luhn validation):
```javascript
// Check credit cards (Visa, MasterCard, Amex, Discover, JCB, UnionPay)
const isAmexValid = SA.validation.isCardNumber('378282246310005'); // returns true/false

// Validate entire form
const isValid = SA.validation.validateForm('#sa-checkout-form', {
    card_number: ['required', 'card'],
    email: ['required', 'email']
});
```

### Elite Components & Interactive Controllers (New!)

#### 1. Dynamic Clipboard Helper (`SA.clipboard`)
Perform zero-dependency, fallback-safe copying of code or layout elements:
```javascript
SA.clipboard.copy('Hello World from SA!')
  .then(() => console.log('Copied successfully!'))
  .catch(err => console.error(err));
```

#### 2. Interactive Modals Controller (`SA.modal`)
Dynamically manage overlays with close actions and backdrop click bindings:
```javascript
// Programmatically open and close modal overlays
SA.modal.open('info-modal');
SA.modal.close('info-modal');

// Dismiss modal when clicking backdrop
SA.modal.bindBackdrop('info-modal');
```

#### 3. Dropdowns Controller (`SA.dropdown`)
Easily manage custom dropdown popups:
```javascript
// Toggle active dropdown state
SA.dropdown.toggle('my-dropdown');

// Dismiss dropdown when clicking anywhere outside it
SA.dropdown.bindClickOutside('my-dropdown');
```

#### 4. Theme Manager (`SA.theme`)
Dynamic dark/light mode toggler with persistent browser storage:
```javascript
// Load and apply the saved theme choice (e.g. inside document head)
SA.theme.init();

// Toggle active light/dark state
var activeTheme = SA.theme.toggle(); // returns 'dark' or 'light'
```
