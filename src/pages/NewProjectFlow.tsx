import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createOrderIntent, trackEvent } from '../lib/trackingApi';
import { notifyError, notifySuccess } from '../lib/notifications';
import { SERVICE_PACKAGES, ServicePackage, formatInr } from '../lib/pricing';
import { useAuth } from '../context/AuthContext';
import {
  FiCheck,
  FiArrowRight,
  FiShield,
  FiClock,
  FiClipboard,
  FiShoppingBag,
  FiPhoneCall
} from 'react-icons/fi';

const NewProjectFlow: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeline, setTimeline] = useState('This month');
  const [projectBrief, setProjectBrief] = useState('');
  const [budgetConfirmed, setBudgetConfirmed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    setContactName((current) => current || `${user.firstName || ''} ${user.lastName || ''}`.trim());
    setCompanyName((current) => current || user.company || '');
    setWorkEmail((current) => current || user.email || '');
    setPhone((current) => current || user.phone || '');
  }, [user]);

  const handleSubmitRequest = useCallback(async () => {
    if (!selectedService) return;

    if (!contactName.trim() || !companyName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail) || projectBrief.trim().length < 20) {
      notifyError('Please provide a company name, valid email, and a descriptive project brief (min 20 chars)');
      return;
    }

    setIsProcessing(true);

    try {
      await createOrderIntent({
        contactName,
        companyName,
        workEmail,
        phone,
        notes: projectBrief,
        timeline,
        budgetConfirmed,
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        servicePrice: selectedService.priceInr,
        totalValue: selectedService.priceInr,
        status: 'initiated',
      });

      await trackEvent('project_initiated', 'new_project_flow', {
        serviceId: selectedService.id,
        value: selectedService.priceInr,
      });

      notifySuccess('Project request submitted successfully!');
      setStep(3);
    } catch (requestError) {
      const message = (requestError as Error).message || 'Unable to initiate request. Please try again.';
      notifyError(message);
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedService, contactName, companyName, workEmail, phone, projectBrief, timeline, budgetConfirmed]);

  return (
    <div
      className="enterprise-page min-h-screen pt-24 pb-24 px-5 sm:px-6 relative"
      style={{ background: '#f7f5f2' }}
    >
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(49,45,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(49,45,42,0.035) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Progress Stepper ── */}
      <div className="relative max-w-xs mx-auto mb-14">
        <div className="absolute top-5 left-0 w-full h-px bg-[#ddd8d1]" />
        <div className="flex items-start justify-between relative z-10">
          {[
            { n: 1, label: 'Service' },
            { n: 2, label: 'Inquiry' },
            { n: 3, label: 'Callback' },
          ].map((item) => (
            <div key={item.n} className="flex flex-col items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  step > item.n
                    ? 'text-white'
                    : step === item.n
                    ? 'text-white'
                    : 'bg-white border border-[#ddd8d1] text-[#8a8580]'
                }`}
                style={
                  step >= item.n
                    ? {
                        background: '#c74634',
                        boxShadow: 'none',
                      }
                    : {}
                }
              >
                {step > item.n ? <FiCheck /> : item.n}
              </div>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  step >= item.n ? 'text-[#c74634]' : 'text-[#8a8580]'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Steps ── */}
      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">

          {/* Step 1 — Service Packages */}
          {step === 1 && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-2.5 mb-4">
                  <span className="block w-4 h-px bg-[#c74634]" />
                  <p className="text-[#c74634] text-[10px] uppercase tracking-wide font-bold">
                    Professional Services
                  </p>
                  <span className="block w-4 h-px bg-[#c74634]" />
                </div>
                <h1
                  className="font-black tracking-tight leading-none mb-4"
                  style={{
                    fontFamily: "'Bebas Neue','Impact',sans-serif",
                    fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
                    color: '#1f1c19',
                  }}
                >
                  SELECT A PACKAGE
                </h1>
                <p className="text-[#5f5a55] text-base max-w-lg mx-auto">
                  Initiate a request to receive a callback and a tailored proposal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {SERVICE_PACKAGES.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    whileHover={{ y: -5 }}
                    className="group relative flex flex-col rounded-[24px] overflow-hidden border border-white/[0.06] p-7 transition-all duration-400"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(245,200,66,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,200,66,0.15)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    {/* Corner glow */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-amber-400" />

                    <div className="flex items-start justify-between gap-4 mb-7">
                      <div
                        className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: 'rgba(245,200,66,0.1)',
                          color: '#F5C842',
                          border: '1px solid rgba(245,200,66,0.15)',
                          fontFamily: "'Bebas Neue','Impact',sans-serif",
                          fontSize: '1rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.shortCode}
                      </div>
                      <div className="text-right">
                        <p
                          className="font-black"
                          style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: '1.5rem', color: '#F5F0E8', letterSpacing: '0.02em' }}
                        >
                          {formatInr(item.priceInr)}
                        </p>
                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Est. Quote</p>
                      </div>
                    </div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/60 mb-2">{item.category}</p>
                    <h3 className="font-black text-white/90 text-lg mb-3">{item.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed flex-grow">{item.description}</p>

                    <button
                      onClick={() => { setSelectedService(item); setStep(2); }}
                      className="mt-8 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #F5C842 0%, #E8A020 100%)',
                        color: '#0A0A0F',
                        boxShadow: '0 4px 20px rgba(245,200,66,0.15)',
                      }}
                    >
                      Initiate Inquiry <FiArrowRight />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Project Details */}
          {step === 2 && selectedService && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto"
            >
              {/* Left — Form */}
              <div className="lg:col-span-3 space-y-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-white/25 hover:text-amber-400 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors"
                >
                  ← Back to Packages
                </button>

                <div
                  className="rounded-[24px] overflow-hidden border border-white/[0.06] p-8"
                  style={{ background: 'rgba(255,255,255,0.03)', boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset' }}
                >
                  <h2
                    className="font-black mb-8 flex items-center gap-3"
                    style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: '1.6rem', color: '#F5F0E8', letterSpacing: '0.05em' }}
                  >
                    <FiClipboard className="text-amber-400 text-xl" />
                    PROJECT BACKGROUND
                  </h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Contact Name"  value={contactName} onChange={setContactName} placeholder="Your name" />
                      <Field label="Company Name"  value={companyName} onChange={setCompanyName} placeholder="Business name" />
                      <Field label="Work Email"    type="email" value={workEmail} onChange={setWorkEmail} placeholder="email@company.com" />
                      <Field label="Phone Number"  type="tel"   value={phone}      onChange={setPhone}      placeholder="+91..." />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 ml-1">
                        Brief Description
                      </label>
                      <textarea
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        className="w-full p-4 rounded-xl outline-none resize-none text-sm font-medium transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          color: '#F5F0E8',
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,200,66,0.35)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,200,66,0.07)'; }}
                        onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Sticky Summary */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-[24px] p-8 sticky top-28 border border-white/[0.06]"
                  style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset' }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/20 mb-6">Service Inquiry</p>

                  <div
                    className="mb-8 p-4 rounded-2xl border border-white/5"
                    style={{ background: 'rgba(245,200,66,0.05)' }}
                  >
                    <p className="font-bold text-sm text-white/80">{selectedService.title}</p>
                    <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                      <FiClock /> {selectedService.deliveryTime} timeframe
                    </p>
                  </div>

                  {error && (
                    <div
                      className="mb-5 p-4 rounded-xl text-xs font-bold"
                      style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.15)', color: '#FCA5A5' }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    disabled={isProcessing}
                    onClick={handleSubmitRequest}
                    className="w-full py-5 rounded-xl font-bold text-sm uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 active:scale-95"
                    style={{
                      background: isProcessing
                        ? 'rgba(245,200,66,0.2)'
                        : 'linear-gradient(135deg, #F5C842 0%, #E8A020 100%)',
                      color: isProcessing ? 'rgba(245,200,66,0.4)' : '#0A0A0F',
                      boxShadow: isProcessing ? 'none' : '0 8px 28px rgba(245,200,66,0.25)',
                    }}
                  >
                    {isProcessing
                      ? <div className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                      : 'Request a Callback'
                    }
                  </button>

                  <p className="text-center text-[9px] text-white/15 font-mono uppercase tracking-[0.2em] mt-5">
                    Our team will review and contact you
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 max-w-2xl mx-auto relative overflow-hidden rounded-[36px] border border-white/[0.06]"
              style={{ background: 'rgba(255,255,255,0.03)', boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset' }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 rounded-full blur-3xl opacity-10 bg-amber-400" />
              </div>

              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-2xl mx-auto mb-8"
                style={{
                  background: 'rgba(245,200,66,0.1)',
                  border: '1px solid rgba(245,200,66,0.2)',
                  color: '#F5C842',
                  boxShadow: '0 0 40px rgba(245,200,66,0.15)',
                }}
              >
                <FiPhoneCall />
              </div>

              <h1
                className="relative font-black tracking-tight mb-6"
                style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F5F0E8', letterSpacing: '0.05em' }}
              >
                REQUEST INITIATED
              </h1>

              <p className="relative text-white/35 text-base px-10 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="text-white/70 font-bold">{contactName.split(' ')[0]}</span>. We've received your inquiry for the{' '}
                <span className="text-amber-400/80">{selectedService?.title}</span> package.
                <br /><br />
                <span className="text-amber-400 font-bold">We will call you back</span> on your provided contact information to discuss the timeline and next steps.
              </p>

              <div className="relative mt-12">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #F5C842 0%, #E8A020 100%)',
                    color: '#0A0A0F',
                    boxShadow: '0 8px 28px rgba(245,200,66,0.2)',
                  }}
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Field ──
function Field({ label, value, onChange, placeholder, type = 'text' }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 ml-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl outline-none text-sm font-medium transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#F5F0E8',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,200,66,0.35)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,200,66,0.07)'; }}
        onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
    </div>
  );
}

export default NewProjectFlow;
