import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  MessageCircle,
  Hash
} from 'lucide-react';

const HomeComponent = () => {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* --- NAVBAR --- */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <div onClick={() => navigate('/')} className="flex items-center space-x-2.5 cursor-pointer group">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl text-white shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
              <MessageSquare size={20} />
            </div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Chugli
            </span>
            <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-800/50 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              MVP
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/auth/signin')}
              className="text-xs md:text-sm text-slate-300 hover:text-white font-semibold transition px-3.5 py-2 rounded-xl hover:bg-slate-900/80"
            >
              Sign In
            </button>
            <button
              onClick={handleGoToRooms}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-95 border border-purple-500/20"
            >
              Enter Rooms
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SPLIT SECTION --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HERO CONTENT */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 px-4 py-2 rounded-full text-xs font-semibold text-purple-300 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Zero History • Zero Names • Pure Unfiltered Chugli</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15]">
            Anonymous Rooms for <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Real & Unfiltered Talk
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed font-normal">
            Bina apni pehchan bataye aur bina kisi chat record ke apne dosto ya naye logon ke sath aaram se chugli karo.
          </p>

          {/* Key Bullet Highlights */}
          <div className="space-y-2.5 pt-1">
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
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleGoToRooms}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-bold text-base py-4 px-8 rounded-2xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-purple-600/25 border border-purple-500/30 active:scale-95"
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
          <div className="relative bg-slate-900/50 border border-slate-800/90 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl space-y-4">
            
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
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                Live
              </span>
            </div>

            {/* Chat Bubble Samples */}
            <div className="space-y-3 py-2">
              <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl max-w-[85%] text-xs text-slate-200">
                <p className="font-semibold text-[10px] text-purple-400 mb-1">Anonymous Host</p>
                Arey, tune wo baat suni jo kal raat hui thi? 🤫
              </div>

              <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 p-3.5 rounded-2xl max-w-[85%] text-xs text-white ml-auto">
                Kya baat bhai? Mujhe v batayoo! 🚀
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl max-w-[85%] text-xs text-slate-200">
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
      <footer className="border-t border-slate-900/80 py-6 bg-slate-950 text-slate-500 text-xs text-center relative z-10">
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

export default HomeComponent;