import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Lock, 
  CheckCircle2, 
  Hash 
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  // CTA Click Handler -> Redirect to /room
  const handleGoToRooms = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/signin');
      return;
    }
    navigate('/room');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* --- HERO SPLIT SECTION --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HERO CONTENT */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 px-4 py-2 rounded-full text-xs font-semibold text-purple-300 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chugli . v2</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15]">
            
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Real & Unfiltered Talk
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed font-normal">
            Zero History • Zero Names • Pure Unfiltered Chugli
          </p>

          {/* Key Bullet Highlights */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <CheckCircle2 size={18} className="text-purple-400 shrink-0" />
              <span>Instant Room Creation & Direct Link Sharing</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <CheckCircle2 size={18} className="text-pink-400 shrink-0" />
              <span>Temporary Live Memory — No Data Saved</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
              <span>Encrypted WebSocket Live Streams</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleGoToRooms}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-bold text-base py-4 px-8 rounded-2xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-purple-600/25 border border-purple-500/30 active:scale-95 cursor-pointer"
            >
              <span>Start Chugli Now</span>
              <ArrowRight size={18} />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium px-2">
              <Lock size={14} className="text-emerald-400" />
              <span>No signup required to explore</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: VISUAL CHAT CARD PREVIEW */}
        <div className="lg:col-span-5 relative">
          
          {/* Card Glassmorphic Box */}
          <div className="relative bg-slate-900/50 border border-slate-800/90 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl space-y-4 hover:border-purple-500/30 transition-all duration-300">
            
            {/* Header Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1">
                  <Hash size={12} className="text-purple-400" /> Late Night Gossip
                </span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold tracking-wide">
                Live
              </span>
            </div>

            {/* Chat Bubble Samples */}
            <div className="space-y-3 py-2">
              <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl max-w-[85%] text-xs text-slate-200 shadow-sm">
                <p className="font-semibold text-[10px] text-purple-400 mb-1">Anonymous Host</p>
                Arey, tune wo baat suni jo kal raat hui thi? 🤫
              </div>

              <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 p-3.5 rounded-2xl max-w-[85%] text-xs text-white ml-auto shadow-md">
                Kya baat bhai? Mujhe v batayoo! 🚀
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl max-w-[85%] text-xs text-slate-200 shadow-sm">
                <p className="font-semibold text-[10px] text-pink-400 mb-1">Anonymous Ghost</p>
                Room close hote hi ye message bhi गायब ho jayega! ✨
              </div>
            </div>

            {/* Floating Highlights Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 text-center">
                <Shield size={16} className="text-purple-400 mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-slate-300">100% Private</p>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 text-center">
                <Zap size={16} className="text-pink-400 mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-slate-300">Zero History</p>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 text-center">
                <Users size={16} className="text-amber-400 mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-slate-300">Multi Vibe</p>
              </div>
            </div>

          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-900/80 py-6 bg-slate-950 text-slate-500 text-xs text-center relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Chugli. Ephemeral & Anonymous Messaging Platform.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="hover:text-slate-400 cursor-pointer transition">Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer transition">Terms</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer transition">Security</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;