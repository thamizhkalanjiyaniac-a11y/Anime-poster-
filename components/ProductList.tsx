import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Plus, Filter } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Shonen', 'Seinen', 'Shojo', 'Mecha', 'Fantasy', 'Custom'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Trending Posters</h2>
        
        {/* Filter Pills */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
          <div className="flex items-center text-gray-400 mr-2">
            <Filter size={18} />
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                  : 'bg-card border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              {product.isCustom && (
                <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  AI Generated
                </div>
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-white text-darker font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 hover:bg-gray-100"
                 >
                   <Plus size={18} /> Add to Cart
                 </button>
              </div>
            </div>
            
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>No posters found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;