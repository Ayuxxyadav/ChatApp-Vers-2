import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '@/hooks/useSockets';
import { ArrowLeft, Send, ShieldCheck, Wifi, WifiOff } from 'lucide-react';

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  
  // Custom Hook Se Socket Methods Receive Karo
  const { messages, isConnected, sendMessage } = useSocket(roomId || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/room')}
              className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="font-bold text-base text-slate-100 flex items-center gap-2">
                Room: <span className="text-purple-400 font-mono">{roomId}</span>
              </h1>
              <span className="text-xs text-slate-500">Anonymous Chugli Zone</span>
            </div>
          </div>

          {/* Connection Indicator */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs">
            {isConnected ? (
              <>
                <Wifi size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">Live</span>
              </>
            ) : (
              <>
                <WifiOff size={14} className="text-red-400" />
                <span className="text-red-400 font-medium">Connecting...</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Message Feed Section */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-y-auto space-y-4 my-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-20 border border-dashed border-slate-800/80 rounded-3xl">
            <ShieldCheck size={40} className="mb-3 text-purple-500/50" />
            <p className="font-medium text-slate-400">You joined the room.</p>
            <p className="text-xs text-slate-600 mt-1">Start chatting anonymously! No message history is saved on client.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="flex flex-col bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl max-w-md w-fit shadow-md backdrop-blur-md"
            >
              <p className="text-sm text-slate-100 leading-relaxed break-words">{msg.message}</p>
              <span className="text-[10px] text-purple-400/80 font-mono self-end mt-1">
                Received
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Message Input Bar */}
      <footer className="border-t border-slate-800 bg-slate-950 p-4 sticky bottom-0">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder={isConnected ? "Type your chugli message..." : "Connecting to server..."}
            disabled={!isConnected}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-purple-500 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-2xl text-sm focus:outline-none transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!isConnected || !inputText.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 disabled:opacity-50 text-white px-5 py-3 rounded-2xl transition shadow-lg shadow-purple-600/20 font-semibold flex items-center justify-center gap-1 shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </footer>

    </div>
  );
};

export default ChatRoom;