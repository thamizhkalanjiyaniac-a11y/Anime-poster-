import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onCtaClick: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative overflow-hidden bg-darker">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-darker sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Bring your favorite</span>{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Anime Worlds
                </span>{' '}
                <span className="block xl:inline">to your wall.</span>
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover exclusive, high-quality posters from top series, or unleash your creativity and generate one-of-a-kind AI art instantly.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => onCtaClick(ViewState.SHOP)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg transition-all"
                  >
                    Shop Collections
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => onCtaClick(ViewState.GENERATE)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-secondary bg-secondary/10 hover:bg-secondary/20 md:py-4 md:text-lg border-secondary/50 transition-all"
                  >
                    <Sparkles className="mr-2" size={20} />
                    Create Custom
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 opacity-30 lg:opacity-100 transition-opacity">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full mask-image-gradient"
          src="https://picsum.photos/seed/animecity/1600/1200"
          alt="Anime City Background"
          style={{ maskImage: 'linear-gradient(to right, transparent, black)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-darker to-transparent lg:via-darker/20"></div>
      </div>
    </div>
  );
};

export default Hero;