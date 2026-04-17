import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { icon: '🎯', title: 'Focused', desc: 'We focus on what matters most — your business growth and sustainable success.' },
  { icon: '💡', title: 'Innovative', desc: 'Staying ahead of global trends to bring cutting-edge tech to local markets.' },
  { icon: '🤝', title: 'Collaborative', desc: 'We act as your internal digital department, not just an outside vendor.' },
  { icon: '✓', title: 'Reliable', desc: 'Consistent, high-performance service you can count on every single day.' },
  { icon: '💰', title: 'Affordable', desc: 'Premium architectural solutions at prices designed for growing businesses.' },
  { icon: '📈', title: 'Results-Driven', desc: 'Strategy is nothing without execution. We measure success by your ROI.' },
];

function About(): React.ReactNode {
  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-black text-white">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-30"
        style={{ backgroundImage: 'url(/Gemini_Generated_Image_sgl8nzsgl8nzsgl8.png)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

      <div className="relative z-10">
        
        {/* --- Hero Section --- */}
        <section className="pt-40 pb-24 px-8 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-400 font-black tracking-[0.4em] uppercase text-xs mb-6">✦ Our Origins</p>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              From Street <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
                To Screen.
              </span>
            </h1>
            <p className="text-gray-400 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              KaarBaar Solutions is a cross-regional powerhouse bridging the craftsmanship of Kashmir with the technological pulse of Bangalore.
            </p>
          </motion.div>
        </section>

        {/* --- Story Section --- */}
        <section className="py-24 px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-black tracking-tight">Our Story</h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  KaarBaar Solutions was founded to democratize the digital landscape. We realized that while small vendors held the most talent, they often lacked the "digital armor" to compete with global giants.
                </p>
                <p>
                  We built a bridge. By offering affordable, high-end web and marketing solutions, we’ve empowered over 500 entrepreneurs to transition their legacy businesses into modern digital powerhouses.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 flex gap-12">
                <div>
                  <p className="text-3xl font-black text-white">500+</p>
                  <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Vendors Scaled</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">2K+</p>
                  <p className="text-xs uppercase tracking-widest text-green-400 font-bold">Projects Done</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[60px] overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Our Collaborative Culture"
                className="w-full h-full object-cover grayscale opacity-60"
              />
            </motion.div>
          </div>
        </section>

        {/* --- Values Grid --- */}
        <section className="py-32 px-8 lg:px-16 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The <span className="text-green-400 italic">KaarBaar</span> Philosophy</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 inline-block">{v.icon}</div>
                  <h3 className="text-xl font-black mb-4 tracking-tight text-white">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Team / Expertise Section --- */}
        <section className="py-32 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6">Our Talent</h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-medium">A diverse collective of 100+ combined years of experience, working across Srinagar and Bangalore.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Marketing Experts', icon: '👨‍💼', desc: 'Strategy specialists with a focus on local market growth.' },
                { label: 'Web Developers', icon: '👨‍💻', desc: 'Full-stack engineers building robust, fast architectures.' },
                { label: 'Designers', icon: '🎨', desc: 'Creative leads crafting world-class visual identities.' },
                { label: 'Strategists', icon: '📊', desc: 'Business consultants planning your long-term scale.' },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-white/5 border border-white/10 rounded-[40px] hover:border-cyan-500/30 transition-all"
                >
                  <div className="text-6xl mb-6">{member.icon}</div>
                  <h4 className="text-xl font-black mb-2">{member.label}</h4>
                  <p className="text-gray-500 text-sm">{member.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final CTA Stats --- */}
        <section className="pb-32 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto p-12 lg:p-20 rounded-[60px] bg-gradient-to-r from-green-600/20 via-cyan-600/20 to-purple-600/20 border border-white/10 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div>
                <h3 className="text-5xl font-black mb-2 text-white">95%</h3>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-cyan-400">Retention Rate</p>
              </div>
              <div>
                <h3 className="text-5xl font-black mb-2 text-white">10+</h3>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-green-400">Years Active</p>
              </div>
              <div>
                <h3 className="text-5xl font-black mb-2 text-white">24/7</h3>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-purple-400">Hybrid Support</p>
              </div>
              <div>
                <h3 className="text-5xl font-black mb-2 text-white">100%</h3>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-white">Dedication</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;