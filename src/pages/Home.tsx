import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../lib/trackingApi';

// Validated matching asset arrays mapped from your active workspace file tree
const BACKGROUND_IMAGES = [
  '/jakub-zerdzicki-j_hho1mE47s-unsplash.jpg',
  '/jakub-zerdzicki-tFecc1boKYc-unsplash.jpg',
  '/jakub-zerdzicki-ynllMMWBdi0-unsplash.jpg'
];

function Home() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background rotater hook: Transitions cleanly every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Clean, high-end animation parameters modeled after premium tech sites
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const handleBookCall = async () => {
    try {
      await trackEvent('cta_book_call_clicked', 'home', {
        phoneNumber: '+916005349142',
      });
    } catch (_error) {
      // Keep primary flow uninterrupted even if tracking is unavailable.
    }
    
    // Direct tel link fallback execution if needed programmatically, 
    // though the standard standard anchor tagging handles this seamlessly.
    window.location.href = 'tel:+916005349142';
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-[#060606] text-white antialiased selection:bg-white/20">
      
      {/* --- Continuous High-End Background Carousel Layer --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={BACKGROUND_IMAGES[currentBgIndex]}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 0.75, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={BACKGROUND_IMAGES[currentBgIndex]} 
              alt="Architectural Backdrop" 
              className="w-full h-full object-cover object-center brightness-[0.95] contrast-[1.02]" 
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Fine-tuned tint overlays: protects text color contrast without washing out image shapes */}
        <div className="absolute inset-0 bg-[#060606]/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/45 via-transparent to-[#060606]/90" />
      </div>

      {/* Premium Tech Ambient Lighting (Meta-style soft glow centered) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none blur-3xl z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* --- Hero Section --- */}
        <section className="min-h-[90vh] flex items-center justify-center pt-32 pb-20 text-center">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl flex flex-col items-center justify-center"
          >
            {/* Meta-style Pill Badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium tracking-wider uppercase text-emerald-400 bg-black/60 border border-emerald-500/30 backdrop-blur-md rounded-full shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Kashmir &bull; Bengaluru
            </motion.div>
            
            {/* Editorial Tech Typography with enhanced crisp drop shadows */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 text-white leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
            >
              From Street <br /> 
              <span className="text-gray-200 font-normal italic">To Screen.</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-white text-md md:text-lg lg:text-xl leading-relaxed mb-12 max-w-xl font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] opacity-95"
            >
              We partner with Indian enterprises and global founders to scale high-trust digital ecosystems. By synthesizing Kashmir's legacy of meticulous craftsmanship with Bengaluru's rapid digital execution, we engineer local growth for international impact.
            </motion.p>

            {/* Centered Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <motion.button 
                onClick={handleBookCall}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-100 transition-colors shadow-2xl w-full sm:w-64 text-center"
              >
                Book Direct Call
              </motion.button>
              
              <Link to="/services" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ y: -2, backgroundColor: "rgba(0,0,0,0.4)" }}
                  whileTap={{ y: 0 }}
                  className="px-8 py-3.5 bg-black/20 border border-white/30 text-white font-semibold text-sm rounded-full transition-colors w-full sm:w-64 text-center backdrop-blur-md shadow-lg hover:border-white/50"
                >
                  Explore Services
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Businesses Transformed', val: '500+' },
              { label: 'Core Capabilities', val: '8' },
              { label: 'Strategic Hubs', val: '2' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center"
              >
                <div className="text-4xl lg:text-5xl font-light tracking-tight text-white mb-2 drop-shadow-sm">
                  {stat.val}
                </div>
                <p className="text-gray-300 text-xs font-medium uppercase tracking-wider drop-shadow-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-28 my-12 relative rounded-[32px] overflow-hidden bg-gradient-to-b from-black/50 to-black/10 border border-white/10 text-center backdrop-blur-md shadow-2xl flex flex-col items-center justify-center">
          {/* Subtle Backlighting for CTA */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto px-6 flex flex-col items-center justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight drop-shadow-xl"
            >
              Ready to Scale Your Business?
            </motion.h2>
            
            <p className="text-gray-200 text-md md:text-lg mb-10 leading-relaxed font-normal drop-shadow-md max-w-xl">
              Join growth-focused enterprises accelerating across India, the GCC, the UK, and North America. Let's design and deploy your next phase.
            </p>
            
            <motion.button 
              onClick={handleBookCall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-100 transition-colors shadow-2xl shadow-black"
            >
              Book Direct Call Now
            </motion.button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;