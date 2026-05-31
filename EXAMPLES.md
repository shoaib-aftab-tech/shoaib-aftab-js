<div align="center">
  <br>
  <strong>🎯 Official Live Examples:</strong> <a href="https://shoaibaftab.com/shoaib-aftab-js#examples">https://shoaibaftab.com/shoaib-aftab-js#examples</a>
  <br><br>
</div>

# Shoaib Aftab JS Framework - Practical Examples

This document provides ready-to-use, copy-pasteable HTML/JS snippets that demonstrate the power of the **Shoaib Aftab JS Framework**. All examples are fully functional and rely on 0 external JavaScript dependencies.

---

## 1. The Interactive Dashboard (Two-Way Binding)
This example demonstrates how to create a highly reactive dashboard where inputs immediately update the UI, utilizing `sa-model`, `sa-text`, and conditional `sa-show` rendering.

```html
<!-- Include JS Framework -->
<script src="dist/shoaib-aftab.min.js"></script>

<!-- The UI Container -->
<div id="app" class="dashboard-container">
    <h2>Welcome back, <span sa-text="user.name"></span>!</h2>
    
    <!-- Conditional Rendering -->
    <div sa-show="user.isAdmin" style="background: red; color: white; padding: 10px;">
        Warning: You are in Admin Mode.
    </div>

    <!-- Two-Way Binding -->
    <label>Edit Profile Name:</label>
    <input type="text" sa-model="user.name">

    <!-- Counter Example -->
    <p>Total Clicks: <span sa-text="clicks"></span></p>
    <button onclick="appState.clicks++">Click Me</button>
</div>

<!-- Initialization Script -->
<script>
    const appState = SA.Store.createState({
        user: {
            name: "Shoaib",
            isAdmin: true
        },
        clicks: 0
    });

    // Bind state to the #app container
    SA.Store.initReactivity(document.getElementById('app'), appState);
</script>
```

---

## 2. Advanced XSS Protection Demonstration
This example proves the strength of the built-in Enterprise DOM Sanitizer. It attempts to inject a malicious script via `sa-html`. The framework automatically neutralizes it before it reaches the DOM.

```html
<!-- Include JS Framework -->
<script src="dist/shoaib-aftab.min.js"></script>

<div id="security-demo">
    <h3>User Bio (Secure Render)</h3>
    <!-- The framework strips the dangerous script tag but keeps the bold text -->
    <div sa-html="userBio" style="border: 1px solid #ccc; padding: 10px;"></div>
</div>

<script>
    const securityState = SA.Store.createState({
        // Malicious payload simulating a database injection attack
        userBio: "Hello, I am a developer. <script>alert('You have been hacked!');<\/script> <b>Hire me!</b>"
    });

    SA.Store.initReactivity(document.getElementById('security-demo'), securityState);
</script>
```

---

## 3. The Single Page Application (SPA) Router
A complete example of building an ultra-fast website without page reloads using the native History API.

```html
<!-- Include JS Framework -->
<script src="dist/shoaib-aftab.min.js"></script>

<!-- Navigation Menu -->
<nav>
    <a sa-route="/">Home</a>
    <a sa-route="/about">About Us</a>
    <a sa-route="/contact">Contact</a>
</nav>

<!-- The Router View Injection Point -->
<main sa-view style="margin-top: 20px; padding: 20px; border: 1px dashed #666;"></main>

<script>
    // 1. Define the pages
    const pages = {
        '/': `
            <h1>Home Page</h1>
            <p>Welcome to the fastest SPA architecture.</p>
        `,
        '/about': `
            <h1>About Us</h1>
            <p>We build enterprise zero-dependency frameworks.</p>
        `,
        '/contact': `
            <h1>Contact Us</h1>
            <a href="mailto:tech@shoaibaftab.com">tech@shoaibaftab.com</a>
        `
    };

    // 2. Initialize the Router
    SA.Router.initRouter(pages);
</script>
```

---

## 4. Dynamic Class Binding
Using `sa-bind:class` to change CSS classes dynamically based on mathematical or logical conditions.

```html
<!-- Include JS Framework -->
<script src="dist/shoaib-aftab.min.js"></script>

<style>
    .danger-box { background-color: red; color: white; padding: 20px; }
    .safe-box { background-color: green; color: white; padding: 20px; }
</style>

<div id="monitoring-app">
    <!-- Class changes dynamically based on the serverLoad value -->
    <div sa-bind:class="{ 'danger-box': serverLoad >= 90, 'safe-box': serverLoad < 90 }">
        Current Server Load: <span sa-text="serverLoad"></span>%
    </div>
    
    <button onclick="monitorState.serverLoad = 95">Simulate Spike</button>
    <button onclick="monitorState.serverLoad = 40">Simulate Cooldown</button>
</div>

<script>
    const monitorState = SA.Store.createState({
        serverLoad: 40
    });

    SA.Store.initReactivity(document.getElementById('monitoring-app'), monitorState);
</script>
```
