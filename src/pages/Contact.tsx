import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Contact(): React.ReactNode {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/maqaoylg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '', service: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        alert(data.error || 'Submission failed.');
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-black text-white">
      {/* Background Image Parallax */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-40"
        style={{ backgroundImage: 'url(/Gemini_Generated_Image_sgl8nzsgl8nzsgl8.png)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/60 to-black"></div>

      <div className="relative z-10 pt-32 pb-20 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-black tracking-[0.4em] uppercase text-xs mb-4">Contact Us</p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
              Let's Build Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
                Digital Legacy.
              </span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-[40px] shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8 tracking-tight">Send a Message</h2>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center"
                  >
                    <p className="text-green-400 text-xl font-bold">✓ Message Received!</p>
                    <p className="text-gray-400 mt-2 text-sm">Our specialists will reach out to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500/50 transition-all text-white placeholder:text-gray-500"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500/50 transition-all text-white placeholder:text-gray-500"
                      />
                    </div>

                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500/50 transition-all text-white appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select Service</option>
                      <option value="web-development" className="bg-black">Web Development</option>
                      <option value="digital-marketing" className="bg-black">Digital Marketing</option>
                      <option value="brand-scaling" className="bg-black">Brand Scaling</option>
                    </select>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals..."
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500/50 transition-all text-white placeholder:text-gray-500 resize-none"
                    ></textarea>
                    
                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-600 to-cyan-600 text-white font-black uppercase text-[10px] tracking-[0.3em] py-5 rounded-2xl shadow-lg shadow-green-600/20 disabled:opacity-50"
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Branch Locations */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px]">
                <h3 className="text-xl font-black mb-8 tracking-tight">Our Presence</h3>
                <div className="space-y-8">
                  <div className="flex gap-5 items-center">
                    <span className="text-3xl filter grayscale brightness-125">🏔️</span>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-widest">Kashmir</p>
                      <p className="text-gray-500 text-xs mt-1 font-medium italic">Creative Strategy & Craft</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span className="text-3xl filter grayscale brightness-125">🚀</span>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-widest">Bangalore</p>
                      <p className="text-gray-500 text-xs mt-1 font-medium italic">High-Performance Tech Hub</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Connect Section */}
              <div className="bg-gradient-to-br from-green-500/10 via-cyan-500/10 to-transparent backdrop-blur-xl border border-white/10 p-10 rounded-[40px]">
                <h3 className="text-xl font-black mb-6 tracking-tight">Direct Connect</h3>
                
                {/* Email */}
                <div className="mb-8">
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2">Official Email</p>
                  <a 
                    href="mailto:kaarbaarsolutions@gmail.com" 
                    className="text-lg font-bold hover:text-green-400 transition-colors duration-300 break-words block"
                  >
                    kaarbaarsolutions@gmail.com
                  </a>
                </div>

                {/* Phones */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em] mb-2">Direct Call</p>
                  <div className="space-y-3">
                    <a 
                      href="tel:+916005349142" 
                      className="flex items-center gap-3 text-lg font-bold hover:text-cyan-400 transition-colors group"
                    >
                      <span className="text-sm opacity-40 group-hover:opacity-100">📞</span>
                      +91 6005349142
                    </a>
                    <a 
                      href="tel:+916005420609" 
                      className="flex items-center gap-3 text-lg font-bold hover:text-cyan-400 transition-colors group"
                    >
                      <span className="text-sm opacity-40 group-hover:opacity-100">📞</span>
                      +91 6005420609
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;