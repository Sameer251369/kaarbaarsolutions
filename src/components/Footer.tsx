import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): React.ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black border-t border-white/5 pt-24 pb-12 px-8 lg:px-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-all duration-500">
                <img 
                  src="/ChatGPT Image Apr 15, 2026, 06_53_10 PM.png" 
                  alt="KaarBaar Logo" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                />
              </div>
              <div>
                <div className="font-black text-xl tracking-tighter text-white">KaarBaar</div>
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Solutions</div>
              </div>
            </Link>
            
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Bridging the gap between street-side craftsmanship and global digital screens. Architecting legacies from Kashmir to Bangalore.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {['FB', 'IG', 'LI', 'TW'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[10px] font-black hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Company</h4>
            <div className="flex flex-col gap-4">
              {[['/', 'Home'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link key={label} to={to} className="text-gray-500 text-sm hover:text-white hover:translate-x-1 transition-all">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Expertise</h4>
            <div className="flex flex-col gap-4">
              {['Web Design', 'Development', 'Brand Strategy', 'Marketing'].map((s) => (
                <Link key={s} to="/services" className="text-gray-500 text-sm hover:text-emerald-400 transition-all">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Branch Offices Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Our Hubs</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black text-cyan-400 tracking-widest uppercase">Kashmir</span>
                  <span className="text-lg">🏔️</span>
                </div>
                <p className="text-[11px] text-gray-500">Srinagar HQ • Creative & Strategy</p>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black text-emerald-400 tracking-widest uppercase">Bangalore</span>
                  <span className="text-lg">🌆</span>
                </div>
                <p className="text-[11px] text-gray-500">Karnataka Hub • Tech & Innovation</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-medium text-gray-600 tracking-widest uppercase">
            © {year} KaarBaar Solutions • Crafted for Growth
          </div>
          
          <div className="flex gap-8">
            <Link to="#" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;