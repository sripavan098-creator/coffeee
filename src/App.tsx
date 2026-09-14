import { useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, X, Filter, Coffee, Heart } from 'lucide-react';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart, { CartItem } from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import { products, categories, roastLevels, Product } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesRoast = selectedRoast === 'All' || product.roast === selectedRoast;
      
      return matchesSearch && matchesCategory && matchesRoast;
    });
  }, [searchQuery, selectedCategory, selectedRoast]);

  // Cart functions
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showNotification(`${product.name} added to cart`);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="noise-overlay min-h-screen bg-espresso-dark">
      {/* Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-40 glass"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Coffee className="text-gold" size={24} />
            <span className="font-display text-xl font-bold text-cream">Artisan Brew</span>
          </a>

          {/* Search bar - desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffees, origins, notes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/30 transition-colors text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile search toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-cream/60 hover:text-gold glass"
            >
              <Filter size={18} />
            </motion.button>

            {/* Cart button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-cream/60 hover:text-gold glass"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-caramel text-espresso text-xs font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <Hero />

      {/* Mobile Search */}
      <motion.div
        initial={false}
        animate={{ 
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0
        }}
        className="md:hidden overflow-hidden glass border-b border-gold/10"
      >
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffees..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/30 text-sm"
            />
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-8">
              Coffee is an <span className="text-gradient">art form</span>
            </h2>
            <p className="text-cream/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Every bean tells a story — of the farmer who nurtured it, the altitude that shaped it, 
              and the hands that carefully roasted it to perfection. We believe in honoring that journey 
              with every cup we serve.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 mt-16"
          >
            {[
              { value: '12+', label: 'Origins' },
              { value: '85+', label: 'Cup Score' },
              { value: '100%', label: 'Ethical' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-gold">{stat.value}</p>
                <p className="text-cream/40 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Collection</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream">
              Our <span className="text-gradient">Coffees</span>
            </h2>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
          >
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-caramel to-gold text-espresso'
                      : 'glass text-cream/60 hover:text-cream'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Roast filter */}
            <div className="flex items-center gap-2">
              <span className="text-cream/40 text-sm hidden md:inline">Roast:</span>
              <select
                value={selectedRoast}
                onChange={(e) => setSelectedRoast(e.target.value)}
                className="px-4 py-2 rounded-full bg-espresso/60 border border-gold/10 text-cream/70 text-sm focus:outline-none focus:border-gold/30 appearance-none cursor-pointer"
              >
                {roastLevels.map((roast) => (
                  <option key={roast} value={roast} className="bg-espresso-dark">
                    {roast === 'All' ? 'All Roasts' : roast}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={addToCart}
                  onViewDetails={(p) => {
                    setSelectedProduct(p);
                    setIsDetailOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-cream/50 text-xl">No coffees found</p>
              <p className="text-cream/30 text-sm mt-2">Try adjusting your filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedRoast('All');
                }}
                className="btn-secondary mt-6"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Scroll-triggered feature section */}
      <section className="py-20 md:py-32 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">Why Choose Us</p>
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">
                Crafted with <span className="text-gradient">passion</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '🌱', title: 'Direct Trade', desc: 'We work directly with farmers, ensuring fair wages and sustainable practices.' },
                  { icon: '🔥', title: 'Small Batch Roasting', desc: 'Every batch is roasted to order, ensuring peak freshness and flavor.' },
                  { icon: '📦', title: 'Fresh Delivery', desc: 'Roasted and shipped within 24 hours to preserve every nuanced flavor.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-4 p-4 rounded-xl glass"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="text-cream font-medium">{item.title}</h4>
                      <p className="text-cream/50 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="perspective-container"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[12rem] md:text-[16rem] text-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  ☕
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="text-gold" size={20} />
                <span className="font-display text-lg font-bold text-cream">Artisan Brew</span>
              </div>
              <p className="text-cream/40 text-sm leading-relaxed">
                Specialty coffee roasters dedicated to bringing you the world's finest beans, 
                roasted with care and delivered with love.
              </p>
            </div>
            <div>
              <h4 className="text-cream font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2 text-cream/40 text-sm">
                <li><a href="#products" className="hover:text-gold transition-colors">Our Coffees</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cream font-medium mb-3">Newsletter</h4>
              <p className="text-cream/40 text-sm mb-3">Get updates on new arrivals and special offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-full bg-espresso/60 border border-gold/10 text-cream placeholder-cream/30 text-sm focus:outline-none focus:border-gold/30"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gold/10 text-center text-cream/30 text-sm">
            <p>© 2026 Artisan Brew. All rights reserved. Crafted with ☕ and love.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={() => {
          setCartItems([]);
        }}
      />

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-6 py-3 rounded-full glass border border-gold/20 text-cream text-sm flex items-center gap-2"
          >
            <Heart size={14} className="text-caramel" fill="currentColor" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
