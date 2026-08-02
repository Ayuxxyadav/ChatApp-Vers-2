import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Users, ArrowRight, Copy, Check, Hash, ShieldCheck } from 'lucide-react';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchRooms = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:12000/api/v1/all-room', {
        headers: { Authorization: token },
      });

      const data = response.data.allRooms;
      setRooms(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Fetch All Rooms Error:', err);
      setError(err.response?.data?.message || 'Failed to load active rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // One-click Copy Handler with Feedback
  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleJoinRoom = (roomId: string) => {
    if (!roomId) return;
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 p-6 md:p-8 rounded-3xl transition-all duration-300 shadow-2xl h-full flex flex-col justify-between group/container">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover/container:bg-indigo-600/15 transition-all duration-500" />

      <div className="relative z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 shadow-inner">
              <Users size={18} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Live Rooms</h2>
            </div>
          </div>
          
          <button
            onClick={fetchRooms}
            disabled={loading}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl transition-all duration-200 border border-slate-800 hover:border-slate-700 disabled:opacity-50 active:scale-95 shadow-sm"
            title="Refresh Directory"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-indigo-400' : ''} />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <div className="relative">
              <div className="w-9 h-9 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-wide">Syncing active channels...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs text-center font-medium animate-in fade-in duration-200">
            ⚠️ {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && rooms.length === 0 && (
          <div className="text-center py-12 border border-dashed border-slate-800/80 rounded-2xl bg-slate-950/40">
            <Users className="mx-auto text-slate-600 mb-3 opacity-50" size={36} />
            <p className="text-slate-300 text-sm font-medium">No active channels found</p>
            <p className="text-slate-500 text-xs mt-1">Create the first room and share it around!</p>
          </div>
        )}

        {/* Room Directory List */}
        {!loading && !error && rooms.length > 0 && (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1.5 custom-scrollbar">
            {rooms.map((room) => {
              const id = room.id;
              const name = room.slug;
              const isCopied = copiedId === id;

              return (
                <div
                  key={id}
                  className="bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 p-4 rounded-2xl flex items-center justify-between transition-all duration-200 group/card hover:shadow-lg hover:shadow-indigo-950/20 hover:-translate-y-0.5"
                >
                  <div className="overflow-hidden pr-3 space-y-1.5">
                    <h3 className="font-semibold text-sm text-slate-100 group-hover/card:text-indigo-300 transition-colors truncate capitalize">
                      {name}
                    </h3>
                    
                    {/* Interactive Copy Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyId(e, id)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-indigo-300 bg-slate-900/90 hover:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800/80 transition-all group/btn active:scale-95"
                        title="Click to copy Room ID"
                      >
                        <Hash size={11} className="text-slate-500" />
                        <span className="max-w-[120px] md:max-w-[170px] truncate">{id}</span>
                        {isCopied ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-[10px] font-semibold">
                            <Check size={11} /> Copied
                          </span>
                        ) : (
                          <Copy size={11} className="text-slate-500 group-hover/btn:text-indigo-400 shrink-0 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleJoinRoom(id)}
                    className="bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 border border-indigo-500/20 hover:border-transparent active:scale-95 shadow-sm"
                  >
                    <span>Enter</span>
                    <ArrowRight size={13} className="group-hover/card:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Meta (Exact as you modified) */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-slate-500 text-[11px] relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck size={14} className="text-emerald-500" /> Peer-to-Peer Encryption
        </span>
      </div>
    </div>
  );
};

export default FetchAllRoom;