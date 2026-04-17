import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function Signup(): React.ReactNode {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', company: '', agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const validate = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Required fields are missing.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Security requires at least 6 characters.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Password confirmation mismatch.');
      return false;
    }
    if (!formData.agreeTerms) {
      setError('Please acknowledge our terms.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    setTimeout(() => {
      try {
        signup({ 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          phone: formData.phone, 
          password: formData.password, 
          company: formData.company, 
          registeredAt: new Date().toISOString() 
        });
        navigate('/dashboard');
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }, 800);
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-emerald-500/50 transition-all text-white placeholder:text-gray-600 text-sm";
  const labelClasses = "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-2 block";

  return (
    // Added pt-32 to push content below the Navbar
    <div className="relative min-h-screen bg-black text-white flex justify-center items-start overflow-x-hidden pt-32 pb-20 px-6">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black via-black/90 to-cyan-900/20 pointer-events-none fixed" />
      
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
        
        {/* Left Side: Visual & Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-10 sticky top-40" // Sticky keeps it visible while scrolling the form
        >
          <div className="space-y-6">
            <h2 className="text-7xl font-black tracking-tighter leading-[0.85]">
              One Account.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 italic">
                Double Access.
              </span>
            </h2>
            <p className="text-gray-500 max-w-sm leading-relaxed text-lg">
              Unlock specialized talent from Kashmir and Bangalore through our unified project portal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {[
              { icon: '🆓', label: 'Zero Setup Fee' },
              { icon: '📦', label: 'Scale on Demand' },
              { icon: '🎯', label: 'Priority Support' },
              { icon: '🔄', label: 'Real-time Sync' },
            ].map((b, i) => (
              <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-[2rem] backdrop-blur-md">
                <span className="text-2xl mb-3 block">{b.icon}</span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{b.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg mx-auto"
        >
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 lg:p-12 rounded-[3rem] shadow-2xl">
            <div className="mb-10">
              <h1 className="text-4xl font-black tracking-tight mb-2">Join KaarBaar</h1>
              <p className="text-gray-500 text-sm font-medium tracking-wide">Enter your business details to establish your account.</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelClasses}>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Sameer" className={inputClasses} />
                </div>
                <div className="space-y-1">
                  <label className={labelClasses}>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Bashir" className={inputClasses} />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClasses}>Professional Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@company.com" className={inputClasses} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelClasses}>Contact</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." className={inputClasses} />
                </div>
                <div className="space-y-1">
                  <label className={labelClasses}>Organization</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Agency Name" className={inputClasses} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelClasses}>Security Code</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={inputClasses} />
                </div>
                <div className="space-y-1">
                  <label className={labelClasses}>Verification</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={inputClasses} />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group mt-2 px-2">
                <input 
                  type="checkbox" 
                  name="agreeTerms" 
                  checked={formData.agreeTerms} 
                  onChange={handleChange} 
                  className="mt-1 accent-emerald-500 w-4 h-4 rounded" 
                />
                <span className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors uppercase tracking-tighter">
                  I accept the <Link to="#" className="text-emerald-400 font-bold hover:underline">Terms of Service</Link> and data protocols.
                </span>
              </label>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-emerald-400 transition-all shadow-xl shadow-white/5"
              >
                {loading ? 'Processing...' : 'Establish Identity →'}
              </motion.button>
            </form>

            <p className="mt-10 text-center text-gray-500 text-xs font-black uppercase tracking-widest">
              Verified?{' '}
              <Link to="/login" className="text-emerald-400 hover:text-white transition-colors ml-1">Log In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;