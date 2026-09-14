import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Product } from '../data/products';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, index, onAddToCart, onViewDetails }: ProductCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      rotateX: 15,
      rotateY: index % 2 === 0 ? -10 : 10,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="perspective-container"
    >
      <motion.div
        className="card-3d group relative rounded-2xl overflow-hidden glass warm-glow"
        whileHover={{ 
          scale: 1.02,
          rotateY: -3,
          rotateX: 2,
          z: 30
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Product image area */}
        <div className="relative h-56 md:h-64 flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              background: `radial-gradient(circle at center, ${product.color}40, transparent 70%)` 
            }}
          />
          
          {/* 3D rotating coffee bean/cup */}
          <motion.div
            className="text-7xl md:text-8xl relative z-10"
            animate={{ 
              y: [0, -8, 0],
              rotateY: [0, 360],
            }}
            transition={{ 
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {product.emoji}
          </motion.div>

          {/* Roast level badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-espresso/80 text-gold border border-gold/20">
            {product.roast} Roast
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-caramel/20 text-caramel border border-caramel/20">
            {product.category}
          </div>
        </div>

        {/* Product info */}
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-cream group-hover:text-gold transition-colors">
              {product.name}
            </h3>
          </div>
          
          <p className="text-cream/50 text-sm mb-3">{product.origin} · {product.weight}</p>
          
          {/* Flavor notes */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.notes.slice(0, 3).map((note) => (
              <span 
                key={note}
                className="px-2 py-0.5 text-xs rounded-full bg-espresso/60 text-gold-light/70 border border-gold/10"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Price and actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/10">
            <div>
              <span className="text-2xl font-bold text-gold">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onViewDetails(product)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-espresso/60 text-gold/70 hover:text-gold hover:bg-espresso border border-gold/10 transition-colors"
              >
                <Eye size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onAddToCart(product)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-caramel to-gold text-espresso hover:shadow-lg hover:shadow-caramel/20 transition-shadow"
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
