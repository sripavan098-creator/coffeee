import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-espresso-dark border-l border-gold/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-gold" size={24} />
                <h2 className="font-display text-2xl text-cream">Your Cart</h2>
                <span className="px-2 py-0.5 rounded-full bg-caramel/20 text-caramel text-sm">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-cream/60 hover:text-cream hover:bg-espresso/50 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <span className="text-6xl mb-4">🛒</span>
                    <p className="text-cream/50 text-lg">Your cart is empty</p>
                    <p className="text-cream/30 text-sm mt-2">Add some delicious coffee!</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.9 }}
                      className="flex items-center gap-4 p-4 rounded-xl glass"
                    >
                      {/* Product emoji */}
                      <div className="w-14 h-14 rounded-xl bg-espresso/60 flex items-center justify-center text-2xl flex-shrink-0">
                        {item.product.emoji}
                      </div>

                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-cream font-medium text-sm truncate">{item.product.name}</h4>
                        <p className="text-gold/70 text-sm">${item.product.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-espresso/60 text-gold/70 hover:text-gold border border-gold/10"
                        >
                          <Minus size={14} />
                        </motion.button>
                        <span className="w-6 text-center text-cream font-medium text-sm">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-espresso/60 text-gold/70 hover:text-gold border border-gold/10"
                        >
                          <Plus size={14} />
                        </motion.button>
                      </div>

                      {/* Remove button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveItem(item.product.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gold/10 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-cream/60">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-cream/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-caramel/70">Free shipping on orders over $50</p>
                  )}
                  <div className="flex justify-between text-cream font-bold text-lg pt-2 border-t border-gold/10">
                    <span>Total</span>
                    <span className="text-gold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="btn-primary w-full text-center py-4 text-lg"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
