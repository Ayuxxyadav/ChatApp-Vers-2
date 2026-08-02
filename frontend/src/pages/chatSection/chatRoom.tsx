import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '@/hooks/useSockets';
import { 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Copy, 
  Check, 
  Lock, 

} from 'lucide-react';

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  // Custom Hook Se Socket Methods Receive Karo
  const { messages, isConnected, sendMessage } = useSocket(roomId || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Copy Room ID Handler
  const handleCopyRoomId = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-purple-900/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-10 w-80 h-80 bg-indigo-900/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-50 p-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back & Room Info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/room')}
              className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all shadow-inner shrink-0"
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </button>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm md:text-base text-white tracking-tight flex items-center gap-1.5 truncate">
                  <span>Room:</span>
                  <span className="text-purple-400 font-mono font-medium truncate">{roomId}</span>
                </h1>
                
                {/* Room ID Copy Button */}
                <button
                  onClick={handleCopyRoomId}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-purple-300 rounded-lg border border-slate-800 transition-all shrink-0"
                  title="Copy Room ID"
                >
                  {copied ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Lock size={10} className="text-purple-400/80" /> Encrypted Anonymous Zone
              </span>
            </div>
          </div>

          {/* Connection Indicator Tag */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs shrink-0 backdrop-blur-sm">
            {isConnected ? (
              <>
                <Wifi size={13} className="text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold tracking-wide text-[11px]">LIVE</span>
              </>
            ) : (
              <>
                <WifiOff size={13} className="text-red-400" />
                <span className="text-red-400 font-semibold tracking-wide text-[11px]">CONNECTING</span>
              </>
            )}
          </div>

        </div>
      </header>

      {/* Main Message Stream */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 overflow-y-auto space-y-4 my-2 relative z-10">
        {messages.length === 0 ? (
          <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800/80 rounded-3xl bg-slate-900/20 backdrop-blur-sm my-auto">
            <div className="p-3.5 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 mb-3">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-semibold text-slate-200 text-base">You Joined the Room</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
              Start chatting anonymously! Messages exist only in live memory and aren't permanently logged.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            // Check if message is sent by current user (if payload contains flags or handle accordingly)
            const isSelf = msg.isSelf || false;

            return (
              <div
                key={index}
                className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
              >
                <div
                  className={`max-w-[85%] md:max-w-md p-4 rounded-3xl backdrop-blur-md shadow-lg border transition-all ${
                    isSelf
                      ? 'bg-gradient-to-br from-purple-600/90 to-indigo-600/90 border-purple-500/30 text-white rounded-tr-xs'
                      : 'bg-slate-900/80 border-slate-800/80 text-slate-100 rounded-tl-xs hover:border-slate-700/60'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words font-normal">
                    {msg.message}
                  </p>
                  
                  <div
                    className={`flex items-center gap-1 text-[10px] font-mono mt-1.5 ${
                      isSelf ? 'text-purple-200/70 justify-end' : 'text-slate-500'
                    }`}
                  >
                    <span>Received</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Floating Message Input */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl p-4 sticky bottom-0 z-50">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={isConnected ? "Type your secret message..." : "Connecting to socket..."}
              disabled={!isConnected}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-slate-100 placeholder-slate-600 px-5 py-3.5 rounded-2xl text-sm focus:outline-none transition-all disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={!isConnected || !inputText.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white px-5 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-600/20 font-semibold flex items-center justify-center gap-2 shrink-0 border border-purple-500/20 hover:border-transparent"
          >
            <span className="hidden sm:inline text-sm">Send</span>
            <Send size={16} />
          </button>
        </form>
      </footer>

    </div>
  );
};

export default ChatRoom;