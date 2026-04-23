import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiActivity, 
  FiLayers, 
  FiUsers, 
  FiPlus, 
  FiZap 
} from 'react-icons/fi';

type Stat = {
  label: string;
  value: string;
  path: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
};

type Activity = {
  title: string;
  time: string;
  status: 'success' | 'info' | 'warning' | 'error';
};

const STATS: Stat[] = [
  { 
    label: 'Active Projects', 
    value: '12', 
    path: '/projects', 
    icon: <FiLayers />, 
    trend: '+2.5%', 
    color: 'from-blue-500 to-cyan-400' 
  },
  { 
    label: 'Team Members', 
    value: '05', 
    path: '/team', 
    icon: <FiUsers />, 
    trend: 'Stable', 
    color: 'from-indigo-500 to-purple-500' 
  },
];

const ACTIVITY: Activity[] = [
  { title: 'New deployment successful', time: '2 mins ago', status: 'success' },
  { title: 'API rate limit warning', time: '1 hour ago', status: 'warning' },
  { title: 'Project "Alpha" initialized', time: '3 hours ago', status: 'info' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth() as { user?: { firstName?: string } };
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="mt-16 min-h-[calc(100vh-64px)] relative overflow-hidden">
      <div className="relative p-6 lg:p-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-6 h-[2px] bg-indigo-600"></span>
              {greeting}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{user?.firstName || 'User'}</span>
            </h1>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/projects/new')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-600 transition-all group"
          >
            <FiPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            <span>New Project</span>
          </motion.button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={stat.path} className="group relative block p-8 bg-white/60 backdrop-blur-md border border-white/40 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.color}`} />
                    <div className="flex justify-between items-start">
                      <div className="p-4 bg-white/80 rounded-2xl text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-3 py-1 rounded-full border border-emerald-100">
                        {stat.trend}
                      </span>
                    </div>
                    <div className="mt-8">
                      <p className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">{stat.label}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Performance Hub */}
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <FiZap className="text-amber-500 fill-amber-500" />
                <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Performance Hub</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Analytics', 'Deployments', 'Security', 'Settings'].map((action) => (
                  <button
                    key={action}
                    className="p-4 rounded-2xl bg-white/80 border border-slate-100 text-slate-600 font-bold text-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-white transition-all shadow-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl h-full text-white border border-slate-800">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-black uppercase tracking-widest text-xs opacity-50">Live Feed</h2>
                <FiActivity className="text-indigo-400 animate-pulse" />
              </div>
              
              <div className="space-y-8">
                <AnimatePresence>
                  {ACTIVITY.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group flex gap-5 items-start"
                    >
                      <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 
                        ${item.status === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 
                          item.status === 'warning' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 
                          'bg-indigo-400'}`} 
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-100 leading-snug">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;