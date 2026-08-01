import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Note: Form Event use karna best practice hai
  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Validation check with proper UI error state
    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:12000/api/v1/auth/signin', {
        email: email.trim(),
        password: password,
      });

      // 2. Token & User data handle
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      setSuccess('Login successful! Redirecting...');
      setEmail('');
      setPassword('');

      // 3. Redirection to Home / Dashboard
      setTimeout(() => {
        navigate('/'); // Ya phir `/dashboard`
      }, 1200);

    } catch (err: any) {
      console.error('Signin Error:', err);
      // 4. Proper backend error extraction
      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
      
      {/* LEFT PART: BRANDING (Same as Signup) */}
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
            Welcome Back.<br />
            <span className="text-slate-400">Ready for Chugli?</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md mb-12">
            Log in to access your anonymous rooms or create new ones for instant conversations.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500 border-t border-slate-800 pt-6">
          &copy; {new Date().getFullYear()} Chugli Platform. Zero logs, maximum fun.
        </div>
      </div>

      {/* RIGHT PART: SIGNIN FORM */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">Sign in to account</h2>
            <p className="text-slate-600 mt-2">Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSignin} className="space-y-6">
            
            {/* Email Field */}
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
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-400 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
              />
            </div>

            {/* Password Field */}
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
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-400 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium">
                ⚠️ {error}
              </div>
            )}

            {/* Success Display */}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-sm font-medium text-center">
                ✅ {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-150 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Navigation to Signup */}
          <div className="text-center text-sm text-slate-600 pt-4">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/auth/signup')} 
              className="font-semibold text-purple-600 hover:text-purple-500 hover:underline"
            >
              Sign up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;