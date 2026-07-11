/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface UniqueFlavorsProps {
  lang: Language;
}

interface BoxProduct {
  id: string;
  name: string;
  nameAr: string;
  bgText: string;
  bgTextAr: string;
  description: string;
  descriptionAr: string;
  boxBgColor: string; // Background color gradient/class of cardboard box
  bannerColor: string; // Banner background hex/class
  teapotColor: string; // Teapot silhouette fill color
  leafColor: string; // Side illustrations stroke/fill color
  badgeText: string;
  badgeTextAr: string;
  badgeCountText: string;
  badgeCountTextAr: string;
  titleEnglish: string;
  titleArabic: string;
  subTitleEnglish: string;
  subTitleArabic: string;
  bottomTextEnglish: string;
  bottomTextArabic: string;
  boxImage?: string;
}

const BOX_PRODUCTS: BoxProduct[] = [
  {
    id: 'royal-regime',
    name: 'Royal Regime Tea',
    nameAr: 'شاي ريجيم الملكي',
    bgText: 'Royal Regime',
    bgTextAr: 'شاي ريجيم',
    description: 'A premium, organic weight-reducing herbal infusion crafted from hand-picked wild Mediterranean botanicals.',
    descriptionAr: 'منقوع عشبي ملكي عضوي للمساعدة على تخفيف الوزن، محضر بعناية من أجود الأعشاب البرية ونباتات البحر الأبيض المتوسط.',
    boxBgColor: 'from-stone-50 via-white to-stone-100',
    bannerColor: '#d32f2f', // Rich red
    teapotColor: '#880e4f', // Deep maroon/magenta
    leafColor: '#16a34a', // Leaf green
    badgeText: 'NEW',
    badgeTextAr: 'جديد',
    badgeCountText: '50 TEA BAGS',
    badgeCountTextAr: '٥٠ كيس شاي',
    titleEnglish: 'Royal Regime',
    titleArabic: 'شاي ريجيم',
    subTitleEnglish: 'Weight Reducing Herbs',
    subTitleArabic: 'أعشاب لتخفيف الوزن',
    bottomTextEnglish: 'NATURAL HERBAL TEA ... NO CAFFEINE',
    bottomTextArabic: 'شاي عشبي طبيعي ... خالٍ من الكافيين',
    boxImage: '/src/assets/images/2024__02__Regime_Royal_Tea-front.png',
  },
  {
    id: 'royal-evening',
    name: 'Royal Evening Tea - Chamomile',
    nameAr: 'شاي المساء الملكي - البابونج',
    bgText: 'Royal Evening',
    bgTextAr: 'شاي المساء',
    description: 'A calming chamomile herbal tea to help you relax and unwind. Promotes restful sleep naturally with no caffeine.',
    descriptionAr: 'شاي أعشاب البابونج المهدئ للاسترخاء والراحة. يعزز النوم الهادئ بشكل طبيعي وخالٍ من الكافيين.',
    boxBgColor: 'from-indigo-50/40 via-white to-purple-50/30',
    bannerColor: '#4a148c', // Deep purple
    teapotColor: '#311b92', // Rich royal blue-purple
    leafColor: '#a855f7', // Purple/Lavender hue
    badgeText: 'NEW',
    badgeTextAr: 'جديد',
    badgeCountText: '50 TEA BAGS',
    badgeCountTextAr: '٥٠ كيس شاي',
    titleEnglish: 'Royal Evening Tea',
    titleArabic: 'شاي المساء الملكي',
    subTitleEnglish: 'Chamomile - Relax & Unwind',
    subTitleArabic: 'البابونج - استرخاء وراحة',
    bottomTextEnglish: 'NATURAL HERBAL TEA - NO CAFFEINE',
    bottomTextArabic: 'شاي عشبي طبيعي - خالٍ من الكافيين',
    boxImage: '/src/assets/images/2024__02__Royal_Evening_Tea_Chamomile.png'
  }
];

