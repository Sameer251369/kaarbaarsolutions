import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceType = {
  category: string;
  title: string;
  desc: string;
  icon: string;
  price: string;
  period: string;
  badge: string | null;
  badgeColor: string;
  color: string;
  border: string;
  accent: string;
  features: string[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CATEGORIES: string[] = ['All', 'Growth', 'Software', 'Design', 'Support'];

const SERVICES: ServiceType[] = [
  {
    category: 'Growth',
    title: 'Growth Marketing',
    desc: 'Data-driven campaigns across SEO, paid, and content.',
    icon: '📈',
    price: '₹29,999',
    period: '/month',
    badge: 'Popular',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    accent: 'text-emerald-600',
    features: ['SEO audit', 'Paid ads', 'Reports'],
  },
  {
    category: 'Software',
    title: 'Custom Software',
    desc: 'Full-stack product engineering.',
    icon: '⚙️',
    price: '₹59,999',
    period: '/month',
    badge: 'Best Value',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    color: 'from-indigo-50 to-violet-50',
    border: 'border-indigo-100',
    accent: 'text-indigo-600',
    features: ['Full-stack', 'APIs', 'DevOps'],
  },
];

const ServiceCard: React.FC<{ service: ServiceType }> = ({ service }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded((e) => !e)}
      className={`cursor-pointer rounded-2xl border ${service.border} bg-gradient-to-br ${service.color} p-4 transition-all hover:shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div className="pr-4">
          <p className="font-bold text-slate-800">{service.title}</p>
          <p className="text-xs text-slate-500 mt-1">{service.desc}</p>
        </div>
        <span className="text-xl p-2 bg-white/50 rounded-lg">{service.icon}</span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-black/5 overflow-hidden"
          >
            <div className="space-y-1">
              {service.features.map((f, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                  <span className={service.accent}>•</span> {f}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex justify-between items-center">
        <span className={`font-bold ${service.accent}`}>{service.price}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">{expanded ? 'Close' : 'View Features'}</span>
      </div>
    </motion.div>
  );
}

const ServicesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = SERVICES.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="relative bg-white p-8 rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900">Services</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-6 p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-3 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filtered.map((service) => (
                  <ServiceCard key={service.title} service={service} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ServicesModal;