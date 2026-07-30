import { WebSocketServer, WebSocket } from 'ws';
import Redis from "ioredis";
import { prisma } from './database/prisma/db';

const pub = new Redis();
const sub = new Redis();

const wss = new WebSocketServer({ port: 8080 });
const users: User[] = [];

// jab bhi Redis pe kisi channel pe message aaye, apne local connected users ko bhejo
sub.on("message", (channel, message) => {
  const data = JSON.parse(message); // { type: "chat", message, roomId }
  users.forEach(user => {
    if (user.rooms.includes(data.roomId)) {
      user.ws.send(JSON.stringify(data));
    }
  });
});

wss.on('connection', function connection(ws, request) {
  // ... existing auth logic same ...

  ws.on('message', async function message(data) {
    const parsedData = JSON.parse(data as unknown as string);

    if (parsedData.type === "join_room") {
      const roomId = String(parsedData.roomId);
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(roomId);

      // is server instance ne pehli baar is room ko subscribe kiya? tab hi subscribe call karo
      await sub.subscribe(`room:${roomId}`);
    }

    if (parsedData.type === "chat") {
      const roomId = String(parsedData.roomId);
      await prisma.chat.create({
        data: { roomId, message: parsedData.message, userId: String(userId) }
      });

      // ab seedha users array pe loop nahi — Redis pe publish karo
      await pub.publish(`room:${roomId}`, JSON.stringify({
        type: "chat",
        message: parsedData.message,
        roomId
      }));
    }
  });
});