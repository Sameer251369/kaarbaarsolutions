import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDashboardSummary, updateOrderStatus } from '../lib/trackingApi';
import { notifyError, notifySuccess } from '../lib/notifications';
import { formatInr } from '../lib/pricing';
import { useAuth } from '../context/AuthContext';
import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiPlus,
  FiRefreshCw,
  FiTrendingUp,
  FiUsers,
  FiArrowRight,
  FiLoader
} from 'react-icons/fi';

// --- TypeScript Interfaces ---
interface Order {
  id: string;
  companyName: string;
  serviceTitle: string;
  status: string;
  totalValue: number;
  createdAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  service?: string;
  createdAt: string;
}

interface User {
  id: string;
  firstName: string;
  email: string;
  registeredAt: string;
}

interface Metrics {
  totalPipelineInr: number;
  totalLeads: number;
  conversionRate: number;
  totalEvents: number;
}

interface DashboardData {
  metrics: Metrics;
  recentOrders: Order[];
  recentLeads: Lead[];
  recentUsers: User[];
}

// --- Status Configuration (Unchanged) ---
const STATUS_MAP: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  initiated:          { label: 'Initiated',   bg: 'bg-sky-950/60',     text: 'text-sky-300',     dot: 'bg-sky-400' },
  proposal_requested: { label: 'Proposal',    bg: 'bg-zinc-800/60',    text: 'text-zinc-300',    dot: 'bg-zinc-400' },
  processing:         { label: 'Processing',  bg: 'bg-violet-950/60',  text: 'text-violet-300',  dot: 'bg-violet-400' },
  fulfilled:          { label: 'Fulfilled',   bg: 'bg-emerald-950/60', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  on_hold:            { label: 'On Hold',     bg: 'bg-amber-950/60',   text: 'text-amber-300',   dot: 'bg-amber-400' },
};

const NEXT_STATUS: Record<string, string> = {
  initiated:          'processing',
  processing:         'fulfilled',
  fulfilled:          'fulfilled',
  on_hold:            'processing',
  proposal_requested: 'processing',
};

