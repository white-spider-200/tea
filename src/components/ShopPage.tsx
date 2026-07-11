/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Award, Check, Star, Leaf, Compass, Thermometer, Clock } from 'lucide-react';
import { Language, TeaProduct, ActivePanel } from '../types';
import { TEA_PRODUCTS, TRANSLATIONS } from '../data';
import SiteFooter from './SiteFooter';

interface ShopPageProps {
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: TeaProduct) => void;
  onOpenProductDetail: (product: TeaProduct) => void;
  onOpenPanel: (panel: ActivePanel) => void;
  cartCount: number;
}

export default function ShopPage({
  lang,
  onClose,
  onAddToCart,
  onOpenProductDetail,
  onOpenPanel,
  cartCount,
}: ShopPageProps) {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // Shop states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [successProductId, setSuccessProductId] = useState<string | null>(null);

  const shopCategories = ['All', 'Black', 'Herbal'];
  const shopCategoriesAr = ['الكل', 'أسود', 'عشبي'];

  const filteredTeas = TEA_PRODUCTS.filter((tea) => {
    if (selectedCategory === 'All') return true;
    return tea.category === selectedCategory;
  });

  const handleAddToCartWithAnimation = (product: TeaProduct) => {
    onAddToCart(product);
    setSuccessProductId(product.id);
    setTimeout(() => {
      setSuccessProductId(null);
    }, 2000);
  };

  return (
    <motion.div
      id="shop-full-page"
      className="fixed inset-0 z-30 overflow-y-auto bg-[#f6f3ed] text-stone-900 scrollbar-thin select-none pt-24 md:pt-32"
      dir={isAr ? 'rtl' : 'ltr'}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    >
      {/* 2. BOUTIQUE INTRO BANNER */}
      <section className="bg-[#f6f3ed] py-16 px-6 sm:px-12 md:px-24 text-center border-b border-stone-200">
        <div className="max-w-4xl mx-auto space-y-5">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-950 tracking-wide leading-tight">
            {isAr ? 'تسوق أرقى أنواع الشاي الحرفي والأعشاب' : 'Shop Our Premium Artisan Teas & Herbs'}
          </h1>
          <div className="h-0.5 w-20 bg-[#8e7046] mx-auto rounded-full" />
          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'مجموعة منتقاة بعناية من الشاي أحادي المنشأ والأعشاب العضوية الكاملة، نزرعها ونحصدها بأساليب مستدامة لنمنحك طقساً هادئاً وراحة نقية في كل كوب.'
              : 'Explore our hand-harvested single-origin teas and organic herbal infusions, designed to elevate your daily brewing ritual with unmatched depth and purity.'}
          </p>
        </div>
      </section>

      {/* 3. MAIN SHOPPING VIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 space-y-12">
        {/* Symmetrical Filter Tabs */}
        

        {/* Product Grid - Spacious Multi-Column Layout (Up to 3 columns on desktop) */}
        <div
          className={`grid gap-8 ${
            filteredTeas.length === 2
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredTeas.map((tea) => (
              <motion.div
                key={tea.id}
                id={`shop-item-${tea.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group border border-stone-200 rounded-2xl overflow-hidden hover:border-[#8e7046]/45 bg-white shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full"
              >
                {/* Product Thumbnail with Hover Zoom */}
                <div
                  className="relative h-64 md:h-72 overflow-hidden cursor-zoom-in bg-stone-100"
                  onClick={() => onOpenProductDetail(tea)}
                >
                  <img
                    src={tea.image}
                    alt={isAr ? tea.nameAr : tea.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    referrerPolicy="no-referrer"
                  />
                 

                  
                </div>

                {/* Product Meta Body */}
                <div className="p-6 md:p-8 flex flex-col space-y-4">
                  <h3
                    onClick={() => onOpenProductDetail(tea)}
                    className="font-serif font-bold text-lg md:text-xl text-stone-950 cursor-pointer hover:text-tea-gold transition-colors leading-tight"
                  >
                    {isAr ? tea.nameAr : tea.name}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {isAr ? tea.descriptionAr : tea.description}
                  </p>
                  <button
                    id={`add-to-cart-shop-${tea.id}`}
                    onClick={() => handleAddToCartWithAnimation(tea)}
                    className={`px-5 py-3 rounded-xl uppercase font-bold tracking-widest text-[10px] transition-all duration-300 flex items-center space-x-1.5 space-x-reverse cursor-pointer shadow-2xs hover:shadow-md ${
                      successProductId === tea.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-stone-900 hover:bg-tea-gold text-white border-stone-900 hover:border-tea-gold'
                    }`}
                  >
                    {successProductId === tea.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تم الإضافة ✓' : 'Added ✓'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isAr ? 'أضف للحقيبة' : 'Add to bag'}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
  
      </section>

      {/* 4. EXQUISITE ASSURANCE RIBBON */}
      <section className="bg-stone-900 text-stone-300 py-12 px-6 border-t border-stone-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div className="space-y-2 flex flex-col items-center">
            <Leaf className="w-6 h-6 text-[#8e7046] mb-1" />
            <h4 className="font-serif font-bold text-white text-sm">
              {isAr ? 'أوراق عضوية كاملة بنسبة ١٠٠٪' : '100% Whole Loose-Leaf'}
            </h4>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
              {isAr
                ? 'لا فقط أوراق الشاي والزهور الكاملة المعبأة يدوياً.'
                : 'Never any tea dust or fannings. Only beautiful, premium whole leaves and blossoms.'}
            </p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <Award className="w-6 h-6 text-[#8e7046] mb-1" />
            <h4 className="font-serif font-bold text-white text-sm">
              {isAr ? 'الوكيل الرسمي في الأردن' : 'Official Distributor in Jordan'}
            </h4>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
              {isAr
                ? 'نحن الممثل الرسمي والحصري لشركة رويال في المملكة الأردنية الهاشمية.'
                : 'We are the exclusive official agent for Royal company in the Hashemite Kingdom of Jordan.'}
            </p>
          </div>
     
          <div className="space-y-2 flex flex-col items-center">
            <Award className="w-6 h-6 text-[#8e7046] mb-1" />
            <h4 className="font-serif font-bold text-white text-sm">
              {isAr ? 'جائزة ليف الذهبية لعام ٢٠٢٥' : 'Winner of the Gold Leaf 2025'}
            </h4>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
              {isAr
                ? 'رويال هيربس حائزة على الجوائز الأولى لنقاء النكهات والتوريد المستدام بيئياً.'
                : 'Voted the finest sustainable brand for organic purity and ecological balance.'}
            </p>
          </div>
        </div>
      </section>

      <SiteFooter onOpenPanel={onOpenPanel} activePanel="shop" />
    </motion.div>
  );
}
