/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import setupSocketServer from './lib/socketServer.js'; // เพิ่มนามสกุล `.js`

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // ติดตั้ง Socket.IO บนเซิร์ฟเวอร์
  setupSocketServer(server);

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});