export default function UniqueFlavors({ lang }: UniqueFlavorsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right/next, -1 = left/prev
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isLeft, setIsLeft] = useState(true);
  const isAr = lang === 'ar';

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % BOX_PRODUCTS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + BOX_PRODUCTS.length) % BOX_PRODUCTS.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    setIsLeft(relativeX < rect.width / 2);
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    if (isLeft) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  const activeProduct = BOX_PRODUCTS[activeIndex];
  const boxFrameClass =
    'relative select-none w-[340px] md:w-[480px] aspect-[656/438] transition-transform duration-500';

  // Render product box — real image when available, otherwise CSS/SVG fallback
  const renderPremiumBox = (product: BoxProduct) => {
    if (product.boxImage) {
      return (
        <div
          className={`${boxFrameClass} overflow-hidden rounded-lg shadow-[0_28px_60px_rgba(0,0,0,0.42)] [transform-style:preserve-3d] border border-white/40`}
          style={{ transform: 'translateZ(24px)' }}
        >
          <img
            src={product.boxImage}
            alt={isAr ? product.nameAr : product.name}
            className="absolute inset-0 w-full h-full object-contain object-center"
            referrerPolicy="no-referrer"
            draggable={false}
          />
          {/* Top-edge light for 3D depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
        </div>
      );
    }

    return (
      <div className="relative select-none w-[290px] h-[230px] md:w-[340px] md:h-[270px] transition-transform duration-500">
        
        {/* Cardboard Box 3D perspective wrapper */}
        <div 
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${product.boxBgColor} border border-stone-200/60 shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between p-4 overflow-hidden relative`}
        >
          {/* Subtle Cardboard texture and horizontal fiber lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.7),transparent)] pointer-events-none" />
          
          {/* Elegant Top Flap crease line */}
          <div className="absolute top-3 inset-x-0 h-[1.5px] bg-stone-300/60 pointer-events-none" />

          {/* BACKGROUND BOTANICAL ILLUSTATIONS (SVG branches on left and right) */}
          {/* Left illustration */}
          <div 
            className="absolute left-1 bottom-4 w-20 h-36 md:w-24 md:h-44 pointer-events-none opacity-85"
            style={{ color: product.leafColor }}
          >
            <svg viewBox="0 0 80 120" className="w-full h-full transform scale-x-[-1]">
              <path d="M 40,110 Q 40,15 40,5" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <path d="M 40,90 Q 20,70 14,60 Q 30,65 40,80" fill="currentColor" />
              <path d="M 40,80 Q 60,60 66,50 Q 50,55 40,70" fill="currentColor" />
              <path d="M 40,60 Q 20,40 14,30 Q 30,35 40,50" fill="currentColor" />
              <path d="M 40,50 Q 60,30 66,20 Q 50,25 40,40" fill="currentColor" />
              <path d="M 40,30 Q 30,15 40,5 Q 50,15 40,30" fill="currentColor" />
            </svg>
          </div>

          {/* Right illustration */}
          <div 
            className="absolute right-1 bottom-4 w-20 h-36 md:w-24 md:h-44 pointer-events-none opacity-85"
            style={{ color: product.leafColor }}
          >
            <svg viewBox="0 0 80 120" className="w-full h-full">
              <path d="M 40,110 Q 40,15 40,5" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <path d="M 40,90 Q 20,70 14,60 Q 30,65 40,80" fill="currentColor" />
              <path d="M 40,80 Q 60,60 66,50 Q 50,55 40,70" fill="currentColor" />
              <path d="M 40,60 Q 20,40 14,30 Q 30,35 40,50" fill="currentColor" />
              <path d="M 40,50 Q 60,30 66,20 Q 50,25 40,40" fill="currentColor" />
              <path d="M 40,30 Q 30,15 40,5 Q 50,15 40,30" fill="currentColor" />
            </svg>
          </div>

          {/* 1. Corner Badges */}
          <div className="flex justify-between items-start z-10 w-full px-1 pt-1">
            {/* Left Badge: Yellow Starburst / Sticker representing NEW or ORGANIC */}
            <div className="relative">
              <div className="bg-yellow-400 text-stone-900 text-[8px] font-sans font-extrabold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm border border-yellow-500/30 flex items-center justify-center animate-pulse">
                {isAr ? product.badgeTextAr : product.badgeText}
              </div>
            </div>

            {/* Right Badge: Small neat frame holding tea bags count */}
            <div className="border border-stone-300 rounded-sm px-1.5 py-0.5 bg-white/80 backdrop-blur-xs">
              <div className="text-[7.5px] font-sans font-bold text-stone-600 uppercase tracking-wider">
                {isAr ? product.badgeCountTextAr : product.badgeCountText}
              </div>
            </div>
          </div>

          {/* 2. Main Red/Custom Banner in the Upper Middle */}
          <div 
            className="w-[104%] -mx-[2%] py-2.5 shadow-md flex flex-col justify-center items-center relative z-10 border-t border-b border-black/15"
            style={{ backgroundColor: product.bannerColor }}
          >
            {/* Glossy line shine on banner */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_2px] pointer-events-none" />
            
            <div className="flex items-center justify-center space-x-2 space-x-reverse px-4">
              <span className="text-white font-serif font-extrabold text-[15px] md:text-[18px] tracking-wide drop-shadow-sm select-none">
                {product.titleEnglish}
              </span>
              <span className="text-teal-200 font-sans italic text-[11px] md:text-[13px] tracking-widest font-light opacity-90 select-none">
                Tea
              </span>
            </div>
          </div>

          {/* 3. Central Teapot Silhouette with centered bilingual text */}
          <div className="flex-1 flex flex-col justify-center items-center z-10 my-1 relative">
            <div 
              className="relative flex flex-col justify-center items-center drop-shadow-md"
              style={{ color: product.teapotColor }}
            >
              {/* High-fidelity custom SVG Teapot */}
              <svg viewBox="0 0 100 80" className="w-18 h-14 md:w-22 md:h-18">
                {/* Teapot Body */}
                <path 
                  d="M 30,55 C 25,55 15,45 15,35 C 15,22 30,15 50,15 C 70,15 85,22 85,35 C 85,45 75,55 70,55 Z" 
                  fill="currentColor"
                  className="opacity-95"
                />
                {/* Lid */}
                <path d="M 40,15 C 40,10 45,7 50,7 C 55,7 60,10 60,15 Z" fill="currentColor"/>
                <circle cx="50" cy="4" r="3" fill="currentColor"/>
                {/* Handle */}
                <path 
                  d="M 22,25 C 12,22 8,30 10,38 C 12,44 20,42 22,42" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4.5" 
                  strokeLinecap="round"
                />
                {/* Spout */}
                <path d="M 78,28 C 88,25 93,15 95,12 C 95,12 90,28 78,42" fill="currentColor"/>
              </svg>

              {/* Text layered inside the teapot silhouette */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center space-y-0.5 pointer-events-none mt-2">
                {/* Arabic Inside Text */}
                <span className="font-serif text-[10px] md:text-[11.5px] font-extrabold tracking-wide text-amber-50 leading-none">
                  {product.titleArabic}
                </span>
                {/* English Inside Text */}
                <span className="text-[6.5px] md:text-[7.5px] font-sans font-light uppercase tracking-wider text-amber-100 opacity-80 leading-none">
                  {isAr ? product.subTitleArabic : product.subTitleEnglish}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Bottom Natural Herbs Footer Bar */}
          <div className="border-t border-stone-200 pt-1.5 flex justify-center items-center z-10">
            <span className="text-[7.5px] md:text-[8.5px] font-sans font-medium text-stone-500 tracking-widest uppercase">
              {isAr ? product.bottomTextArabic : product.bottomTextEnglish}
            </span>
          </div>

        </div>
      </div>
    );
  };

  return (
    <section 
      id="unique-flavors-showcase" 
      className="relative min-h-screen w-full bg-gradient-to-b from-[#fbf9f6] via-[#f7f4ee] to-[#f2eee6] text-stone-900 flex flex-col justify-between py-16 md:py-24 overflow-hidden md:cursor-none select-none"
      dir={isAr ? 'rtl' : 'ltr'}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSectionClick}
    >
      {/* 1. Header Portion with the hanging tea bag representation */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-20">
        
        {/* Hanging Tea Bag String from ceiling */}
        <div className="flex flex-col items-center justify-center -mt-16 md:-mt-24 mb-6">
          <div className="w-[1.5px] h-20 md:h-28 bg-[#8e7046]/25" />
          <div className="w-12 h-14 rounded-md border-[2.5px] border-[#8e7046]/30 flex items-center justify-center bg-white/40 backdrop-blur-xs shadow-xs">
            <div className="w-3 h-3 rounded-full bg-[#8e7046]/45" />
          </div>
        </div>

        {/* Brand label */}
        <span className="block text-[11px] md:text-[12.5px] uppercase tracking-[0.4em] font-sans font-semibold text-[#8e7046]/70">
          {isAr ? 'تـشـكـيـلـة الـشـاي الـمـلـكـي' : 'ROYAL TEA COLLECTION'}
        </span>

        {/* Title "Unique Products" with the asterisk */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-stone-900 flex items-center justify-center relative">
          <span>{isAr ? 'منتجات فريدة' : 'Unique Products'}</span>
          <span className="text-[#8e7046] text-lg md:text-2xl ml-1 md:ml-2 -mt-4 md:-mt-6">*</span>
        </h2>

        {/* Descriptive subtitle */}
        <p className="text-stone-600 font-sans font-light text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          {isAr 
            ? 'اكتشف تشكيلة علب الشاي العشبي الفاخرة، المصممة خصيصاً بمكونات برية طبيعية لدعم عافيتك وصحتك البدنية.'
            : 'Explore our prestigious organic herbal tea box selection, meticulously balanced to optimize natural health and holistic wellness.'}
        </p>
      </div>

      {/* 2. Panoramic Carousel Slider Area & Descriptions Combined */}
      <div className="relative w-full flex-1 my-8 md:my-12 flex flex-col items-center justify-center gap-10 z-10">
        
        {/* Giant Dynamic Thin Typography Label in Background */}
        <div className="absolute inset-x-0 top-[35%] -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 0.14, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="text-center w-full py-6"
            >
              <h3 className="font-serif text-[4.5rem] sm:text-[6.5rem] md:text-[10rem] lg:text-[12rem] font-black tracking-widest text-stone-950 leading-normal whitespace-nowrap uppercase">
                {isAr ? activeProduct.bgTextAr : activeProduct.bgText}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Central Radial Light Glow behind the cans */}
        <div className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full bg-[#8e7046]/8 blur-[80px] pointer-events-none z-0" />

        {/* Coordinated Interactive Tea Boxes Stage flanked by Left and Right Arrow Buttons */}
        <div className="relative w-full flex items-center justify-center gap-4 sm:gap-10 md:gap-16 max-w-4xl px-4 z-10">
          
          {/* Left Arrow Button */}
          <button
            id="prev-flavor-btn"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-stone-200 bg-white/80 hover:bg-white text-[#8e7046] hover:text-[#765d3b] shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 z-30"
            aria-label="Previous product"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Coordinated Interactive Tea Boxes Stage */}
          <div
            className="relative w-[340px] md:w-[480px] aspect-[656/438] flex items-center justify-center overflow-visible z-10"
            style={{ perspective: '1400px' }}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeProduct.id}
                custom={direction}
                initial={{
                  y: '-120%',
                  rotateX: 52,
                  rotateY: direction === 1 ? -14 : 14,
                  scale: 0.68,
                  opacity: 0,
                  zIndex: 10,
                }}
                animate={{
                  y: 0,
                  rotateX: 11,
                  rotateY: -6,
                  rotateZ: 1.5,
                  scale: 1,
                  opacity: 1,
                  zIndex: 30,
                }}
                exit={{
                  y: '90%',
                  rotateX: -38,
                  rotateY: direction === 1 ? 12 : -12,
                  scale: 0.72,
                  opacity: 0,
                  zIndex: 10,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 95,
                  damping: 16,
                  mass: 0.9,
                }}
                className="absolute flex flex-col items-center justify-center select-none [transform-style:preserve-3d]"
                style={{ transformPerspective: 1400 }}
              >
                {/* Ground shadow */}
                <motion.div
                  className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-[72%] h-6 md:h-8 rounded-[100%] bg-black/30 blur-xl pointer-events-none -z-10"
                  initial={{ scaleX: 0.4, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.55 }}
                  exit={{ scaleX: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Floating 3D idle motion */}
                <motion.div
                  className="[transform-style:preserve-3d]"
                  animate={{
                    y: [0, -12, 0],
                    rotateX: [11, 7, 11],
                    rotateY: [-6, -3, -6],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {renderPremiumBox(activeProduct)}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            id="next-flavor-btn"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-stone-200 bg-white/80 hover:bg-white text-[#8e7046] hover:text-[#765d3b] shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 z-30"
            aria-label="Next product"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

        </div>

        {/* Active Box details - Nested inside the same container block */}
        <div className="text-center space-y-2 max-w-xl px-6 relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-stone-900">
                {isAr ? activeProduct.nameAr : activeProduct.name}
              </h4>
              <p className="text-stone-600 text-xs md:text-sm font-sans font-normal leading-relaxed mt-2.5">
                {isAr ? activeProduct.descriptionAr : activeProduct.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Dynamic Custom Cursor Follower */}
      {isHovered && (
        <motion.div
          style={{
            position: 'fixed',
            left: mousePos.x,
            top: mousePos.y,
            x: '-50%',
            y: '-50%',
          }}
          className="pointer-events-none hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-[#8e7046]/20 bg-[#8e7046]/5 backdrop-blur-xs z-50 select-none shadow-[0_0_20px_rgba(142,112,70,0.05)]"
          animate={{
            scale: 1,
            opacity: 1,
          }}
          initial={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.3 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#8e7046]/60" />
        </motion.div>
      )}
    </section>
  );
}

