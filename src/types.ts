/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export interface TeaProduct {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  price: number; // in USD
  category: 'Black' | 'Green' | 'Herbal' | 'Matcha';
  categoryAr: 'أسود' | 'أخضر' | 'عشبي' | 'ماتشا';
  origin: string;
  originAr: string;
  temp: string; // Brewing temp
  tempAr: string;
  time: string; // Brewing time
  timeAr: string;
  rating: number;
  reviews: number;
  image: string;
}

export interface CartItem {
  product: TeaProduct;
  quantity: number;
}

export type ActivePanel = 'shop' | 'about' | 'inspiration' | 'contact' | 'account' | 'search' | 'cart' | 'sustainability' | 'farms' | null;

export interface TranslationSet {
  // Navigation
  shop: string;
  about: string;
  inspiration: string;
  contact: string;
  sustainability: string;
  farms: string;
  search: string;
  account: string;
  cart: string;
  cartEmpty: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroButton: string;
  
  // Product details
  origin: string;
  brewTemp: string;
  brewTime: string;
  addToCart: string;
  added: string;
  qty: string;
  price: string;
  subtotal: string;
  checkout: string;
  checkoutSuccess: string;
  
  // Interactive Panels
  searchPlaceholder: string;
  noResults: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  contactMessage: string;
  contactSubmit: string;
  contactSuccess: string;
  accountTitle: string;
  accountSubtitle: string;
  accountLoyalty: string;
  accountPoints: string;
  accountHistory: string;
  accountSignIn: string;
}
