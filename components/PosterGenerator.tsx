import React, { useState } from 'react';
import { generatePosterImage, generateProductDescription } from '../services/geminiService';
import { Product } from '../types';
import { Wand2, RefreshCw, ShoppingCart, Info, Sparkles } from 'lucide-react';

interface PosterGeneratorProps {
  onAddToCart: (product: Product) => void;
}

const PosterGenerator: React.FC<PosterGeneratorProps> = ({ onAddToCart }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Anime Style');
  const [isHighQuality, setIsHighQuality] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // 1. Generate Image
      const fullPrompt = `A high quality, detailed anime poster of ${prompt}. Style: ${style}. Vibrant colors, highly detailed masterpiece.`;
      const imageBase64 = await generatePosterImage(fullPrompt, isHighQuality);
      setGeneratedImage(imageBase64);

    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!generatedImage) return;

    // Generate a quick description for the product using text model
    const description = await generateProductDescription(prompt, style);

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      title: `Custom: ${prompt.substring(0, 20)}${prompt.length > 20 ? '...' : ''}`,
      description: description,
      price: isHighQuality ? 34.99 : 29.99, // More expensive for generated art
      imageUrl: generatedImage,
      category: 'Custom',
      isCustom: true
    };

    onAddToCart(newProduct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Controls */}
        <div className="bg-card border border-white/5 p-8 rounded-2xl shadow-xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Wand2 className="text-secondary" /> AI Workshop
            </h2>
            <p className="text-gray-400">Describe your dream anime poster, and our AI artist will paint it for you in seconds.</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What should be on the poster?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A cybernetic samurai fighting a dragon in neon tokyo..."
                className="w-full h-32 bg-darker border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Art Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-darker border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-secondary outline-none"
                >
                  <option value="Anime Style">Standard Anime</option>
                  <option value="90s Retro Anime">90s Retro (Cel Shaded)</option>
                  <option value="Studio Ghibli Style">Ghibli Inspired</option>
                  <option value="Cyberpunk">Cyberpunk / Sci-Fi</option>
                  <option value="Dark Fantasy">Dark Fantasy</option>
                  <option value="Manga Ink">Black & White Manga</option>
                  <option value="Oil Painting">Oil Painting</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between bg-darker border border-white/10 rounded-lg p-3">
                 <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">High Quality (HD)</span>
                    <span className="text-xs text-gray-500">Gemini 3 Pro</span>
                 </div>
                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input 
                        type="checkbox" 
                        name="toggle" 
                        id="toggle" 
                        checked={isHighQuality}
                        onChange={(e) => setIsHighQuality(e.target.checked)}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-4 checked:border-secondary"
                    />
                    <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${isHighQuality ? 'bg-secondary/50' : 'bg-gray-700'}`}></label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !prompt}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                loading 
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                  : 'bg-gradient-to-r from-secondary to-pink-600 hover:from-pink-500 hover:to-secondary text-white shadow-lg shadow-secondary/25'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles /> Generate Artwork
                </>
              )}
            </button>
          </form>

           <div className="mt-6 flex gap-2 items-start bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
             <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
             <p className="text-sm text-blue-200">
               Generations are unique. Once you add to cart, you secure this specific 1-of-1 design.
             </p>
           </div>
        </div>

        {/* Preview Area */}
        <div className="relative flex flex-col items-center justify-center h-full min-h-[500px] bg-darker rounded-2xl border-2 border-dashed border-white/10 p-8">
          {generatedImage ? (
            <div className="relative group w-full max-w-md animate-in fade-in zoom-in duration-500">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={generatedImage}
                alt="Generated Poster"
                className="relative rounded-lg shadow-2xl w-full object-cover"
              />
              <div className="mt-8 flex justify-center">
                 <button
                   onClick={handleAddToCart}
                   className="bg-white text-darker hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transform transition hover:scale-105"
                 >
                   <ShoppingCart size={20} /> Buy This Design (${isHighQuality ? '34.99' : '29.99'})
                 </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              {loading ? (
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p className="text-gray-400 animate-pulse">Dreaming up your poster...</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/5 w-32 h-40 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Wand2 size={40} className="opacity-20" />
                  </div>
                  <p>Your masterpiece will appear here</p>
                </>
              )}
            </div>
          )}
          
          {error && (
             <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg text-center text-sm">
                {error}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;