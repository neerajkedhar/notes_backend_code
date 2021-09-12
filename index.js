const http = require('http');
const port = process.env.PORT || 5000
const app = require('./app');

const server  = http.createServer(app);
server.listen(8080,console.log("Server running..."));