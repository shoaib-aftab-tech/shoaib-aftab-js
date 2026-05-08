<div align="center">
  <img src="https://shoaibaftab.com/images/logo.svg" alt="Shoaib Aftab Tech Logo" width="300">
  <h1>Shoaib Aftab JS Framework</h1>
  <p><strong>A pure Vanilla JavaScript Framework with zero dependencies. 100% self-contained.</strong></p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-success.svg)](https://opensource.org/licenses/MIT)
  [![Version](https://img.shields.io/npm/v/@shoaibaftabtech/js)](https://www.npmjs.com/package/@shoaibaftabtech/js)
</div>

---
## About Shoaib Aftab Tech
💻 **Specializing in Custom Development:** We build future-proof software, intuitive mobile apps, professional websites, scalable e-commerce platforms, and API development (WhatsApp Business API).
🔧 **Your End-to-End Partner:** From initial concept to successful scaling, we provide complete digital solutions for your business.
🤝 **Ready to Build & Grow?** Let's connect to discuss your project and strategic goals.

Visit us at: [shoaibaftab.com](https://shoaibaftab.com)
Email: [tech@shoaibaftab.com](mailto:tech@shoaibaftab.com)
Facebook: [Shoaib Aftab Tech](https://facebook.com/ShoaibAftabTech)

---

## Introduction
Shoaib Aftab JS is a powerful, utility-driven **Vanilla JavaScript Framework** built with absolutely **zero dependencies**. It strictly adheres to ECMAScript (W3C) specifications. It provides a robust set of 150+ functions under the global `SA` namespace, enabling DOM manipulation, AJAX, validation, string manipulation, and more, all without relying on third-party libraries.

## Installation

### 1. NPM
```bash
npm install @shoaibaftabtech/js
```

### 2. jsDelivr CDN (NPM)
```html
<script src="https://cdn.jsdelivr.net/npm/@shoaibaftabtech/js@latest/dist/shoaib-aftab.min.js"></script>
```

### 3. jsDelivr CDN (GitHub)
```html
<script src="https://cdn.jsdelivr.net/gh/ShoaibAftabTech/shoaib-aftab-js@main/dist/shoaib-aftab.min.js"></script>
```

### 4. Unpkg CDN
```html
<script src="https://unpkg.com/@shoaibaftabtech/js/dist/shoaib-aftab.min.js"></script>
```

## Usage

```javascript
// Example: DOM Manipulation
SA.dom.select('.my-button').addEventListener('click', () => {
  SA.dom.addClass(SA.dom.byId('my-modal'), 'sa-visible');
});

// Example: AJAX GET Request
SA.ajax.getJSON('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## Features
- **Zero Dependencies:** 100% self-contained Vanilla JS.
- **Global Namespace (`SA.`):** Prevents global scope pollution.
- **Comprehensive Utility Set:** DOM, AJAX, Storage, Strings, Arrays, Objects, Dates, and Validation.
- **Lightweight & Fast:** Built for modern browsers.

## Documentation
See the `docs/index.md` file for full documentation, complete with detailed examples and instructions.
