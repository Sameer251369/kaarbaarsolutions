import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function Login(): React.ReactNode {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!formData.email || !formData.password) {
    setError('Credentials are required.');
    return;
  }

  try {
    setLoading(true);

    await login(formData.email, formData.password);

    navigate('/dashboard');
  } catch (err: any) {
    // handle backend error safely
    setError(err?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-emerald-500/50 transition-all text-white placeholder:text-gray-600 text-sm";
  const labelClasses = "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-2 block";

  return (
    // Fixed: pt-32 ensures content starts below your Navbar
    <div className="enterprise-page relative min-h-screen bg-black text-white flex justify-center items-start overflow-x-hidden pt-32 pb-20 px-6">
      
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-black/95 to-emerald-900/20 pointer-events-none fixed" />
      
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
        
        {/* Left Side: Branding & Visuals */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-10 sticky top-40"
        >
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group mb-12">
               <div className="w-12 h-12 rounded-md overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-all">
                <img src="/ChatGPT Image Apr 15, 2026, 06_53_10 PM.png" alt="Logo" className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase italic">KaarBaar</span>
            </Link>

            <h2 className="text-6xl font-black tracking-tight leading-[0.95]">
              Welcome back to <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                The Portal.
              </span>
            </h2>
            <p className="text-gray-500 max-w-sm leading-relaxed text-lg font-medium">
              Access your personalized dashboard and manage your projects across our dual-city network.
            </p>
          </div>

          <div className="space-y-4 max-w-xs">
             {[
              { city: 'Kashmir', text: 'Regional Strategy & Design' },
              { city: 'Bangalore', text: 'Core Engineering & Cloud' },
            ].map((loc, i) => (
              <div key={i} className="flex flex-col gap-1 p-4 bg-white/[0.03] border border-white/5 rounded-md backdrop-blur-md">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{loc.city}</span>
                <span className="text-xs text-gray-400 font-medium">{loc.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="oracle-card bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 lg:p-12 rounded-[3.5rem] shadow-2xl">
            <div className="mb-10">
              <h1 className="text-4xl font-black tracking-tight mb-2">Sign In</h1>
              <p className="text-gray-500 text-sm font-medium tracking-wide">Enter your authorized credentials.</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[10px] font-bold uppercase tracking-wide text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className={labelClasses}>Identity Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="name@company.com" 
                  required 
                  className={inputClasses}
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between px-2">
                  <label className={labelClasses}>Password</label>
                  <Link to="#" className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors">Recover</Link>
                </div>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="********" 
                  required 
                  className={inputClasses}
                />
              </div>

              <div className="flex items-center gap-3 px-2">
                <input type="checkbox" className="accent-emerald-500 w-4 h-4 rounded cursor-pointer" id="remember" />
                <label htmlFor="remember" className="text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer select-none">Keep me authorized</label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black py-6 rounded-2xl font-bold uppercase text-[10px] tracking-wide hover:bg-emerald-400 transition-all shadow-xl shadow-white/5"
              >
                {loading ? 'Authenticating...' : 'Sign In ->'}
              </motion.button>
            </form>

            <div className="mt-10 text-center space-y-6">
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest">
                New Identity?{' '}
                <Link to="/signup" className="text-emerald-400 hover:text-white transition-colors ml-1">Establish Account</Link>
              </p>

              {/* Secure Demo Environment */}
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-left">
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-3 opacity-70">Demo Environment</p>
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter"><span className="text-white">UID:</span> demo@kaarbaar.com</p>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter"><span className="text-white">PWD:</span> demo123</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
