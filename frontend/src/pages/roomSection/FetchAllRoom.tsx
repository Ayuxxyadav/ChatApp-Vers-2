import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Users, ArrowRight, Sparkles } from 'lucide-react';

// Backend JSON ke according interface update kiya
interface Room {
  id: string;
  adminId: string;
  slug: string;
  createdAt: string;
}

const FetchAllRoom = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchRooms = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:12000/api/v1/all-room', {
        headers: {
          Authorization: token ,
        },
      });

      // API response: { allRooms: [...], message: "..." }
      const data = response.data.allRooms;
      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
      }
    } catch (err: any) {
      console.error('Fetch All Rooms Error:', err);
      setError(err.response?.data?.message || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Sirf tabhi navigate hoga jab user manually "Join" button click karega
  const handleJoinRoom = (roomId: string) => {
    if (!roomId) return;
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-400" size={18} />
          <h2 className="text-xl font-bold text-slate-100">Active Rooms</h2>
        </div>
        
        <button
          onClick={fetchRooms}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition disabled:opacity-50"
          title="Refresh Rooms"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10 space-y-3">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400">Loading active chugli rooms...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs text-center">
          ⚠️ {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && rooms.length === 0 && (
        <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl">
          <Users className="mx-auto text-slate-600 mb-2" size={32} />
          <p className="text-slate-400 text-sm font-medium">No active rooms found.</p>
          <p className="text-slate-500 text-xs mt-1">Be the first one to create a room!</p>
        </div>
      )}

      {/* Rooms List */}
      {!loading && !error && rooms.length > 0 && (
        <div className="grid grid-cols-1 gap-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {rooms.map((room) => {
            const id = room.id;
            const name = room.slug; // Name backend ke 'slug' se mil raha hai
            const formattedDate = new Date(room.createdAt).toLocaleDateString();

            return (
              <div
                key={id}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/50 p-4 rounded-2xl flex items-center justify-between transition group"
              >
                <div className="overflow-hidden pr-2">
                  <h3 className="font-semibold text-sm text-slate-200 group-hover:text-purple-300 transition truncate capitalize">
                    {name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      ID: {id}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {formattedDate}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinRoom(id)}
                  className="bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1 shrink-0"
                >
                  Join <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default FetchAllRoom;