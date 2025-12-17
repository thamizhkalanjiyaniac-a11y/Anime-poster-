import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Neon Samurai 2099',
    description: 'A cyberpunk warrior standing amidst the rain-slicked neon streets of Neo-Tokyo.',
    price: 24.99,
    imageUrl: 'https://picsum.photos/seed/samurai/600/800',
    category: 'Seinen'
  },
  {
    id: '2',
    title: 'Cherry Blossom Academy',
    description: 'Nostalgic slice-of-life scene with petals falling in the school courtyard.',
    price: 19.99,
    imageUrl: 'https://picsum.photos/seed/school/600/800',
    category: 'Shojo'
  },
  {
    id: '3',
    title: 'Galactic Mecha Strike',
    description: 'Giant robot defending the lunar colony from alien invaders. High contrast.',
    price: 29.99,
    imageUrl: 'https://picsum.photos/seed/mecha/600/800',
    category: 'Mecha'
  },
  {
    id: '4',
    title: 'Spirit Forest Guardian',
    description: 'Mystical creatures gathering around an ancient shrine in a glowing forest.',
    price: 22.50,
    imageUrl: 'https://picsum.photos/seed/forest/600/800',
    category: 'Fantasy'
  },
  {
    id: '5',
    title: 'Tournament Arc Finals',
    description: 'Intense action shot of two rivals clashing energy beams in a stadium.',
    price: 24.99,
    imageUrl: 'https://picsum.photos/seed/fight/600/800',
    category: 'Shonen'
  },
  {
    id: '6',
    title: 'Cyber Detective',
    description: 'Noir style detective smoking a holographic cigarette in a rainy alley.',
    price: 21.00,
    imageUrl: 'https://picsum.photos/seed/cyber/600/800',
    category: 'Seinen'
  }
];

export const SYSTEM_INSTRUCTION_ASSISTANT = `You are "Kai", a helpful and enthusiastic anime shop assistant for "AniMall". 
Your goal is to help users find the perfect anime poster or suggest ideas for them to generate using our custom AI tool.
You are knowledgeable about anime genres (Shonen, Shojo, Seinen, Mecha, Isekai, etc.).
Keep your responses concise, friendly, and slightly "otaku" but professional.
If asked about poster prices, they range from $19.99 to $29.99.
`;