
# SQL Injection Detection Middleware for Express.js
## Overview

This is a simple SQL injection detection middleware for Express.js applications. It aims to identify and block SQL injection attempts in both GET and POST requests.

## Installation :
Copy the middleware file `index.js` into your project directory.

## Usage:
First, import the middleware into your Express application.

```const sqlInjectionDetector = require('./index');```

 Then, add the middleware to your Express app:
```const express = require('express');
const app = express();

app.use(sqlInjectionDetector);

```
## How it Works
This middleware checks for common SQL injection patterns in both the query parameters and the body of incoming HTTP requests. If a potential SQL injection is detected, the middleware responds with a 400 status code and a JSON message indicating the detection.
## Example Patterns
  - OR, AND combined with quotes
  - SELECT, UNION
  - Comment patterns like --
  - Stack queries like ;
  - Hex-encoded characters
  - and more...
## Testing
You can test this middleware by sending HTTP requests with SQL-injection-like payloads:

  - Using curl
  - Using Postman
### For example,
`curl "http://localhost:3000/test?param='1' OR "1"`

This should result in a 400 status code response.
## Limitations

  - Not all SQL injection patterns may be detected.
  - May produce false positives.
  - Should not replace secure coding practices like using parameterized queries.
## Contributing
This project is open for contributions. Feel free to fork and submit a pull request.
