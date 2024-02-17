const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // 当有新的 WebSocket 连接建立时的处理逻辑
  console.log('WebSocket连接已建立');

  // 发送指定内容
  setInterval(() => {
    const val = `+0${(Math.random() * 10).toFixed(3)}kg`
    // const val = `+0020.00kg`
    console.log(`发送到消息：${val}`);
    ws.send(val);
  }, 500)

  // 监听 WebSocket 接收消息
  ws.on('message', (message) => {
    console.log(`接收到消息：${message}`);
  });

  // 监听 WebSocket 连接关闭
  ws.on('close', () => {
    console.log('WebSocket连接已关闭');
  });
});

// 启动 HTTP 服务器
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`服务器正在监听端口 ${PORT}`);
});
