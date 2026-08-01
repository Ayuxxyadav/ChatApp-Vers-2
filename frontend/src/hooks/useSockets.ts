import { useEffect, useRef, useState, useCallback } from 'react';

interface ChatMessage {
  type: string;
  roomId: string;
  message: string;
  userId?: string;
}

export const useSocket = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !roomId) return;

    // 1. WebSocket Connection establish karo URL params me token ke saath
    const ws = new WebSocket(`ws://localhost:8080?token=${encodeURIComponent(token)}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket Server');
      setIsConnected(true);

      // 2. Connection open hote hi "join_room" event bhejo
      const joinPayload = {
        type: 'join_room',
        roomId: String(roomId),
      };
      ws.send(JSON.stringify(joinPayload));
    };

    ws.onmessage = (event) => {
      // Backend se aane wali "pong" ignore karein
      if (event.data === 'pong') return;

      try {
        const data: ChatMessage = JSON.parse(event.data);
        if (data.type === 'chat' && data.roomId === roomId) {
          setMessages((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('❌ Disconnected from WebSocket');
      setIsConnected(false);

      // Cleanup: Leave room event send karne ki koshish agar socket active hai
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'leave_room', roomId: String(roomId) }));
      }
    };

    // Unmount par connection properly close karo
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'leave_room', roomId: String(roomId) }));
        ws.close();
      }
    };
  }, [roomId]);

  // 3. Chat Message Send karne ka function
  const sendMessage = useCallback((messageText: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error('Socket is not connected');
      return;
    }

    const chatPayload = {
      type: 'chat',
      roomId: String(roomId),
      message: messageText.trim(),
    };

    socketRef.current.send(JSON.stringify(chatPayload));
  }, [roomId]);

  return { messages, isConnected, sendMessage };
};