# Events Module

Shoaib Aftab JS provides easy-to-use methods for handling events.

### `SA.events.on(element, event, handler)`
Attaches an event listener to an element.

**Example:**
```javascript
SA.events.on('#submit-btn', 'click', function(e) {
  e.preventDefault();
  console.log('Form submitted');
});
```

### `SA.events.off(element, event, handler)`
Removes an event listener from an element.

**Example:**
```javascript
function handleClick() { console.log('Clicked'); }
SA.events.on('#btn', 'click', handleClick);
SA.events.off('#btn', 'click', handleClick);
```

### `SA.events.trigger(element, eventType, detail)`
Triggers a custom event on an element.

**Example:**
```javascript
SA.events.trigger('#my-div', 'custom:refresh', { id: 123 });
```