const StatusBadge = React.memo(({ status }: { status: string }) => {
  const normalized = (status || 'initiated').toLowerCase().replace(/\s+/g, '_');
  const config = STATUS_MAP[normalized] || STATUS_MAP.initiated;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-white/5 backdrop-blur-sm ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.dot}`} />
      {config.label}
    </span>
  );
});

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [activeTable, setActiveTable] = useState<'orders' | 'users' | 'leads'>('orders');
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // loadDashboard Logic: Forced refresh to ensure Metrics update
  const loadDashboard = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    else setIsSyncing(true);

    try {
      // getDashboardSummary needs to return the latest metrics.totalPipelineInr
      const response = await getDashboardSummary();
      setDashboard(response as DashboardData); // Cast to DashboardData type
    } catch (err) {
      console.error("Fetch failed", err);
      notifyError('Failed to load dashboard');
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  const handleStatusTransition = useCallback(async (orderId: string, currentStatus: string | undefined) => {
    if (!currentStatus) return;
    const normalized = currentStatus.toLowerCase().replace(/\s+/g, '_');
    const nextStatus = NEXT_STATUS[normalized];
    if (!nextStatus || nextStatus === normalized) return;

    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, nextStatus);
      notifySuccess('Order status updated');
      // Immediately refresh dashboard after update to recalculate Pipeline
      await loadDashboard(false); 
    } catch (err) {
      console.error("Status update failed", err);
      notifyError('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  }, [loadDashboard]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Polling logic to catch background updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadDashboard(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  if (loading || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f7f5f2]">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border border-[#c74634]/20" />
            <div className="absolute inset-0 rounded-full border-t border-[#c74634] animate-spin" />
          </div>
          <p className="text-[#8a8580] uppercase tracking-wide text-[10px] font-bold">Syncing Kaarbaar Engine</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enterprise-page mt-16 min-h-[calc(100vh-64px)] pb-24" style={{ background: '#f7f5f2' }}>
      <div className="fixed inset-0 pointer-events-none opacity-60" style={{ backgroundImage: `linear-gradient(rgba(49,45,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(49,45,42,0.035) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-10 lg:pt-14">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="block w-4 h-px bg-[#c74634]" />
              <p className="text-[#c74634] text-[10px] uppercase tracking-wide font-bold">Administrative Console</p>
              {isSyncing && <FiRefreshCw className="w-2.5 h-2.5 text-[#c74634]/70 animate-spin" />}
            </div>
            <h1 className="font-black tracking-tight leading-none" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#1f1c19' }}>
              HELLO, <span style={{ color: '#c74634' }}>{user?.firstName || 'SAMEER'}</span>
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/projects/new')}
            className="group flex items-center gap-3 px-7 py-4 rounded-md text-xs font-bold uppercase tracking-wide transition-all duration-200"
            style={{ background: '#c74634', color: '#fff', boxShadow: 'none' }}
          >
            <FiPlus className="w-4 h-4" /> Create Order
          </motion.button>
        </header>

        {/* ── Metrics Section: Pipeline value updated here ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <MetricCard label="Pipeline" value={formatInr(dashboard.metrics.totalPipelineInr || 0)} icon={<FiTrendingUp />} accent="#c74634" />
          <MetricCard label="Leads" value={dashboard.metrics.totalLeads} icon={<FiUsers />} accent="#5f5a55" />
          <MetricCard label="Conversion" value={`${dashboard.metrics.conversionRate}%`} icon={<FiBarChart2 />} accent="#2f6f5e" />
          <MetricCard label="Events" value={dashboard.metrics.totalEvents} icon={<FiActivity />} accent="#8f5b3f" />
        </section>

        <div className="rounded-lg overflow-hidden border border-[#ddd8d1]" style={{ background: '#fff', backdropFilter: 'blur(20px)', boxShadow: '0 18px 50px rgba(49,45,42,0.08)' }}>
          <div className="px-8 pt-8 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 border-b border-[#ddd8d1]">
            <div>
              <h2 className="text-[#1f1c19] font-black tracking-tight mb-0.5" style={{ fontSize: '1.6rem' }}>OPERATIONAL HUB</h2>
              <p className="text-[#8a8580] text-[10px] uppercase tracking-wide font-bold">Live status - Django Admin</p>
            </div>
            <div className="flex gap-1 p-1 rounded-md bg-[#f7f5f2] border border-[#ddd8d1]">
              {(['orders', 'users', 'leads'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTable(tab)} className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wide transition-all duration-200 ${activeTable === tab ? 'bg-[#c74634] text-white shadow-sm' : 'text-[#756f68] hover:text-[#1f1c19]'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <RecordTable
              headers={activeTable === 'orders' ? ['ID', 'Client', 'Service', 'Status', 'Action'] : ['Name', 'Email', 'Activity', 'Date']}
              rows={activeTable === 'orders'
                ? dashboard.recentOrders.map((o: Order) => [
                    <span key={o.id} className="font-mono text-[9px] text-white/25 uppercase tracking-wider">#{o.id.split('_')[1] || o.id}</span>,
                    o.companyName,
                    o.serviceTitle,
                    <StatusBadge key={`${o.id}-status`} status={o.status} />,
                    <motion.button
                      key={`${o.id}-action`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusTransition(o.id, o.status)}
                      disabled={updatingOrderId === o.id || o.status === 'fulfilled'}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ${updatingOrderId === o.id ? 'bg-[#f7f5f2] text-[#8a8580]' : o.status === 'fulfilled' ? 'bg-[#f7f5f2] text-[#8a8580]' : 'bg-[#fff3ef] text-[#c74634] border border-[#f0c5bd]'}`}
                    >
                      {updatingOrderId === o.id ? <><FiLoader className="w-3 h-3 animate-spin" /> Updating</> : o.status === 'fulfilled' ? <><FiCheckCircle className="w-3 h-3" /> Done</> : <><FiArrowRight className="w-3 h-3" /> Advance</>}
                    </motion.button>,
                  ])
                : dashboard.recentLeads.map((l: Lead) => [l.name, l.email, l.service || 'General', new Date(l.createdAt).toLocaleDateString()])
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components with proper TypeScript types and memoization ---
const MetricCard = React.memo(({ label, value, icon, accent }: { label: string; value: string | number; icon: React.ReactNode; accent: string }): React.ReactElement => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-lg p-6 border border-[#ddd8d1] group" style={{ background: '#fff', boxShadow: '0 18px 50px rgba(49,45,42,0.06)' }}>
    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" style={{ background: accent }} />
    <div className="w-9 h-9 rounded-md flex items-center justify-center mb-5 text-sm" style={{ background: `${accent}14`, color: accent }}>{icon}</div>
    <div className="text-3xl font-black mb-1 tracking-tight" style={{ color: '#1f1c19', fontSize: '2rem' }}>{value}</div>
    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent }}>{label}</p>
  </motion.div>
));

const RecordTable = React.memo(({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }): React.ReactElement => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-separate" style={{ borderSpacing: '0 2px' }}>
      <thead>
        <tr>{headers.map((h) => (<th key={h} className="pb-4 text-[10px] font-bold uppercase tracking-wide text-[#8a8580] px-3 first:pl-0">{h}</th>))}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <motion.tr key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="group">
            {row.map((cell, j) => (<td key={j} className={`py-4 px-3 first:pl-0 text-sm transition-colors duration-150 border-b border-[#eee8e1] group-last:border-0 ${j === 1 ? 'font-bold text-[#1f1c19]' : 'text-[#5f5a55]'}`}>{cell}</td>))}
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
));

export default React.memo(Dashboard);
