import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { icon: '01', title: 'Focused', desc: 'We prioritize what moves the needle: scalable market growth and sustainable business engineering.' },
  { icon: '02', title: 'Innovative', desc: 'Translating high-end global architectural trends into functional local digital workflows.' },
  { icon: '03', title: 'Collaborative', desc: 'Operating as your integrated digital team rather than a detached third-party agency.' },
  { icon: '04', title: 'Reliable', desc: 'Consistent, predictable code delivery and operational execution day in and day out.' },
  { icon: '05', title: 'Accessible', desc: 'Premium architectural solutions scaled intentionally for growing digital enterprises.' },
  { icon: '06', title: 'Results-Driven', desc: 'Strategic foresight backed by precise technical deployment. Success is measured by your ROI.' },
];

function About(): React.ReactNode {
  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-[#060606] text-white antialiased selection:bg-white/20">
      
      {/* Soft Ambient Radial Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative z-10 pt-36 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* --- Hero Section --- */}
        <section className="max-w-4xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              Our Origins
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.05]">
              From Street <br />
              <span className="text-gray-400 font-normal italic">To Screen.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-normal">
              KaarBaar Solutions is a cross-regional collective bridging the creative composition of Kashmir with the high-performance technical pulse of Bangalore.
            </p>
          </motion.div>
        </section>

        {/* --- Narrative & Analytics Grid --- */}
        <section className="pb-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Elements */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Our Story</h2>
              <div className="space-y-6 text-gray-400 text-base md:text-lg leading-relaxed font-normal">
                <p>
                  KaarBaar Solutions was established to democratize technical infrastructure. We recognized that while independent enterprises held profound domain craftsmanship, they frequently lacked the modern framework necessary to secure market visibility.
                </p>
                <p>
                  We engineered the bridge. By deploying accessible, robust digital architectures, we have empowered over 500 business systems to successfully modernize legacy workflows into high-efficiency web operations.
                </p>
              </div>

              {/* Minimal Metrics Hub */}
              <div className="pt-8 border-t border-white/5 flex gap-12">
                <div>
                  <p className="text-4xl font-light text-white tracking-tight">500+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1">Vendors Scaled</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-white tracking-tight">2K+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-1">Projects Deployed</p>
                </div>
              </div>
            </motion.div>

            {/* Media Canvas Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-white/[0.01]"
            >
              <div className="absolute inset-0 bg-[#060606]/20 z-10 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Our Collaborative Culture"
                className="w-full h-full object-cover grayscale opacity-60 hover:opacity-80 transition-opacity duration-700"
              />
            </motion.div>
          </div>
        </section>

        {/* --- Philosophy Matrix --- */}
        <section className="py-32 border-b border-white/5">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              The KaarBaar Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="p-8 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-md hover:bg-white/[0.03] hover:border-white/10 transition-all group"
              >
                <div className="font-mono text-xs text-emerald-400/60 mb-6">{v.icon}</div>
                <h3 className="text-lg font-medium mb-3 tracking-tight text-white">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-normal">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Capabilities & Talent Grid --- */}
        <section className="py-32">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Our Disciplines
            </h2>
            <p className="text-gray-500 text-sm font-normal max-w-md">
              A distributed matrix of engineering assets operating fluidly across Srinagar and Bangalore nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Marketing Experts', icon: 'MKT', desc: 'Strategy architects dedicated to capturing structural local market share.' },
              { label: 'Web Developers', icon: 'DEV', desc: 'Full-stack engineers building modern, decoupled, performant system applications.' },
              { label: 'Designers', icon: 'DSN', desc: 'Visual leads engineering cohesive, world-class interface systems.' },
              { label: 'Strategists', icon: 'OPS', desc: 'Operational consultants mapping long-term architectural scaling parameters.' },
            ].map((member, i) => (
              <motion.div
                key={member.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-8 bg-white/[0.01] border border-white/5 rounded-xl text-left hover:border-white/10 transition-all"
              >
                <div className="font-mono text-xs text-gray-600 mb-6">{member.icon}</div>
                <h4 className="text-md font-medium text-white mb-2">{member.label}</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-normal">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- High-End Performance Metrics Banner --- */}
        <section className="pb-32">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-10 md:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              {[
                ['95%', 'Client Retention'],
                ['10+', 'Years Combined'],
                ['24/7', 'Hybrid Alignment'],
                ['100%', 'Execution Delivery'],
              ].map(([value, label]) => (
                <div key={label} className="space-y-1.5">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">{value}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-emerald-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default About;