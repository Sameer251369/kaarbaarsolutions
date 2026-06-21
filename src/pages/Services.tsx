import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Hardcoded Inlined Data Configurations for Pure Frontend Execution ---
const SERVICE_PACKAGES = [
  {
    id: 'landing-page',
    shortCode: 'LP',
    category: 'Web Design',
    title: 'Single Page Landing Page',
    description: 'High-conversion, lightning-fast static responsive landing page built with Tailwind CSS and React optimized for local business acquisition.',
    priceInr: 7500, // Entry-tier application design (7k - 50k range)
    features: ['Responsive Layout Design', 'Contact Form Handling Layout', 'SEO Semantic Structure', 'Core Web Vitals Optimization']
  },
  {
    id: 'full-stack-app',
    shortCode: 'APP',
    category: 'Development',
    title: 'Full-Stack Web/Mobile App',
    description: 'Complete custom operational interface deployment engineered with a clean frontend state layer and modular application architecture.',
    priceInr: 34999, // Perfect mid-point target (7k - 50k range)
    features: ['Custom Client Architecture', 'Interactive API State Matrix', 'Local Cache Strategy Configuration', 'Responsive Cross-Device Layouts']
  },
  {
    id: 'advanced-platform',
    shortCode: 'SYS',
    category: 'Engineering',
    title: 'Premium Web/Mobile Ecosystem',
    description: 'Advanced production-grade platform framework optimized for user scale, highly complex workflows, and secure gateway structures.',
    priceInr: 49999, // Strategic limit tier (7k - 50k range)
    features: ['High-Concurrency Performance Filters', 'Secure Multi-Route Gateways', 'Webhook Architecture Wireframes', 'Automated Sandbox Configuration']
  },
  {
    id: 'seo-marketing',
    shortCode: 'SEO',
    category: 'Growth Retainer',
    title: 'SEO & Visibility Optimization',
    description: 'Comprehensive keyword directory indexing, semantic site architecture refinement, and schema markup deployments.',
    priceInr: 12500, // Peripheral service: strictly under 20k
    features: ['On-Page Content Hierarchy Audit', 'Local Visibility Architecture', 'Asset Payload Size Reduction', 'Search Engine Meta Map']
  },
  {
    id: 'database-tuning',
    shortCode: 'DBA',
    category: 'Optimization',
    title: 'Database Design & Profiling',
    description: 'Performance auditing, query compilation optimization layouts, and mock data relational path configurations.',
    priceInr: 14999, // Peripheral service: strictly under 20k
    features: ['Query Execution Profiling Blueprint', 'Index Path Strategy Charting', 'Connection Pool Capacity Model', 'Redundant Column Diagnostics']
  },
  {
    id: 'ui-ux-blueprint',
    shortCode: 'UIX',
    category: 'Design Blueprint',
    title: 'UI/UX Interactive Prototyping',
    description: 'High-fidelity visual component mapping, interactive screen state matrices, and clean design systems ready for conversion.',
    priceInr: 18500, // Peripheral service: strictly under 20k
    features: ['High-Fidelity UI Screens', 'Tailwind Variable Tokens Plan', 'Atomic Component Breakdown', 'Adaptive Mobile Viewport Matrix']
  }
];

const PACKAGES = [
  {
    name: 'Starter Maintenance Retainer',
    priceInr: 15000, // Peripheral operational package: strictly under 20k
    period: '/ month',
    highlight: false,
    features: ['Dedicated Troubleshooting Support', 'Minor UI Component Modifications', 'Periodic Optimization Audits', 'Standard Workspace Communication Access'],
    cta: 'Get Started'
  },
  {
    name: 'Growth Scale Retainer',
    priceInr: 45000, // Primary application sprint package: within 7k - 50k range
    period: '/ month',
    highlight: true,
    features: ['Active Functional Sprint Deliveries', 'Continuous Performance Iterations', 'Infrastructure Assembly Wireframes', 'Direct Premium Communication Channel'],
    cta: 'Scale Now'
  },
  {
    name: 'Custom Enterprise Design',
    priceInr: 0, // Handled conditionally as an open quote
    period: 'Custom Scope',
    highlight: false,
    features: ['End-to-End Core Enterprise Blueprinting', 'Comprehensive Systems Architecture Review', 'Source Framework Structural Mapping', 'Dedicated Engineering Planning Call'],
    cta: 'Book Direct Call'
  }
];

// Localized India formatting helper function directly built-in
const formatInr = (price: number) => {
  if (!price) return 'Custom Quote';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

function Services() {
  // Ultra-sleek premium cubic-bezier easing curve
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-[#060606] text-white antialiased selection:bg-white/20">
      
      {/* Meta-style Soft Ambient Radial Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative z-10 pt-36 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <section className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-full"
          >
            Capabilities & Execution
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.05]"
          >
            Services Engineered <br />
            <span className="text-gray-400 font-normal italic">To Scale Your Vision.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-normal"
          >
            Predictable rupee pricing structures mapped directly to core operational requirements. Custom engineering tailored transparently to your unique architectural scope.
          </motion.p>
        </section>

        {/* --- Service Cards Grid --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-36">
          {SERVICE_PACKAGES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col justify-between hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-gray-300">
                    {service.shortCode}
                  </div>
                  <p className="text-lg font-medium text-white tracking-tight">
                    {formatInr(service.priceInr)}
                  </p>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400 mb-2">
                  {service.category}
                </p>
                <h3 className="text-xl font-medium mb-3 tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  {service.features.map((feature) => (
                    <p key={feature} className="text-xs text-gray-500 flex items-center gap-2 font-normal">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" /> 
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              <Link to="/contact#book-call" className="mt-auto">
                <motion.button
                  whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all"
                >
                  Request This
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* --- Tiered Packages Pricing Section --- */}
        <section className="pb-36">
          <div className="mb-16 border-t border-white/5 pt-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              Transparent Operational Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pack, i) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative p-8 md:p-10 rounded-[24px] border backdrop-blur-md flex flex-col justify-between transition-all ${
                  pack.highlight
                    ? 'bg-gradient-to-b from-white/[0.04] to-transparent border-emerald-500/30 shadow-xl shadow-emerald-500/[0.02]'
                    : 'bg-white/[0.01] border-white/5'
                }`}
              >
                {pack.highlight && (
                  <span className="absolute -top-3.5 left-8 bg-emerald-500 text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div>
                  <p className="text-gray-500 font-semibold uppercase text-[10px] tracking-widest mb-4">
                    {pack.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl md:text-5xl font-light tracking-tight text-white">
                      {formatInr(pack.priceInr)}
                    </span>
                    <span className="text-gray-500 text-xs font-normal ml-1">
                      {pack.period}
                    </span>
                  </div>

                  <div className="space-y-4 mb-10 border-t border-white/5 pt-6">
                    {pack.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-sm font-normal text-gray-400 leading-snug">
                        <span className="text-emerald-400 text-xs mt-0.5">&bull;</span> 
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/contact#book-call" className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all ${
                      pack.highlight
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {pack.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Premium Bottom CTA Section --- */}
        <section className="pb-32 max-w-4xl mx-auto">
          <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 p-10 md:p-14 text-center">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Need a custom blueprint?
            </h2>
            <p className="text-gray-400 mb-10 text-md max-w-lg mx-auto leading-relaxed">
              Initiate a strategic alignment call. Your request automatically routes directly to our project calendar.
            </p>
            
            <Link to="/contact#book-call">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-gray-100 transition-colors shadow-md"
              >
                Book a Free Call
              </motion.button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Services;