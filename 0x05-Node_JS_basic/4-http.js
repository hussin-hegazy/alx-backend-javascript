const http = require('http');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const server = http.createServer();

server.on('request', (_, response) => {
  const message = 'Hello Holberton School!';

  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Length', Buffer.byteLength(message));
  response.statusCode = 200;
  response.end(message);
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server running at -> http://${SERVER_HOST}:${SERVER_PORT}/`);
});

module.exports = server;
