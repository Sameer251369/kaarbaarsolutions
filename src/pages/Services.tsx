import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const services = [
  { icon: '📊', title: 'Digital Marketing', description: 'Comprehensive strategies to reach and engage your target audience.', features: ['SEO Optimization', 'Content Marketing', 'Analytics'], color: 'from-orange-400 to-red-500' },
  { icon: '💻', title: 'Web Development', description: 'Custom websites built for extreme performance and high conversion.', features: ['React / Next.js', 'Fast Loading', 'E-commerce'], color: 'from-cyan-400 to-blue-500' },
  { icon: '📱', title: 'Mobile Apps', description: 'Native and cross-platform mobile applications for iOS and Android.', features: ['User-Friendly', 'Cloud Sync', 'App Store Ready'], color: 'from-purple-400 to-indigo-500' },
  { icon: '🎨', title: 'Brand & Design', description: 'Memorable brand identities that stand out in a crowded market.', features: ['Logo Design', 'Visual Identity', 'Collateral'], color: 'from-green-400 to-emerald-500' },
  { icon: '📸', title: 'Social Media', description: 'Build and manage your presence across all major digital platforms.', features: ['Content Creation', 'Growth Strategy', 'Ads'], color: 'from-pink-400 to-rose-500' },
  { icon: '🎬', title: 'Video Production', description: 'Professional cinematic content to showcase your products.', features: ['Product Videos', 'Animations', 'Shorts'], color: 'from-yellow-400 to-amber-500' },
  { icon: '📈', title: 'Growth Consulting', description: 'Strategic consulting to accelerate your business scaling.', features: ['Market Analysis', 'Scaling Plans', 'Strategy'], color: 'from-indigo-400 to-cyan-500' },
  { icon: '🔐', title: 'E-Commerce', description: 'Complete online store setup and inventory management.', features: ['Payment Gateways', 'Inventory', 'Security'], color: 'from-red-400 to-orange-500' },
];

const packages = [
  { name: 'Starter Pack', price: '₹9,999', period: '/mo', features: ['Social Media MGMT', 'Basic Web Presence', 'Monthly Analytics'], cta: 'Get Started', highlight: false },
  { name: 'Business Pack', price: '₹24,999', period: '/mo', features: ['Full Digital Marketing', 'Advanced Web Dev', 'Video Production', 'Priority Support'], cta: 'Most Popular', highlight: true },
  { name: 'Enterprise Pack', price: 'Custom', period: '', features: ['Mobile App Dev', 'E-Commerce Suite', 'Dedicated Manager', '24/7 Premium'], cta: 'Contact Sales', highlight: false },
];

function Services() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-black text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-fixed bg-cover opacity-30" style={{ backgroundImage: 'url(/Gemini_Generated_Image_sgl8nzsgl8nzsgl8.png)' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

      <div className="relative z-10 pt-32 px-8 lg:px-16">
        {/* --- Hero Section --- */}
        <section className="max-w-7xl mx-auto text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-cyan-400 font-black tracking-[0.4em] uppercase text-xs mb-4"
          >
            ✦ Our Capabilities
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            Services That <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">Scale Your Vision.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg lg:text-xl font-medium"
          >
            Bridging Kashmir's artistry with Bangalore's technical precision to deliver world-class digital solutions.
          </motion.p>
        </section>

        {/* --- Services Grid --- */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
            >
              {/* Hover Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-6">{s.icon}</div>
                <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.description}</p>
                <div className="space-y-2">
                  {s.features.map((f, idx) => (
                    <p key={idx} className="text-[11px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${s.color}`} /> {f}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* --- Pricing Section --- */}
        <section className="max-w-6xl mx-auto pb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">Transparent <span className="text-green-400 underline decoration-cyan-500/30 underline-offset-8">Packages</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {packages.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className={`relative p-10 rounded-[40px] border backdrop-blur-2xl transition-all duration-500 
                  ${p.highlight 
                    ? 'bg-gradient-to-b from-white/10 to-transparent border-green-500/40 py-16 shadow-[0_0_50px_rgba(34,197,94,0.1)]' 
                    : 'bg-white/5 border-white/10'}`}
              >
                {p.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                    ★ Most Popular
                  </span>
                )}
                
                <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em] mb-4">{p.name}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black tracking-tighter">{p.price}</span>
                  <span className="text-gray-500 font-bold">{p.period}</span>
                </div>

                <div className="space-y-4 mb-10">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                      <span className="text-cyan-400 text-xs">✦</span> {f}
                    </div>
                  ))}
                </div>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all
                      ${p.highlight 
                        ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                  >
                    {p.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Footer CTA --- */}
        <section className="max-w-4xl mx-auto text-center pb-32">
          <div className="p-12 rounded-[50px] bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-white/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10" />
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-6">Need a custom blueprint?</h2>
            <p className="text-gray-400 mb-10 text-lg">Talk to our experts in Srinagar or Bangalore today.</p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-200"
              >
                Book a Free Call →
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Services;