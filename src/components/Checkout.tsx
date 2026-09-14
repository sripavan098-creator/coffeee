import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Check, Coffee } from 'lucide-react';
import { CartItem } from './Cart';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

export default function Checkout({ isOpen, onClose, items, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '' });
    onClose();
  };

  const handleComplete = () => {
    handleClose();
    onComplete();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[90vh] bg-espresso-dark rounded-3xl border border-gold/10 z-50 overflow-y-auto"
          >
            {/* Close button */}
            {step === 'form' && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-cream/60 hover:text-cream glass z-10"
              >
                <X size={20} />
              </motion.button>
            )}

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Form Step */}
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="text-gold" size={24} />
                      <h2 className="font-display text-2xl text-cream">Checkout</h2>
                    </div>

                    {/* Order summary */}
                    <div className="p-4 rounded-xl glass mb-6 space-y-2">
                      {items.map(item => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-cream/70">{item.product.name} × {item.quantity}</span>
                          <span className="text-cream">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gold/10 flex justify-between">
                        <span className="text-cream/70 text-sm">Shipping</span>
                        <span className="text-cream text-sm">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-cream">Total</span>
                        <span className="text-gold text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-cream/50 text-sm mb-1 block">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="text-cream/50 text-sm mb-1 block">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="text-cream/50 text-sm mb-1 block">Shipping Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                          placeholder="123 Coffee Lane"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-cream/50 text-sm mb-1 block">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                            placeholder="Portland"
                          />
                        </div>
                        <div>
                          <label className="text-cream/50 text-sm mb-1 block">ZIP Code</label>
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                            placeholder="97201"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gold/10">
                        <h4 className="text-cream/50 text-sm mb-3 flex items-center gap-2">
                          <CreditCard size={14} /> Payment Details
                        </h4>
                        <div className="space-y-3">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-colors"
                              placeholder="CVV"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full py-4 text-lg mt-4"
                      >
                        Pay ${total.toFixed(2)}
                      </motion.button>

                      <p className="text-cream/30 text-xs text-center">
                        This is a simulated checkout. No real payment will be processed.
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* Processing Step */}
                {step === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-full border-4 border-gold/20 border-t-gold mb-6"
                    />
                    <p className="text-cream text-xl font-display">Processing your order...</p>
                    <p className="text-cream/50 text-sm mt-2">Brewing something special</p>
                  </motion.div>
                )}

                {/* Success Step */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center mb-6"
                    >
                      <Check className="text-green-400" size={36} />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-display text-3xl text-cream mb-2">Order Confirmed!</h3>
                      <p className="text-cream/60 mb-2">Thank you for your purchase.</p>
                      <p className="text-cream/40 text-sm mb-8">
                        Your artisan coffee is being prepared with care. 
                        You'll receive a confirmation email shortly.
                      </p>
                      
                      <div className="flex items-center gap-2 text-gold/70 mb-8">
                        <Coffee size={18} />
                        <span className="text-sm">Order #{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleComplete}
                        className="btn-primary px-8 py-3"
                      >
                        Continue Shopping
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
