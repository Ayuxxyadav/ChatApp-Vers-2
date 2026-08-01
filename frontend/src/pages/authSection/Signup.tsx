import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import karo

const Signup = () => {
  const navigate = useNavigate(); // 2. navigate function initialize karo

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSignup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !username || !password) {
      setError('All fields are necessary!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:12000/api/v1/auth/signup', {
        email: email.trim(),
        username: username.trim(),
        password,
      });

      setSuccess('Signup successful! Redirecting to login...');
      
      // Inputs clear karo
      setEmail('');
      setPassword('');
      setUsername('');

      // 3. Signup successful hone par 1.5 seconds ke baad redirect karo (ya bina timeout turant kar sakte ho)
      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
      
      {/* LEFT PART: BRANDING */}
      <div className="w-full md:w-1/2 bg-slate-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="32" height="32">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Chugli
            </span>
            <span className="text-xs bg-purple-900/50 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded-full font-medium">
              MVP
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
            Real Talk.<br />
            <span className="text-slate-400">Zero Baggage.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md mb-12">
            Join private rooms instantly. No names required, no chat history kept. Just pure, unfiltered conversations (chugli) with your squad or strangers.
          </p>
        </div>

        <div className="relative z-10 space-y-6 text-sm text-slate-400 border-t border-slate-800 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">✔️</div>
            <p>Completely Anonymous Rooms</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">✔️</div>
            <p>Ephemeral Chats (Destroyed after session)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">✔️</div>
            <p>Gaming, Study, or Random Vibes</p>
          </div>
        </div>
      </div>

      {/* RIGHT PART: SIGNUP FORM */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">Create your account</h2>
            <p className="text-slate-600 mt-2">Start your anonymous journey in seconds.</p>
          </div>

          <form className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-400 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                Username <span className="text-xs text-slate-400">(Login purpose only)</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="chugli_king"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-400 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-400 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium">
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
                <p className="font-bold text-lg">Welcome!</p>
                <p className="text-sm mt-1">{success}</p>
                <p className="text-xs text-emerald-600 mt-2 animate-pulse">Redirecting to signin page...</p>
              </div>
            )}

            <div>
              <button
                onClick={handleSignup}
                disabled={loading}
                type="button"
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-150 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-slate-600 pt-4">
            Already have an account?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/auth/signin')} 
              className="font-semibold text-purple-600 hover:text-purple-500 hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;