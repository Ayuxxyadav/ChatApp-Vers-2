import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sparkles, PlusCircle } from 'lucide-react';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  async function handleCreateRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Room name is required!');
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in! Redirecting...');
        setTimeout(() => navigate('/auth/signin'), 1500);
        return;
      }

      const response = await axios.post(
        'http://localhost:12000/api/v1/create-room',
        { name: name.trim() },
        { headers: { Authorization: token } }
      );

      const createdRoomId = response.data.roomId;
      setSuccess('Room created successfully! Joining now...');
      setName('');

      setTimeout(() => {
        if (createdRoomId) {
          navigate(`/room/${createdRoomId}`);
        }
      }, 1000);

    } catch (err: any) {
      console.error('Error creating room:', err);
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Error occurred while creating room.';

      if (status === 409 || message.toLowerCase().includes('unique')) {
        setError('This room name is already taken. Try something else!');
        setIsDuplicate(true);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 hover:border-purple-500/30 p-6 md:p-8 rounded-3xl transition-all duration-300 shadow-2xl shadow-purple-950/10">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-all duration-500" />

      <div className="flex items-center gap-2 mb-3 text-purple-400">
        <span className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Sparkles size={16} />
        </span>
        <span className="text-xs uppercase tracking-wider font-bold">Launch Room</span>
      </div>

    
  

      <form onSubmit={handleCreateRoom} className="space-y-4">
        <div>
          <label htmlFor="roomName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Room Title
          </label>
          <input
            id="roomName"
            type="text"
            placeholder="e.g. Late Night Devs, Secret Chill Zone..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsDuplicate(false);
              setError('');
            }}
            className={`w-full px-4 py-3.5 bg-slate-950/80 border rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none transition-all text-sm ${
              isDuplicate 
                ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/20' 
                : 'border-slate-800 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-medium text-center animate-in fade-in duration-200">
            ✨ {success}
          </div>
        )}

        <button
          disabled={loading || !name.trim()}
          type="submit"
          className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Initializing Room...</span>
            </>
          ) : (
            <>
              <PlusCircle size={18} />
              <span>Create & Launch</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;