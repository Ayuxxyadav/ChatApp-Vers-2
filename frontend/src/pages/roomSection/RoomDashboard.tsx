import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import FetchAllRoom from './FetchAllRoom';


const RoomDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 font-sans selection:bg-purple-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">
               Chugli.v2
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Chugli Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Server Online
            </span>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Create + Join) */}
          <div className="lg:col-span-5 space-y-6">
            <CreateRoom />
            <JoinRoom />
          </div>

          {/* Right Column (Live Rooms Directory) */}
          <div className="lg:col-span-7 h-full">
            <FetchAllRoom />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomDashboard;