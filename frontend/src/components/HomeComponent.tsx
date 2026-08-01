import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight, Zap, Shield, Users } from 'lucide-react';

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
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* --- NAVBAR --- */}
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-500 to-amber-300 bg-clip-text text-transparent">
              Chugli
            </span>
            <span className="text-[10px] bg-purple-900/40 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded-full font-semibold uppercase">
              MVP
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/auth/signin')}
              className="text-sm text-slate-300 hover:text-white font-medium transition"
            >
              Sign In
            </button>
            <button
              onClick={handleGoToRooms}
              className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-purple-600/20"
            >
              Enter Rooms
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-28 text-center">
        <div className="max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-purple-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Zero History • Zero Names • Pure Unfiltered Chugli
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-tight">
            Anonymous Rooms for <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Real & Unfiltered Talk
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Bina apni pehchan bataye aur bina kisi chat record ke apne dosto ya naye logon ke sath aaram se chugli karo.
          </p>

          {/* --- MAIN CALL TO ACTION BUTTON --- */}
          <button
            onClick={handleGoToRooms}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-lg py-4 px-8 rounded-2xl transition transform hover:scale-105 shadow-xl shadow-purple-600/25"
          >
            Start Chugli Now <ArrowRight size={22} />
          </button>

        </div>
      </section>

      {/* --- FEATURES HIGHLIGHT --- */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <Shield className="text-purple-400 mb-4" size={32} />
            <h3 className="text-lg font-bold mb-2">100% Anonymous</h3>
            <p className="text-slate-400 text-sm">Koi real name display nahi hoga. Apne avatar ya temporary identity ke sath baat karo.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <Zap className="text-pink-400 mb-4" size={32} />
            <h3 className="text-lg font-bold mb-2">Zero History</h3>
            <p className="text-slate-400 text-sm">Room close hote hi saari chats hamesha ke liye delete ho jaati hain.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <Users className="text-amber-400 mb-4" size={32} />
            <h3 className="text-lg font-bold mb-2">Multiple Vibes</h3>
            <p className="text-slate-400 text-sm">Gaming, Study, ya Random Gossip — har vibe ke liye alag room banao.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-900 py-6 bg-slate-950 text-slate-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Chugli. Ephemeral & Anonymous Messaging.
      </footer>

    </div>
  );
};

export default HomeComponent;