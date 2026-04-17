import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
      scrolled 
        ? "py-3 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" 
        : "py-6 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* --- Logo --- */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="z-[110]">
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-cyan-500 p-[2px]">
              <div className="bg-white rounded-[14px] p-1.5 transition-transform group-hover:rotate-6">
                <img 
                  src="/ChatGPT Image Apr 15, 2026, 06_53_10 PM.png" 
                  alt="Logo" 
                  className="h-8 w-8 md:h-9 md:w-9 object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl md:text-2xl leading-none tracking-tighter italic">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">KAAR</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-400">BAAR</span>
              </span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                &nbsp;Solutions
              </span>
            </div>
          </Link>
        </motion.div>

        {/* --- Desktop Floating Nav --- */}
        <div className="hidden lg:flex items-center bg-gray-100/50 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20 shadow-inner">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="relative px-6 py-2 text-sm font-bold text-gray-600 hover:text-black transition-colors rounded-full overflow-hidden"
            >
              <span className="relative z-10">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white shadow-sm"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* --- Action Section --- */}
        <div className="flex items-center gap-3 md:gap-5 z-[110]">
          {isAuthenticated() ? (
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 md:pr-4 rounded-full bg-white border border-gray-100 shadow-sm transition-all"
              >
                <div className="relative">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 ring-green-500 ring-offset-2 overflow-hidden bg-gray-100">
                    <img 
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}&background=00df9a&color=fff`} 
                      className="h-full w-full object-cover"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="hidden md:block text-left leading-none">
                  <p className="text-xs font-black text-gray-800">{user?.firstName}</p>
                  <p className="text-[10px] text-gray-400">Pro Member</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[120]"
                  >
                    <div className="p-5 bg-gray-50/50 border-b border-gray-100 text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Account</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2 text-left">
                      <MenuLink to="/dashboard" icon="⚡" label="Dashboard" />
                      <MenuLink to="/settings" icon="⚙️" label="Settings" />
                      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold text-sm uppercase tracking-widest">
                        <span>logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-green-600">Login</Link>
              <Link to="/signup">
                <motion.button whileTap={{ scale: 0.95 }} className="px-6 py-2.5 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-green-600/20">
                  Get Started
                </motion.button>
              </Link>
            </div>
          )}

          {/* --- Mobile Burger Button (3 Lines) --- */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-gray-100/50 rounded-xl border border-white/20 lg:hidden"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-gray-800 rounded-full origin-center"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-5 h-0.5 bg-gray-800 rounded-full"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-gray-800 rounded-full origin-center"
            />
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[105] lg:hidden flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-4xl font-black tracking-tighter hover:text-green-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100 my-4" />
              {!isAuthenticated() && (
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="text-xl font-bold text-gray-600">Login</Link>
                  <Link to="/signup" className="text-xl font-bold text-green-600">Create Account</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const MenuLink = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all font-bold text-sm">
    <span className="text-lg">{icon}</span> {label}
  </Link>
);

export default Navbar;