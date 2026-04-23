import { motion, AnimatePresence } from 'framer-motion';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesModal = ({ isOpen, onClose }: ServicesModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
              <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors font-bold">✕</button>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 bg-green-50 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">🚀</div>
              <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Our Services</h2>
              <p className="text-gray-500 mb-8 font-medium italic">Ready to elevate your "KAARBAAR"?</p>
              
              <div className="grid grid-cols-1 gap-3">
                {['Growth Marketing', 'Custom Software', 'Design Systems'].map((service) => (
                  <button key={service} className="w-full py-4 px-6 bg-gray-50 hover:bg-green-600 hover:text-white rounded-2xl text-left font-bold transition-all group flex justify-between items-center">
                    {service}
                    <span className="opacity-0 group-hover:opacity-100 transition-transform group-hover:translate-x-1">→</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServicesModal;