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

    // Direct navigate to chat room (useSocket hook automatically handles WebSocket connection & join_room event)
    navigate(`/room/${trimmedId}`);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
      
      {/* Badge */}
      <div className="flex items-center gap-2 mb-2 text-pink-400">
        <LogIn size={18} />
        <span className="text-xs uppercase tracking-widest font-bold">Existing Room</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-1">Join a Room</h2>
      <p className="text-slate-400 text-sm mb-6">
        Enter the Room ID shared by your friend to jump straight into the conversation.
      </p>

      {/* Form */}
      <form onSubmit={handleJoinRoom} className="space-y-5">
        <div>
          <label htmlFor="roomId" className="block text-sm font-medium text-slate-300 mb-2">
            Room ID
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
            className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition text-sm font-mono"
          />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!roomIdInput.trim()}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg shadow-pink-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Join Room <ArrowRight size={18} />
        </button>
      </form>

    </div>
  );
};

export default JoinRoom;