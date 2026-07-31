import { WebSocketServer, WebSocket } from 'ws';
import Redis from "ioredis";
import jwt from "jsonwebtoken";
import { prisma } from '../database/prisma/db'; // apna actual prisma import path daal dena

const JWT_SECRET = process.env.JWT_SECRET || "";

interface User {
  userId: string;
  ws: WebSocket;
  rooms: string[];
}

const users: User[] = [];
const roomSubscriberCount = new Map<string, number>();

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string") return null;
    if (!decoded || !decoded.userId) return null;
    return decoded.userId;
  } catch (err) {
    // invalid/expired token - verify throw karta hai, catch zaroori;
    console.log('problem occurs while decoding token');
    return null 
    
  }
}

export function startWsServer() {
  const pub = new Redis();
  const sub = new Redis();
  const wss = new WebSocketServer({ port: 8080 });

  pub.on("error", (err) => console.error("Redis pub error:", err));
  sub.on("error", (err) => console.error("Redis sub error:", err));

  async function subscribeToRoom(roomId: string) {
    const count = roomSubscriberCount.get(roomId) || 0;
    roomSubscriberCount.set(roomId, count + 1);
    if (count === 0) {
      await sub.subscribe(`room:${roomId}`);
    }
  }

  async function unsubscribeFromRoom(roomId: string) {
    const count = roomSubscriberCount.get(roomId) || 0;
    if (count <= 1) {
      roomSubscriberCount.delete(roomId);
      await sub.unsubscribe(`room:${roomId}`);
    } else {
      roomSubscriberCount.set(roomId, count - 1);
    }
  }

  // Redis se aane wale har message ko is instance ke local connected users tak deliver karna
  sub.on("message", (channel, message) => {
    console.log("[redis] message on channel:", channel, "raw:", message);
    const data = JSON.parse(message);
    console.log("[redis] currently connected users' rooms:", users.map(u => ({ userId: u.userId, rooms: u.rooms })));
    users.forEach(user => {
      if (user.rooms.includes(data.roomId)) {
        console.log("[redis] delivering to userId:", user.userId);
        user.ws.send(JSON.stringify(data));
      }
    });
  });

  wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
      ws.close();
      return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    // token invalid/missing -> connection turant close, user aage kuch nahi kar payega
    if (userId == null) {
      ws.close();
      return;
    }

    users.push({ userId, ws, rooms: [] });

    ws.on('message', async function message(data) {
      let parsedData: any;
      try {
        parsedData = JSON.parse(data as unknown as string);
      } catch (err) {
        console.error("Invalid JSON:", err);
        return;
      }

      if (parsedData.type === "join_room") {
        const roomId = String(parsedData.roomId);
        const user = users.find(x => x.ws === ws);
        if (!user) return;
        if (!user.rooms.includes(roomId)) {
          user.rooms.push(roomId);
        }
        await subscribeToRoom(roomId);
        console.log("[join_room] userId:", userId, "joined roomId:", roomId, "(type:", typeof roomId, ")");
      }

      if (parsedData.type === "leave_room") {
        const roomId = String(parsedData.roomId);
        const user = users.find(x => x.ws === ws);
        if (!user) return;
        user.rooms = user.rooms.filter(r => r !== roomId);
        await unsubscribeFromRoom(roomId);
      }

      if (parsedData.type === "chat") {
        const roomId = String(parsedData.roomId);
        console.log("[chat] received:", { roomId, message: parsedData.message, userId });

        try {
          await prisma.chat.create({
            data: { roomId, message: parsedData.message, userId: String(userId) }
          });
          console.log("[chat] DB save success");
        } catch (dbErr) {
          console.error("[chat] DB save FAILED:", dbErr);
          return; // yahan se aage nahi badhenge agar DB fail hui
        }

        await pub.publish(`room:${roomId}`, JSON.stringify({
          type: "chat",
          message: parsedData.message,
          roomId
        }));
        console.log("[chat] published to redis channel room:" + roomId);
      }
    });

    ws.on('close', () => {
      const index = users.findIndex(u => u.ws === ws);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });

    ws.send("pong");
  });

  console.log("WS server running on port 8080");
}