# DOM Manipulation

Shoaib Aftab JS makes DOM selection and event handling extremely simple.

## Selection

### `SA.dom.$(selector)`
Selects the first matching element in the DOM (wrapper for `querySelector`).

**Example:**
```javascript
const header = SA.dom.$('.site-header');
console.log(header);
```

### `SA.dom.$$(selector)`
Selects all matching elements (wrapper for `querySelectorAll`).

**Example:**
```javascript
const items = SA.dom.$$('.list-item');
items.forEach(item => {
  item.style.color = 'red';
});
```

## Classes

### `SA.dom.addClass(element, className)`
Adds a class to a specific element. You can pass either a DOM element or a string selector.

**Example:**
```javascript
SA.dom.addClass('#my-div', 'sa-bg-primary-500');
```

### `SA.dom.removeClass(element, className)`
Removes a class.

**Example:**
```javascript
SA.dom.removeClass('#my-div', 'sa-hidden');
```

### `SA.dom.toggleClass(element, className)`
Toggles a class.

**Example:**
```javascript
SA.dom.toggleClass('#my-div', 'active');
```

## Events

### `SA.events.on(element, event, handler)`
Attaches an event listener.

**Example:**
```javascript
SA.events.on('#submit-btn', 'click', function(e) {
  e.preventDefault();
  console.log('Form submitted');
});
```
