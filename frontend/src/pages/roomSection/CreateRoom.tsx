import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

const CreateRoom = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleCreateRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Field validation check
    if (!name.trim()) {
      setError('Room name is required!');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You are not logged in! Please sign in first.');
        setTimeout(() => navigate('/auth/signin'), 1500);
        return;
      }

      // API Call with exact key 'name' and direct token header
      const response = await axios.post(
        'http://localhost:12000/api/v1/create-room',
        {
          name: name.trim(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSuccess('Room created successfully! Redirecting...');
      setName('');

      // Backend response se roomId extract kar navigation
      const createdRoomId = response.data.roomId || response.data.id;

      setTimeout(() => {
        if (createdRoomId) {
          navigate(`/room/${createdRoomId}`);
        } else {
          navigate('/room');
        }
      }, 1200);

    } catch (err: any) {
      console.error('Error creating room:', err);
      setError(err.response?.data?.message || 'Error occurred while creating room.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
      
      {/* Top Badge */}
      <div className="flex items-center gap-2 mb-2 text-purple-400">
        <Sparkles size={18} />
        <span className="text-xs uppercase tracking-widest font-bold">Start Conversation</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-1">Create a Room</h2>
      <p className="text-slate-400 text-sm mb-6">
        Enter a unique room name to start chatting anonymously with your squad.
      </p>

      {/* Form */}
      <form onSubmit={handleCreateRoom} className="space-y-5">
        <div>
          <label htmlFor="roomName" className="block text-sm font-medium text-slate-300 mb-2">
            Room Name
          </label>
          <input
            id="roomName"
            type="text"
            placeholder="e.g. Late Night Gossip, Gaming Squad..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
          />
        </div>

        {/* Error Message Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Success Message Banner */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-medium text-center">
            ✅ {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Room...
            </>
          ) : (
            'Create Room'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;