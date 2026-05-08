# AJAX Module

Simplify your HTTP requests using the fetch-based AJAX module.

### `SA.ajax.get(url, headers)`
Performs a GET request and parses the JSON response.

**Example:**
```javascript
SA.ajax.get('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### `SA.ajax.post(url, data, headers)`
Performs a POST request with JSON data.

**Example:**
```javascript
SA.ajax.post('https://api.example.com/save', { name: 'Shoaib' })
  .then(response => console.log('Saved:', response))
  .catch(err => console.error(err));
```
