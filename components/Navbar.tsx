import React from 'react';
import { ShoppingCart, Sparkles, Home, ShoppingBag, Menu } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-darker/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              AniMall
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setView(ViewState.HOME)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === ViewState.HOME ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home size={16} /> Home
                </div>
              </button>

              <button
                onClick={() => setView(ViewState.SHOP)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === ViewState.SHOP ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} /> Shop
                </div>
              </button>

              <button
                onClick={() => setView(ViewState.GENERATE)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === ViewState.GENERATE ? 'text-secondary bg-secondary/10 border border-secondary/20' : 'text-gray-300 hover:text-secondary hover:bg-secondary/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} /> Create Custom
                </div>
              </button>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button
              onClick={onOpenCart}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 relative transition-all"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Bar (Simplified) */}
      <div className="md:hidden border-t border-white/5 bg-darker flex justify-around p-2">
          <button onClick={() => setView(ViewState.HOME)} className={`p-2 ${currentView === ViewState.HOME ? 'text-primary' : 'text-gray-400'}`}><Home /></button>
          <button onClick={() => setView(ViewState.SHOP)} className={`p-2 ${currentView === ViewState.SHOP ? 'text-primary' : 'text-gray-400'}`}><ShoppingBag /></button>
          <button onClick={() => setView(ViewState.GENERATE)} className={`p-2 ${currentView === ViewState.GENERATE ? 'text-secondary' : 'text-gray-400'}`}><Sparkles /></button>
      </div>
    </nav>
  );
};

export default Navbar;