import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, LogIn, LogOut, LayoutDashboard, Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth/signin');
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- LEFT: LOGO BRANDING --- */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl text-white shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
            <MessageSquare size={20} />
          </div>
          <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Chugli
          </span>
        
        </div>

        {/* --- CENTER / DESKTOP NAV LINKS --- */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400">
          <button
            onClick={() => navigate('/')}
            className={`transition-colors hover:text-white ${
              location.pathname === '/' ? 'text-purple-400' : ''
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => navigate('/room')}
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${
              location.pathname.startsWith('/room') ? 'text-purple-400' : ''
            }`}
          >
            <Sparkles size={14} className="text-purple-400" />
            Rooms
          </button>
        </nav>

        {/* --- RIGHT: ACTIONS (DESKTOP) --- */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/room')}
                className="flex items-center gap-2 text-xs md:text-sm text-slate-300 hover:text-white font-semibold transition px-3.5 py-2 rounded-xl hover:bg-slate-900/80"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-900/90 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-500/30 text-xs md:text-sm font-semibold px-4 py-2 rounded-2xl transition-all duration-200"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/auth/signin')}
                className="text-xs md:text-sm text-slate-300 hover:text-white font-semibold transition px-3.5 py-2 rounded-xl hover:bg-slate-900/80"
              >
                Sign In
              </button>
              
              <button
                onClick={() => navigate('/room')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-95 border border-purple-500/20 flex items-center gap-2"
              >
                <LogIn size={15} />
                <span>Enter Rooms</span>
              </button>
            </>
          )}
        </div>

        {/* --- MOBILE HAMBURGER TOGGLE --- */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* --- MOBILE MENU DRAWER --- */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-6 py-4 space-y-3 animate-in fade-in duration-200">
          <button
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Home
          </button>
          
          <button
            onClick={() => {
              navigate('/room');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-medium text-purple-400 flex items-center gap-2"
          >
            <Sparkles size={16} /> Explore Rooms
          </button>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 py-2.5 rounded-xl text-xs font-semibold"
              >
                <LogOut size={15} /> Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/auth/signin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/room');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  Enter Rooms
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;