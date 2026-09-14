import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, MapPin, Mountain, Droplets } from 'lucide-react';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, isOpen, onClose, onAddToCart }: ProductDetailProps) {
  if (!product) return null;

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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-espresso-dark rounded-3xl border border-gold/10 z-50 overflow-y-auto"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-cream/60 hover:text-cream glass z-10"
            >
              <X size={20} />
            </motion.button>

            {/* Hero area */}
            <div className="relative h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-t-3xl">
              <div 
                className="absolute inset-0 opacity-30"
                style={{ 
                  background: `radial-gradient(circle at center, ${product.color}60, transparent 70%)` 
                }}
              />
              
              <motion.div
                className="text-8xl md:text-9xl relative z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, delay: 0.2 }}
              >
                {product.emoji}
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-cream/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="px-3 py-1 rounded-full glass">{product.category}</span>
                <span className="px-3 py-1 rounded-full glass">{product.roast} Roast</span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-2">
                  {product.name}
                </h2>
                <p className="text-gold/70 text-lg mb-4">{product.origin} · {product.weight}</p>
                
                <p className="text-cream/60 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Details grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl glass text-center">
                    <Mountain className="mx-auto mb-1 text-gold/70" size={18} />
                    <p className="text-xs text-cream/40">Altitude</p>
                    <p className="text-sm text-cream font-medium">{product.altitude}</p>
                  </div>
                  <div className="p-3 rounded-xl glass text-center">
                    <Droplets className="mx-auto mb-1 text-gold/70" size={18} />
                    <p className="text-xs text-cream/40">Process</p>
                    <p className="text-sm text-cream font-medium">{product.process}</p>
                  </div>
                  <div className="p-3 rounded-xl glass text-center">
                    <MapPin className="mx-auto mb-1 text-gold/70" size={18} />
                    <p className="text-xs text-cream/40">Origin</p>
                    <p className="text-sm text-cream font-medium">{product.origin}</p>
                  </div>
                </div>

                {/* Flavor notes */}
                <div className="mb-6">
                  <h4 className="text-cream/50 text-sm uppercase tracking-wider mb-3">Tasting Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <motion.span
                        key={note}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="px-4 py-2 rounded-full bg-caramel/10 text-caramel border border-caramel/20 text-sm"
                      >
                        {note}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Price and add to cart */}
                <div className="flex items-center justify-between pt-6 border-t border-gold/10">
                  <div>
                    <p className="text-cream/40 text-sm">Price</p>
                    <p className="text-3xl font-bold text-gold">${product.price.toFixed(2)}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="btn-primary flex items-center gap-2 px-8 py-4 text-lg"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
