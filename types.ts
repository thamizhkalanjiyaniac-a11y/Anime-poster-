export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Shonen' | 'Shojo' | 'Seinen' | 'Mecha' | 'Custom' | 'Fantasy';
  isCustom?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  GENERATE = 'GENERATE'
}