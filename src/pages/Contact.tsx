import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { requestCallback, submitLead, trackEvent } from '../lib/trackingApi';
import { useAuth } from '../context/AuthContext';

function Contact(): React.ReactNode {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });
  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    preferredTime: 'Today',
    assignedNumber: '+91 6005349142',
  });

  const [submitted, setSubmitted] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    setFormData((current) => ({
      ...current,
      name: current.name || fullName,
      email: current.email || user.email || '',
      phone: current.phone || user.phone || '',
      company: current.company || user.company || '',
    }));
    setCallbackData((current) => ({
      ...current,
      name: current.name || fullName,
      email: current.email || user.email || '',
      phone: current.phone || user.phone || '',
      company: current.company || user.company || '',
    }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCallbackData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let backendSaved = false;

    try {
      try {
        await submitLead({
          ...formData,
          source: 'contact_page_form',
        });
        await trackEvent('lead_submitted', 'contact', {
          service: formData.service || 'not_selected',
        });
        backendSaved = true;
      } catch (_backendError) {
        // Formspree fallback keeps inquiry capture active.
      }

      let formspreeOk = false;
      try {
        const response = await fetch('https://formspree.io/f/maqaoylg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        formspreeOk = response.ok;
      } catch (_formspreeError) {
        formspreeOk = false;
      }

      if (backendSaved || formspreeOk) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '', service: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Submission failed. Please call us directly.');
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCallbackLoading(true);

    try {
      await requestCallback({
        ...callbackData,
        service: 'consultation_call',
      });
      await trackEvent('callback_form_submitted', 'contact', {
        assignedNumber: callbackData.assignedNumber,
      });
      setCallbackSubmitted(true);
      setTimeout(() => setCallbackSubmitted(false), 6000);
    } catch (error) {
      alert((error as Error).message || 'Could not save call request.');
    } finally {
      setCallbackLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-[#060606] text-white antialiased selection:bg-white/20">
      
      {/* Soft Ambient Radial Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative z-10 pt-36 pb-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
            Inquiries & Strategy
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.05]">
            Let's Build Your <br />
            <span className="text-gray-400 font-normal italic">Digital Legacy.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-normal">
            Supporting founders in India and overseas with transparent communication, direct structural workflows, and predictable engineering outcomes.
          </p>
        </motion.div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inquiry Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md"
          >
            <h2 className="text-xl font-medium mb-8 tracking-tight text-white">Send a Message</h2>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-xl text-center"
                >
                  <p className="text-emerald-400 text-lg font-medium">Message Received</p>
                  <p className="text-gray-500 mt-2 text-xs font-normal">Our engineers will align with your inquiry details within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-white/20 transition-all text-white text-sm placeholder:text-gray-600"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-white/20 transition-all text-white text-sm placeholder:text-gray-600"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-white/20 transition-all text-white text-sm placeholder:text-gray-600"
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company"
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-white/20 transition-all text-white text-sm placeholder:text-gray-600"
                    />
                  </div>

                  <div className="relative">
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-white/20 transition-all text-white text-sm appearance-none cursor-pointer text-gray-400"
                    >
                      <option value="" className="bg-[#111] text-gray-500">Select Service Scope</option>
                      <option value="web-development" className="bg-[#111] text-white">Web Development</option>
                      <option value="digital-marketing" className="bg-[#111] text-white">Digital Marketing</option>
                      <option value="brand-scaling" className="bg-[#111] text-white">Brand Scaling</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500 text-xs">
                      ▼
                    </div>
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your architectural goals..."
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-white/20 transition-all text-white text-sm placeholder:text-gray-600 resize-none"
                  ></textarea>
                  
                  <motion.button 
                    whileHover={{ scale: 1.01, backgroundColor: '#ffffff', color: '#000000' }}
                    whileTap={{ scale: 0.99 }}
                    type="submit" 
                    className="w-full bg-white/5 border border-white/10 text-white font-medium uppercase text-xs tracking-wider py-4 rounded-full transition-all disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Transmitting...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Sidebar Column */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Operational Nodes */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-6">Hub Nodes</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start border-b border-white/5 pb-4">
                  <span className="text-[10px] font-semibold tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 mt-0.5">KMR</span>
                  <div>
                    <p className="font-medium text-white text-sm">Kashmir Desk</p>
                    <p className="text-gray-500 text-xs mt-1 font-normal">Creative Strategy & Structural Craft</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-[10px] font-semibold tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 mt-0.5">BLR</span>
                  <div>
                    <p className="font-medium text-white text-sm">Bangalore Desk</p>
                    <p className="text-gray-500 text-xs mt-1 font-normal">High-Performance Architectural Tech Hub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect & Dashboard Callback */}
            <div id="book-call" className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 backdrop-blur-md">
              <h3 className="text-sm font-medium mb-6 tracking-tight text-white">Direct Execution Line</h3>
              
              <div className="mb-6">
                <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest mb-1.5">Communications Routing</p>
                <a 
                  href="mailto:kaarbaarsolutions@gmail.com" 
                  className="text-md font-medium text-gray-300 hover:text-white transition-colors break-words block"
                >
                  kaarbaarsolutions@gmail.com
                </a>
              </div>

              <div className="space-y-3 mb-8 border-b border-white/5 pb-6">
                <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest mb-1">Secure Voice Channels</p>
                <a 
                  href="tel:+916005349142" 
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-600 border border-white/5 px-1.5 py-0.2 rounded bg-white/[0.01]">KMR</span>
                  +91 6005349142
                </a>
                <a 
                  href="tel:+916005420609" 
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-600 border border-white/5 px-1.5 py-0.2 rounded bg-white/[0.01]">BLR</span>
                  +91 6005420609
                </a>
              </div>

              {/* Instant Scheduling Widget */}
              <div>
                <p className="text-[9px] font-medium text-emerald-400 uppercase tracking-widest mb-4">Request Workspace Callback</p>
                <AnimatePresence mode="wait">
                  {callbackSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
                    >
                      <p className="text-xs font-medium text-emerald-400">Request Synchronized</p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">System recorded entry to active operational workspace dashboards.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleCallbackSubmit}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        name="name"
                        value={callbackData.name}
                        onChange={handleCallbackChange}
                        placeholder="Your name"
                        required
                        className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-white/10 transition-all text-xs text-white placeholder:text-gray-600"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={callbackData.phone}
                        onChange={handleCallbackChange}
                        placeholder="Phone callback line"
                        required
                        className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-white/10 transition-all text-xs text-white placeholder:text-gray-600"
                      />
                      <select
                        name="assignedNumber"
                        value={callbackData.assignedNumber}
                        onChange={handleCallbackChange}
                        className="w-full bg-[#111] border border-white/5 rounded-xl p-3 outline-none focus:border-white/10 transition-all text-xs text-gray-400 cursor-pointer"
                      >
                        <option value="+91 6005349142" className="bg-[#111]">Kashmir Routing Desk</option>
                        <option value="+91 6005420609" className="bg-[#111]">Bangalore Routing Desk</option>
                      </select>
                      <select
                        name="preferredTime"
                        value={callbackData.preferredTime}
                        onChange={handleCallbackChange}
                        className="w-full bg-[#111] border border-white/5 rounded-xl p-3 outline-none focus:border-white/10 transition-all text-xs text-gray-400 cursor-pointer"
                      >
                        <option className="bg-[#111]">Call Strategy: Today</option>
                        <option className="bg-[#111]">Call Strategy: Tomorrow</option>
                        <option className="bg-[#111]">Call Strategy: This week</option>
                        <option className="bg-[#111]">Call Strategy: After 6 PM IST</option>
                      </select>
                      <button
                        type="submit"
                        disabled={callbackLoading}
                        className="w-full bg-white text-black rounded-full py-3 font-semibold uppercase tracking-wider text-[10px] hover:bg-gray-200 transition-colors disabled:opacity-60"
                      >
                        {callbackLoading ? 'Saving...' : 'Request Call'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Contact;