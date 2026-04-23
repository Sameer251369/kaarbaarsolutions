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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[150] transition-all duration-500 ease-in-out ${scrolled
        ? "py-3 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
        : "py-6 bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* --- Logo --- */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }} 
          className="z-[160]"
        >
          <Link to="/" className="flex items-center gap-2.5 group relative">
            <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-green-400 via-emerald-400 to-cyan-500 p-[2.5px] transition-transform group-hover:rotate-[-8deg]">
              <div className="bg-transparent rounded-[18px] flex items-center justify-center overflow-hidden aspect-square h-10 w-10 md:h-[44px] md:w-[44px]">
                <img
                  src="/cool.jpeg"
                  alt="Logo"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <span className="font-black text-2xl md:text-[2rem] leading-[0.75] tracking-tighter italic">
                <span className={`${scrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-white'} transition-colors duration-300`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-green-400">KAAR</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-400">BAAR</span>
                </span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.52em] text-gray-400 mt-1.5 ml-0.5 block leading-none">
                Solutions
              </span>
            </div>
          </Link>
        </motion.div>

        {/* --- Desktop Nav (Untouched) --- */}
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
        <div className="flex items-center gap-3 md:gap-5 z-[160]">
          {isAuthenticated() ? (
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 md:pr-4 rounded-full bg-white border border-gray-100 shadow-sm"
              >
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 ring-green-500 overflow-hidden bg-gray-100">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}&background=00df9a&color=fff`}
                    className="h-full w-full object-cover"
                    alt="profile"
                  />
                </div>
                <div className="hidden md:block text-left leading-none">
                  <p className="text-xs font-black text-gray-800">{user?.firstName}</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-2">
                      <MenuLink to="/dashboard" icon="⚡" label="Dashboard" />
                      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 font-bold text-xs uppercase tracking-widest">
                        <span>logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/signup">
                <motion.button whileTap={{ scale: 0.95 }} className="px-6 py-2.5 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-green-600/20">
                  log in / sign up
                </motion.button>
              </Link>
            </div>
          )}

          {/* --- Blended Burger Button --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-2xl border transition-all duration-300 lg:hidden ${
              isMobileMenuOpen 
              ? "bg-black border-black shadow-lg" 
              : "bg-white/10 backdrop-blur-md border-white/20"
            }`}
          >
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 7, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: scrolled ? "#000" : "#fff" }} className="w-5 h-0.5 rounded-full origin-center transition-colors" />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, backgroundColor: scrolled ? "#000" : "#fff" }} className="w-5 h-0.5 rounded-full transition-colors" />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -7, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: scrolled ? "#000" : "#fff" }} className="w-5 h-0.5 rounded-full origin-center transition-colors" />
          </button>
        </div>
      </div>

<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
      animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
      exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
     
      className="fixed inset-0 bg-[#050505]/60 backdrop-blur-[50px] z-[140] lg:hidden flex flex-col justify-between pt-40 pb-16 px-10"
    >
      {/* Subtle Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-96 h-96 bg-green-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col gap-12 relative z-10">
        <nav className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
             
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", delay: 0.1 + i * 0.05, damping: 20 }}
            >
              <Link 
                to={link.path} 
                className="text-5xl font-semibold tracking-tight text-white/90 active:opacity-40 transition-opacity"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Command 3: Haptic Buttons */}
        <div className="flex flex-col gap-4">
          {!isAuthenticated() ? (
            <Link to="/login">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold text-[16px] shadow-2xl border border-white/20"
              >
                Get Started
              </motion.button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 bg-[#1c1c1e] text-white rounded-2xl font-bold text-[16px] border border-white/10"
              >
                Dashboard
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
        <span>Est. 2023</span>
        <div className="flex gap-6">
          <span>@kaarbaarsolutions</span>
        
        </div>
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