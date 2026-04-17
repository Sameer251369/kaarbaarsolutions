import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-black">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/Gemini_Generated_Image_sgl8nzsgl8nzsgl8.png)',
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Blend Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>

      <div className="relative z-10">
        
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center pt-20 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Side: Content */}
              <div>
                <motion.p 
                  variants={fadeInUp}
                  className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-md"
                >
                  ✦ Kashmir • Bangalore
                </motion.p>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-6xl lg:text-8xl font-black mb-8 leading-[0.9] text-white tracking-tighter drop-shadow-2xl"
                >
                  From Street <br /> 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
                    To Screen.
                  </span>
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-12 max-w-lg font-medium"
                >
                  We transform local vendors into digital powerhouses. Combining Kashmir's craftsmanship with Bangalore's innovation, we build brands that scale.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
                  <Link to="/services">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-green-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-green-500 transition-all shadow-lg shadow-green-600/20 w-full sm:w-auto"
                    >
                      Explore Services
                    </motion.button>
                  </Link>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all w-full sm:w-auto"
                  >
                    Get In Touch
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Side: Decorative Glass Card */}
       
            </motion.div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-32 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Businesses Transformed', val: '500+', color: 'from-orange-400 to-red-500' },
                { label: 'Core Services', val: '8', color: 'from-green-400 to-cyan-500' },
                { label: 'Powerful Cities', val: '2', color: 'from-blue-400 to-indigo-500' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors"
                >
                  <h3 className={`text-6xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-br ${stat.color}`}>
                    {stat.val}
                  </h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-40 px-8 lg:px-16 relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter"
            >
              Ready to Scale Your Business?
            </motion.h2>
            <p className="text-gray-400 text-lg mb-12 font-medium">
              Join hundreds of vendors who are already growing with KaarBaar. <br className="hidden md:block"/> Let's build something remarkable together.
            </p>
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-black uppercase text-sm tracking-[0.2em] rounded-2xl shadow-2xl shadow-cyan-500/20"
              >
                Start Your Journey
              </motion.button>
            </Link>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full -z-10"></div>
        </section>

      </div>
    </div>
  );
}

export default Home;