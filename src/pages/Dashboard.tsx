import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServicesModal from '../components/ServicesModal'; // Ensure this file exists

const CARDS = [
  { icon: '📊', label: 'Projects', value: '0', sub: 'Active projects', color: 'from-blue-500 to-cyan-400', path: '/projects' },
  { icon: '💰', label: 'Billing', value: 'Free', sub: 'Current plan', color: 'from-green-500 to-emerald-400', path: '/billing' },
  { icon: '🛟', label: 'Support', value: '24/7', sub: 'Always available', color: 'from-orange-500 to-amber-400', path: '/contact' },
  { icon: '📈', label: 'Analytics', value: '1.2k', sub: 'Monthly views', color: 'from-purple-500 to-pink-400', path: '/analytics' },
];

function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [showServices, setShowServices] = useState(false); // State for the popup

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12 px-4 md:px-8 font-sans">
      {/* Services Modal logic */}
      <ServicesModal isOpen={showServices} onClose={() => setShowServices(false)} />

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <header className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-4">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src="/cool.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain self-start drop-shadow-md"
              />
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  ✦ User Workspace
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mt-2">
                  {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-cyan-600">{user?.firstName}</span> 👋
                </h1>
                <p className="text-gray-500 font-medium mt-2">Scale your vision with KaarBaar Solutions.</p>
                
                {/* Explore Services Button Trigger */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowServices(true)}
                  className="mt-6 px-8 py-3.5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-gray-200 hover:bg-green-600 transition-colors"
                >
                  Explore Services
                </motion.button>
              </div>
            </div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 bg-gray-50 p-2 pr-6 rounded-2xl border border-gray-100"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-green-200">
                {user?.firstName?.[0]}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account Status</p>
                <p className="text-sm font-black text-gray-800 italic">Verified Pro</p>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT CONTENT --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CARDS.map((card, idx) => (
                <Link key={idx} to={card.path}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-500/5 transition-all hover:-translate-y-1 group"
                  >
                    <span className="text-2xl group-hover:scale-110 inline-block transition-transform">{card.icon}</span>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-4">{card.label}</p>
                    <p className={`text-2xl font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent mt-1`}>
                      {card.value}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{card.sub}</p>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Action Center
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'New Project', icon: '➕', color: 'bg-blue-50 text-blue-600', to: '/projects/new' },
                  { label: 'Invoices', icon: '📄', color: 'bg-purple-50 text-purple-600', to: '/billing' },
                  { label: 'Settings', icon: '⚙️', color: 'bg-gray-50 text-gray-600', to: '/settings' },
                  { label: 'Support', icon: '💬', color: 'bg-orange-50 text-orange-600', to: '/contact' },
                ].map((action, i) => (
                  <Link key={i} to={action.to} className="flex flex-col items-center gap-3 p-4 rounded-3xl hover:bg-gray-50 transition-all group">
                    <div className={`h-14 w-14 ${action.color} rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm`}>
                      {action.icon}
                    </div>
                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-tighter">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDEBAR --- */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Live Logs</h3>
              <div className="space-y-6">
                {[
                  { title: 'Session started', time: '2 mins ago', color: 'bg-green-400' },
                  { title: 'Security check', time: '4 hours ago', color: 'bg-blue-400' },
                  { title: 'Cloud sync', time: '1 day ago', color: 'bg-purple-400' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`w-1 rounded-full h-8 mt-1 ${item.color}`} />
                    <div>
                      <p className="text-sm font-black text-gray-800 tracking-tight">{item.title}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/activity" className="block w-full mt-10 py-4 bg-gray-50 text-gray-900 border border-gray-100 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                Full History
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;