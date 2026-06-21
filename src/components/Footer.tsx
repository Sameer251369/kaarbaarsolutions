import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): React.ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#060606] border-t border-white/5 px-6 py-16 lg:px-16 antialiased selection:bg-white/20">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Top Layout Grid --- */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 pb-16">
          
          {/* Brand Identity Module matching Navbar exactly */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 group relative">
              <div className="relative overflow-hidden rounded-md bg-white/5 p-[1px] border border-white/10 transition-transform">
                <div className="bg-transparent rounded flex items-center justify-center overflow-hidden aspect-square h-9 w-9 md:h-[42px] md:w-[42px]">
                  <img
                    src="/cool.jpeg"
                    alt="Logo"
                    className="h-full w-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-start">
                <span className="font-medium text-xl md:text-[1.65rem] leading-[0.85] tracking-tight">
                  <span className="text-white transition-colors duration-300">
                    <span>KAAR</span>
                    <span className="text-gray-400 font-normal italic">BAAR</span>
                  </span>
                </span>
                <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500 mt-1.5 ml-0.5 block leading-none">
                  Solutions
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-xs md:text-sm leading-relaxed text-gray-400 font-normal">
              Digital architecture, platform engineering, and performance marketing workflows deployed intentionally for businesses seeking predictable scale.
            </p>
          </div>

          {/* Directory Module */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Company</h4>
            <div className="flex flex-col gap-3">
              {[
                ['/', 'Home'], 
                ['/services', 'Services'], 
                ['/about', 'About'], 
                ['/contact', 'Contact']
              ].map(([to, label]) => (
                <Link key={label} to={to} className="text-xs text-gray-500 font-normal transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Core Fields Module */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Expertise</h4>
            <div className="flex flex-col gap-3">
              {['Web Systems', 'Engineering', 'Brand Architecture', 'Performance Marketing'].map((item) => (
                <Link key={item} to="/services" className="text-xs text-gray-500 font-normal transition-colors hover:text-white">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Workspace Nodes Module */}
          <div className="lg:col-span-3">
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Nodes</h4>
            <div className="space-y-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">Kashmir</p>
                <p className="mt-1 text-xs text-gray-500 font-normal">Creative Direction & Structural Craft</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">Bangalore</p>
                <p className="mt-1 text-xs text-gray-500 font-normal">High-Performance Engineering Hub</p>
              </div>
            </div>
          </div>

        </div>

        {/* --- Bottom Utility Panel --- */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-8 text-[11px] text-gray-600 md:flex-row md:items-center md:justify-between font-normal">
          <p>© {year} KaarBaar Solutions. Built for engineering precision.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gray-400 transition-colors">Privacy Framework</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">Terms of Operations</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;