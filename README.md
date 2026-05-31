<div align="center">
  <a href="https://shoaibaftab.com">
    <img src="https://shoaibaftab.com/images/logo.png" alt="Shoaib Aftab Tech Logo" width="300">
  </a>
  <br><br>
  <h1>🚀 Shoaib Aftab JS Framework (V2)</h1>
  <p><strong>The Ultimate, 0-Dependency, Ultra-Secure, Enterprise JavaScript Framework</strong></p>
  
  <p>
    <a href="https://www.npmjs.com/package/@shoaibaftabtech/js"><img src="https://img.shields.io/npm/v/@shoaibaftabtech/js" alt="Version"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-success.svg" alt="License: MIT"></a>
    <a href="#"><img src="https://img.shields.io/badge/dependencies-0-success?style=flat-square" alt="Dependencies"></a>
    <a href="#"><img src="https://img.shields.io/badge/Security-OWASP_Compliant-success?style=flat-square" alt="Security"></a>
  </p>
</div>

<br>

Shoaib Aftab JS is a next-generation, vanilla JavaScript framework designed for enterprise scale. Built completely from scratch with the philosophy of **Absolute Zero Dependency**, it guarantees maximum performance (React-level microtask batching), unparalleled security (Prototype Pollution and XSS protection), and absolute privacy compliance.

## ✨ Why Shoaib Aftab JS?

Unlike Vue, React, or Angular, this framework requires no virtual DOM, no complex build steps, and no Webpack configurations. It attaches reactivity directly to the real DOM using powerful native Web APIs.

- **0% Dependency:** No Node_modules required for the end user. Works flawlessly on shared hosting.
- **Deep Proxy Reactivity:** Automatically tracks nested object changes and updates the DOM instantly.
- **Microtask Batching:** Multiple state updates are batched together via `queueMicrotask` to ensure 60fps performance and prevent layout thrashing.
- **Zero-Dependency SPA Router:** Build fully functional Single Page Applications using the native History API without refreshing the page.
- **Enterprise Security:** Hardened against Prototype Pollution (`__proto__` injection) and Advanced XSS attacks (custom rigorous DOM Sanitizer blocking SVG/Math/data-uris).

## 📦 Installation

We offer three ways to integrate the framework.

### Option 1: Direct Download (Maximum Security / Air-gapped)
Download the `dist/shoaib-aftab.min.js` file and include it directly at the bottom of your HTML `<body>`.
```html
<script src="./path/to/shoaib-aftab.min.js"></script>
```

### Option 2: NPM / Yarn
```bash
npm install @shoaibaftabtech/js
```
```javascript
import { Store, Router, SA } from '@shoaibaftabtech/js';
```

### Option 3: CDN (Development Only)
```html
<script src="https://cdn.jsdelivr.net/npm/@shoaibaftabtech/js/dist/shoaib-aftab.min.js"></script>
```

## 🚀 Core Features

### 1. Two-Way Data Binding (`sa-model`)
Automatically sync input fields with your state.
```html
<input type="text" sa-model="user.name" placeholder="Enter name">
<p>Hello, <span sa-text="user.name"></span>!</p>
```

### 2. Deep Reactivity Initialization
Initialize your state once, and the framework takes care of the rest.
```javascript
const state = SA.Store.createState({
    user: { name: 'Shoaib' },
    isActive: true
});
SA.Store.initReactivity(document.body, state);
```

### 3. SPA Routing
Create ultra-fast Single Page Applications natively.
```html
<nav>
  <a sa-route="/home">Home</a>
  <a sa-route="/dashboard">Dashboard</a>
</nav>
<div sa-view></div>

<script>
  SA.Router.initRouter({
    '/home': '<h1>Welcome Home</h1>',
    '/dashboard': '<h1>Your Dashboard</h1>'
  });
</script>
```

### 4. Advanced Security (`sa-html`)
When rendering dynamic HTML, our framework strictly sanitizes it against XSS.
```html
<!-- Malicious scripts inside user.bio are automatically stripped! -->
<div sa-html="user.bio"></div>
```

## 🔒 Security & Privacy (Enterprise Grade)

We built this framework for banking, healthcare, and high-security sectors:
1. **Prototype Pollution Protection:** Our internal `resolvePath` and `setPath` functions strictly block `__proto__`, `constructor`, and `prototype` modifications, a rarity in lightweight frameworks.
2. **DOM Sanitizer:** Automatically strips `<script>`, `<iframe>`, `<svg>`, `<math>`, and dangerous URI payloads (`javascript:`, `data:`) from attributes.
3. **No `eval()`:** We utilize secure string parsing for class and attribute bindings instead of dangerous `new Function()` calls.

## 🛠 Project Architecture

The source files are highly modular:
- `modules/reactivity.js` (Proxy, Batching, DOM Binding)
- `modules/router.js` (History API SPA Router)
- `modules/security.js` (DOMPurify alternative)
- `modules/validation.js` (Form Rules)
- `modules/ajax.js` (Fetch Wrappers)

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for guidelines. **Note: All PRs must adhere to the 0-dependency rule.**

## 📄 License

This project is licensed under the [MIT License](./LICENSE) - see the LICENSE file for details.

---

## 🏢 About Shoaib Aftab Tech

💻 **Specializing in Custom Development:** We build future-proof software, intuitive mobile apps, professional websites, scalable e-commerce platforms, and API development (WhatsApp Business API).

🔧 **Your End-to-End Partner:** From initial concept to successful scaling, we provide complete digital solutions for your business.

🤝 **Ready to Build & Grow?** Let's connect to discuss your project and strategic goals.

### 🌐 Connect With Us
- **Visit us at:** [shoaibaftab.com](https://shoaibaftab.com)
- **Email:** [tech@shoaibaftab.com](mailto:tech@shoaibaftab.com)
- **Facebook:** [Shoaib Aftab Tech](https://facebook.com/ShoaibAftabTech)

<div align="center">
  <br>
  <em>Developed with excellence by <a href="https://shoaibaftab.com">Shoaib Aftab Tech</a></em>
</div>
