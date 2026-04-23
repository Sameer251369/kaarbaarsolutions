import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiCheck, 
  FiArrowRight, 
  FiShield, 
  FiClock, 
  FiCreditCard,
  FiShoppingBag
} from 'react-icons/fi';

interface Service {
  id: string;
  title: string;
  price: number;
  icon: string;
  desc: string;
  features: string[];
  deliveryTime: string;
}

const SERVICES: Service[] = [
  { 
    id: 'insta', 
    title: 'Growth Strategy', 
    price: 199, 
    icon: '📸', 
    desc: 'Scalable social presence for modern brands.',
    deliveryTime: '5-7 Days',
    features: ['12 High-quality Posts', 'Reels Strategy', 'Engagement Growth']
  },
  { 
    id: 'ads', 
    title: 'Ad Campaigns', 
    price: 499, 
    icon: '📈', 
    desc: 'ROI focused Meta & Google ad management.',
    deliveryTime: '3 Days Setup',
    features: ['A/B Testing', 'Pixel Integration', 'Weekly Reporting']
  },
  { 
    id: 'seo', 
    title: 'Search Authority', 
    price: 299, 
    icon: '✍️', 
    desc: 'Professional SEO and content strategy.',
    deliveryTime: '10 Days',
    features: ['Keyword Research', 'Technical Audit', '3 Guest Posts']
  },
  { 
    id: 'branding', 
    title: 'Brand Identity', 
    price: 899, 
    icon: '🎨', 
    desc: 'Full visual language for your company.',
    deliveryTime: '14 Days',
    features: ['Logo Suite', 'Style Guide', 'Stationery Design']
  },
];

const NewProjectFlow: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pt-24 pb-20 px-6">
      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                step >= s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-slate-100 text-slate-400'
              }`}
            >
              {step > s ? <FiCheck /> : s}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Choose Plan</span>
          <span>Checkout</span>
          <span>Success</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="market" 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">Launch something <span className="text-indigo-600 underline">great</span>.</h1>
                <p className="text-slate-500 mt-4 text-lg">Select a professional service package to begin.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {SERVICES.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -10 }}
                    className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-slate-900 text-xl">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed flex-grow">{item.desc}</p>
                    
                    <ul className="mt-6 space-y-3 mb-8">
                      {item.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <FiCheck className="text-emerald-500" /> {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-black text-slate-900">${item.price}</span>
                        <span className="text-slate-400 text-xs font-bold uppercase">/ project</span>
                      </div>
                      <button 
                        onClick={() => { setSelectedService(item); setStep(2); }}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-indigo-600 shadow-xl shadow-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        Get Started <FiArrowRight />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && selectedService && (
            <motion.div 
              key="checkout" 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto"
            >
              {/* Checkout Form */}
              <div className="lg:col-span-3 space-y-8">
                <button onClick={() => setStep(1)} className="group flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Services
                </button>
                
                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <FiShoppingBag className="text-indigo-600" /> Project Details
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Company Name</label>
                        <input placeholder="Acme Corp" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Work Email</label>
                        <input type="email" placeholder="ceo@acme.com" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Brief & Requirements</label>
                      <textarea placeholder="Describe your goals for this project..." rows={4} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                    </div>
                  </div>
                </section>

                <div className="flex items-center gap-6 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm">
                    <FiShield />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 text-sm">Secure Payment Guarantee</h4>
                    <p className="text-indigo-700/70 text-xs">Your funds are held in escrow until you approve the project delivery.</p>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-2">
                <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-28">
                  <h3 className="font-black uppercase tracking-widest text-xs opacity-50 mb-8">Order Summary</h3>
                  
                  <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-3xl">{selectedService.icon}</span>
                    <div>
                      <p className="font-bold text-sm">{selectedService.title}</p>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                        <FiClock /> {selectedService.deliveryTime} Delivery
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="opacity-60">Subtotal</span>
                      <span>${selectedService.price}.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="opacity-60">Platform Fee (5%)</span>
                      <span>${(selectedService.price * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="font-black uppercase tracking-widest text-xs">Total Due</span>
                      <span className="text-4xl font-black">${(selectedService.price * 1.05).toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    disabled={isProcessing}
                    onClick={handlePayment}
                    className="w-full py-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-900/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><FiCreditCard className="text-lg" /> Complete Purchase</>
                    )}
                  </button>
                  <p className="text-center text-[10px] opacity-40 mt-6 font-bold uppercase tracking-[0.2em]">SSL Encrypted Payment</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white border border-slate-100 rounded-[4rem] shadow-2xl max-w-3xl mx-auto overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl shadow-emerald-200">
                <FiCheck strokeWidth={3} />
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">Project Initialized!</h1>
              <p className="text-slate-500 mt-6 text-lg max-w-md mx-auto leading-relaxed">
                We've received your requirements for <b>{selectedService?.title}</b>. Your dedicated project manager will contact you within 2 hours.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all"
                >
                  View in Dashboard
                </button>
                <button className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Download Receipt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NewProjectFlow;