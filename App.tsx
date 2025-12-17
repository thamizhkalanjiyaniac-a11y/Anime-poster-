import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import PosterGenerator from './components/PosterGenerator';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';
import { ViewState, Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <>
            <Hero onCtaClick={setView} />
            <div className="py-8">
               <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Featured Collections</h2>
                  <p className="text-gray-400 mt-2">Explore our hand-picked selection of anime art</p>
               </div>
               {/* Show a preview of products on home */}
               <ProductList products={products.slice(0, 4)} onAddToCart={addToCart} />
               <div className="text-center pb-12">
                  <button 
                    onClick={() => setView(ViewState.SHOP)} 
                    className="text-primary hover:text-white border-b border-primary pb-1 transition-colors"
                  >
                    View All Products
                  </button>
               </div>
            </div>
          </>
        );
      case ViewState.SHOP:
        return <ProductList products={products} onAddToCart={addToCart} />;
      case ViewState.GENERATE:
        return <PosterGenerator onAddToCart={addToCart} />;
      default:
        return <Hero onCtaClick={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-darker text-gray-100 font-sans selection:bg-secondary selection:text-white">
      <Navbar 
        currentView={view} 
        setView={setView} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main className="fade-in">
        {renderView()}
      </main>

      <footer className="bg-black/30 py-8 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AniMall. Powered by Google Gemini AI.</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <ChatAssistant />
    </div>
  );
};

export default App;