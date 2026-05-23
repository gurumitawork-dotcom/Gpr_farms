export interface Variety {
  id: string;
  name: string;
  teluguName: string;
  tamilName: string;
  emoji: string;
  tagline: string;
  flavor: string;
  season: string;
  weight: string;
  color: string;
  bestFor: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  certifiedOrganic: boolean;
}

export interface CartItem {
  variety: string;
  boxSize: string;
  quantity: number;
  price: number;
}

export interface Testimonial {
  id: number;
  name: string;
  city: string;
  variety: string;
  quote: string;
  rating: number;
  image: string;
  imageAlt: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  variety: string;
  boxSize: string;
  quantity: number;
  notes: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}