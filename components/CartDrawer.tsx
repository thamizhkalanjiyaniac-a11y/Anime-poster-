import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[100] pointer-events-none ${isOpen ? '' : 'overflow-hidden'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-darker border-l border-white/10 shadow-2xl transform transition-transform duration-300 pointer-events-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Your Cart ({cartItems.length})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                 <Trash2 size={32} className="opacity-50" />
               </div>
               <p>Your cart is empty.</p>
               <button onClick={onClose} className="text-secondary font-medium hover:underline">Start Shopping</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 bg-card/50 p-4 rounded-lg border border-white/5">
                <div className="w-20 h-28 flex-shrink-0 bg-gray-800 rounded overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-3 bg-darker rounded px-2 py-1 border border-white/5">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-gray-400 hover:text-white disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => onUpdateQuantity(item.id, 1)}
                         className="text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-500 hover:text-red-400 self-start"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-card">
            <div className="flex justify-between items-center mb-4 text-lg font-bold text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
              <CreditCard size={20} /> Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;