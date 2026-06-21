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
    <nav className={`fixed top-0 w-full z-[150] transition-all duration-300 ease-in-out border-b ${scrolled
        ? "py-3 bg-[#060606]/70 backdrop-blur-xl border-white/5 shadow-2xl shadow-black/40"
        : "py-4 bg-[#060606]/30 backdrop-blur-md border-white/[0.03]"
      }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center gap-3">

      {/* --- Logo Container (Cleaned Display Typings to Protect Click Target Boundaries) --- */}
<motion.div 
  whileHover={{ scale: 1.02 }} 
  whileTap={{ scale: 0.98 }} 
  className="z-[160]"
>
  <Link to="/" className="flex items-center gap-2.5 group relative cursor-pointer select-none">
    {/* Image Wrap */}
    <div className="relative overflow-hidden rounded-md bg-white/[0.04] border border-white/10 p-[2px] shrink-0">
      <div className="bg-transparent rounded flex items-center justify-center overflow-hidden aspect-square h-9 w-9 md:h-[40px] md:w-[40px]">
        <img
          src="/cool.jpeg"
          alt="Logo"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>

    {/* Brand Text Wrapper */}
    <div className="flex flex-col justify-center items-start pointer-events-none">
      <span className="font-semibold text-lg md:text-[1.4rem] tracking-tight leading-none text-white">
        <span>KAAR</span>
        <span className="text-emerald-400 font-light">BAAR</span>
      </span>
      <span className="text-[7px] md:text-[8px] font-medium uppercase tracking-[0.3em] text-gray-400 mt-1 block leading-none">
        Solutions
      </span>
    </div>
  </Link>
</motion.div>

        {/* --- Desktop Nav (Minimalist Capsule Layout) --- */}
        <div className="hidden lg:flex items-center bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-full px-1 py-1 shadow-inner">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative px-5 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors rounded-full overflow-hidden"
            >
              <span className="relative z-10">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/[0.06] border border-white/10"
                  style={{ borderRadius: '9999px' }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* --- Action Section --- */}
        <div className="flex items-center gap-2 md:gap-5 z-[160]">
          {isAuthenticated() ? (
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 md:gap-3 p-1 rounded-full bg-white/[0.03] border border-white/10 shadow-sm hover:bg-white/[0.06] transition-colors"
              >
                <div className="h-8 w-8 md:h-9 md:w-9 rounded-full overflow-hidden bg-white/10">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}&background=10b981&color=fff`}
                    className="h-full w-full object-cover"
                    alt="profile"
                  />
                </div>
                <div className="hidden md:block text-left leading-none pr-3">
                  <p className="text-xs font-medium text-gray-200">{user?.firstName}</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-52 bg-[#0c0c0c] rounded-xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-1.5">
                      <MenuLink to="/dashboard" icon="⚙️" label="Dashboard" />
                      <div className="h-px bg-white/5 my-1" />
                      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-rose-400 hover:bg-rose-500/10 font-medium text-xs uppercase tracking-wider transition-colors">
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/services">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }} 
                  className="px-5 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md transition-all hover:bg-gray-100"
                >
                  Explore more
                </motion.button>
              </Link>
            </div>
          )}

          {/* --- Burger Button --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-full border transition-all duration-300 lg:hidden ${
              isMobileMenuOpen 
              ? "bg-white border-white" 
              : "bg-white/[0.03] backdrop-blur-md border-white/10 hover:bg-white/[0.06]"
            }`}
          >
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 5.5, backgroundColor: "#060606" } : { rotate: 0, y: 0, backgroundColor: "#fff" }} className="w-4 h-0.5 rounded-full origin-center transition-colors" />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, backgroundColor: "#fff" }} className="w-4 h-0.5 rounded-full transition-colors" />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -5.5, backgroundColor: "#060606" } : { rotate: 0, y: 0, backgroundColor: "#fff" }} className="w-4 h-0.5 rounded-full origin-center transition-colors" />
          </button>
        </div>
      </div>

      {/* --- Mobile Drawer Layer --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-[74px] z-[140] lg:hidden rounded-2xl border border-white/10 bg-[#060606]/95 p-4 shadow-2xl backdrop-blur-2xl"
          >
            <nav className="grid gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3 text-md font-medium text-gray-200 active:bg-white/[0.05] transition-colors"
                >
                  {link.name}
                  <span className="text-xs text-gray-500 font-normal">→</span>
                </Link>
              ))}
            </nav>

            <div className="mt-4 grid gap-2">
              {!isAuthenticated() ? (
                <>
                  <Link to="/login" className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-center text-xs font-semibold tracking-wide text-white transition-colors active:bg-white/[0.08]">
                    Log In
                  </Link>
                  <Link to="/signup" className="rounded-xl bg-white px-4 py-3 text-center text-xs font-semibold tracking-wide text-black transition-colors active:bg-gray-200">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="rounded-xl bg-white px-4 py-3 text-center text-xs font-semibold tracking-wide text-black">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-xs font-semibold tracking-wide text-rose-400">
                    Log Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const MenuLink = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-white/[0.04] hover:text-white transition-all font-medium text-xs">
    <span className="text-sm">{icon}</span> {label}
  </Link>
);

export default Navbar;