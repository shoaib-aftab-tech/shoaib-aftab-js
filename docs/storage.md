# Storage Module

Easily handle localStorage and sessionStorage with automatic JSON parsing/stringifying.

### Local Storage

```javascript
SA.storage.local.set('user', { name: 'Shoaib', id: 1 });

const user = SA.storage.local.get('user');
console.log(user.name); // 'Shoaib'

SA.storage.local.remove('user');
SA.storage.local.clear();
```

### Session Storage

```javascript
SA.storage.session.set('token', 'abc-123');

const token = SA.storage.session.get('token');
console.log(token); // 'abc-123'
```
