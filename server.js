const express = require('express');
const next = require('next');
const http = require('http');
const setupSocketServer = require('./lib/socketServer');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  // ติดตั้ง Socket.IO บนเซิร์ฟเวอร์
  setupSocketServer(httpServer);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

