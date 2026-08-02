import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomIdInput, setRoomIdInput] = useState('');
  const [error, setError] = useState('');

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const trimmedId = roomIdInput.trim();

    if (!trimmedId) {
      setError('Please enter a valid Room ID!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please sign in first to join a room.');
      setTimeout(() => navigate('/auth/signin'), 1200);
      return;
    }

    navigate(`/room/${trimmedId}`);
  };

  return (
    <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 hover:border-pink-500/30 p-6 md:p-8 rounded-3xl transition-all duration-300 shadow-2xl shadow-pink-950/10">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-600/20 transition-all duration-500" />

      <div className="flex items-center gap-2 mb-3 text-pink-400">
        <span className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
          <LogIn size={16} />
        </span>
        <span className="text-xs uppercase tracking-wider font-bold">Join Room</span>
      </div>


      <form onSubmit={handleJoinRoom} className="space-y-4">
        <div>
          <label htmlFor="roomId" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Enter room ID
          </label>
          <input
            id="roomId"
            type="text"
            placeholder="e.g. 597e6624-08d7-48a6-99f6-d800d39e985c"
            value={roomIdInput}
            onChange={(e) => {
              setRoomIdInput(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-4 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-pink-500/80 focus:ring-2 focus:ring-pink-500/20 transition-all text-xs font-mono tracking-wide"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <span>⚠️</span> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!roomIdInput.trim()}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-pink-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          <span>Connect to Room</span>
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;