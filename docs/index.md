# Shoaib Aftab JS (Framework) - Documentation

## Introduction
A pure Vanilla JavaScript Framework with **zero dependencies**. This documentation provides examples to help you leverage the `SA` global object for robust application development.

## Installation

### 1. Using NPM (Recommended)
```bash
npm install @shoaib-aftab/js
```
```javascript
import SA from '@shoaib-aftab/js';
```

### 2. Using CDN
```html
<script src="https://unpkg.com/@shoaib-aftab/js/dist/shoaib-aftab.min.js"></script>
```

---

## Code Examples

### 1. DOM Manipulation (`SA.dom`)
Easily select and manipulate DOM elements without jQuery.

```javascript
// Select elements
const header = SA.dom.byId('main-header');
const buttons = SA.dom.selectAll('.sa-btn');

// Modify classes
SA.dom.addClass(header, 'sa-bg-primary-500');
SA.dom.removeClass(header, 'sa-hidden');
SA.dom.toggleClass(header, 'sa-active');

// Modify content
SA.dom.html(header, '<h1>Welcome to Shoaib Aftab JS</h1>');
SA.dom.text(SA.dom.byId('subtitle'), 'Zero Dependencies!');

// Create and Append
const newDiv = SA.dom.create('div', { class: 'sa-alert sa-alert-info' }, 'This is a new alert!');
SA.dom.append(document.body, newDiv);
```

### 2. Events (`SA.events`)
Handle events cleanly.

```javascript
const btn = SA.dom.byId('submit-btn');

// Add Event Listener
SA.events.on(btn, 'click', (e) => {
  e.preventDefault();
  console.log('Button clicked!');
});

// Run once on Document Ready
SA.events.ready(() => {
  console.log('DOM is fully loaded and ready!');
});

// Event Delegation
SA.events.delegate(document.body, '.sa-btn-delete', 'click', (e, target) => {
  console.log('Delete button clicked:', target);
});
```

### 3. AJAX Requests (`SA.ajax`)
Fetch data easily using Promises.

```javascript
// GET Request
SA.ajax.getJSON('https://jsonplaceholder.typicode.com/posts/1')
  .then(post => {
    console.log('Post Title:', post.title);
  })
  .catch(err => {
    console.error('Failed to fetch:', err);
  });

// POST Request
const newPost = { title: 'SA JS', body: 'Zero Dependencies Framework', userId: 1 };
SA.ajax.postJSON('https://jsonplaceholder.typicode.com/posts', newPost)
  .then(response => console.log('Created:', response))
  .catch(err => console.error(err));
```

### 4. Validation (`SA.validate`)
Built-in validation for forms and inputs.

```javascript
const emailInput = 'test@example.com';

if (SA.validate.email(emailInput)) {
  console.log('Valid email!');
} else {
  console.log('Invalid email format.');
}

// Check if a string is a strong password
const isStrong = SA.validate.password('MyS3cr3tP@ss!', { minLength: 8, requireSpecial: true });
console.log('Is password strong?', isStrong);
```

### 5. String & Array Utilities
```javascript
// Strings
const slug = SA.string.slugify('Hello World from SA JS!');
console.log(slug); // "hello-world-from-sa-js"

const camel = SA.string.toCamelCase('hello-world');
console.log(camel); // "helloWorld"

// Arrays
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = SA.array.unique(numbers);
console.log(unique); // [1, 2, 3, 4, 5]

const shuffled = SA.array.shuffle([1, 2, 3, 4, 5]);
console.log(shuffled);
```

---

## API Reference Summary

- **`SA.dom`**: `.select()`, `.byId()`, `.create()`, `.append()`, `.addClass()`, `.css()`, etc.
- **`SA.events`**: `.on()`, `.off()`, `.ready()`, `.delegate()`, `.trigger()`
- **`SA.ajax`**: `.get()`, `.post()`, `.getJSON()`, `.upload()`
- **`SA.storage`**: `.set()`, `.get()`, `.remove()`, `.clear()`
- **`SA.url`**: `.parse()`, `.getParam()`, `.redirect()`
- **`SA.string`**: `.slugify()`, `.toCamelCase()`, `.capitalize()`
- **`SA.array`**: `.unique()`, `.shuffle()`, `.chunk()`
- **`SA.date`**: `.format()`, `.diff()`, `.age()`
- **`SA.validate`**: `.email()`, `.url()`, `.phone()`, `.required()`
- **`SA.utils`**: `.debounce()`, `.throttle()`, `.uuid()`
