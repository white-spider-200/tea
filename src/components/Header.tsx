/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Search, Globe } from 'lucide-react';
import { Language, ActivePanel } from '../types';
import { TRANSLATIONS } from '../data';

const BRAND_LOGO = '/src/assets/images/logo/2020__09__cropped-RH-favico-270x270.png';

interface HeaderProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenPanel: (panel: ActivePanel) => void;
  cartCount: number;
  activePanel: ActivePanel;
}

export default function Header({
  lang,
  onLanguageToggle,
  onOpenPanel,
  cartCount,
  activePanel,
}: HeaderProps) {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Solid style when scrolled OR inside any subfolder page
  const isSolid = isScrolled || activePanel !== null;

  // Left side nav items as requested
  const leftNavItems: ActivePanel[] = ['shop', 'farms', 'sustainability', 'contact'];

  const logoSize = isSolid
    ? 'w-[72px] h-[72px] md:w-[82px] md:h-[82px]'
    : 'w-[82px] h-[82px] md:w-[95px] md:h-[95px]';
  const navRowHeight = isSolid
    ? 'h-[72px] md:h-[82px]'
    : 'h-[82px] md:h-[95px]';

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none pt-0 ${
        isSolid
          ? 'bg-[#fdfcf9]/95 backdrop-blur-md text-stone-900 shadow-sm border-b border-stone-200/50 pb-3 md:pb-4 px-6 sm:px-12'
          : 'bg-transparent text-white/90 pb-5 md:pb-6 px-6 sm:px-12'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-start w-full">
        
        {/* Left Column: Navigation Links or Mobile Hamburger Toggle */}
        <div className={`flex items-center justify-start ${navRowHeight}`}>
          {/* Desktop Navigation Links with larger text and extra spacing */}
          <nav 
            id="desktop-left-nav" 
            className="hidden lg:flex items-center space-x-10 lg:space-x-12 space-x-reverse text-[14px] md:text-[15px] tracking-[0.24em] font-sans font-medium"
          >
            {leftNavItems.map((item) => (
              <button
                key={item}
                id={`nav-${item}`}
                onClick={() => onOpenPanel(item)}
                className={`transition-colors duration-300 cursor-pointer uppercase py-1 ${
                  isSolid ? 'hover:text-[#8e7046]' : 'hover:text-tea-gold'
                }`}
              >
                {t[item]}
              </button>
            ))}
          </nav>

          {/* Mobile Left: Menu Toggle Button */}
          <div className="lg:hidden">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              title={isAr ? 'القائمة' : 'Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Center Column: Brand Logo — absolutely flush with top edge, animated in */}
        <div
          className="flex items-start justify-center relative"
          style={{ height: '100%', minHeight: 0 }}
        >
          <div
            id="logo-brand-container"
            onClick={() => onOpenPanel(null)}
            className="cursor-pointer transition-transform duration-700 ease-[cubic-bezier(.6,-0.28,.735,.045)] will-change-transform absolute left-1/2 -translate-x-1/2 z-30"
            style={{
              top: 0,
              animation: 'slideDownLogo 1s cubic-bezier(.6,-0.28,.735,.045) 0.15s 1 both'
            }}
          >
            <img
              src={BRAND_LOGO}
              alt={isAr ? 'رويال هيربس - تأسس ١٩٨٥' : 'Royal Herbs - Est. 1985'}
              className={`object-contain object-top transition-all duration-500 drop-shadow-sm hover:drop-shadow-md ${logoSize}`}
              referrerPolicy="no-referrer"
              style={{ marginTop: 0 }}
            />
          </div>
          <style>
            {`
              @keyframes slideDownLogo {
                0% {
                  transform: translate(-50%, -120%) scale(0.96);
                  opacity: 0;
                }
                60% {
                  opacity: 1;
                  transform: translate(-50%, 7%) scale(1.07);
                }
                80% {
                  transform: translate(-50%, -2%) scale(0.98);
                }
                100% {
                  transform: translate(-50%, 0) scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
        </div>
  

        {/* Right Column: Cart Indicator */}
        <div className={`flex items-center justify-end ${navRowHeight}`}>
          <div 
            id="desktop-right-nav" 
            className="flex items-center text-[13.5px] md:text-[14.5px] tracking-[0.24em] font-sans font-medium"
          >
            {/* Cart Trigger (Plain text CART (0) matching the image exactly, no fill bubbles) */}
          <button
            onClick={() => onOpenPanel('cart')}
            className='flex items-center gap-2 px-4 py-2 rounded-full font-bold transition shadow-lg bg-gradient-to-tr from-tea-gold to-[#f5e8d6] hover:from-[#bda276] hover:to-[#ecd29c] ring-2 ring-[#d2ae6d]/80 hover:ring-[#8e7046] text-[#7a5a27] hover:text-[#5c4017] border border-[#ecd29c] focus:outline-none focus:ring-4 focus:ring-[#f7e2a2] animate-pulse'
            title={isAr ? `سلة التسوق (${cartCount})` : `Cart (${cartCount})`}
            style={{ minWidth: 112 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1124/1124199.png"
              alt={isAr ? "سلة التسوق" : "Cart"}
              style={{ width: 24, height: 24 }}
              className="drop-shadow"
            />
            <span className='text-base font-bold tracking-tight'>
              {isAr ? `سلة التسوق (${cartCount})` : `Cart (${cartCount})`}
            </span>
          </button>
    
          </div>
        </div>
  

      </div>

      {/* Collapsible Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          className={`lg:hidden absolute top-full inset-x-0 py-6 px-6 space-y-4 shadow-xl animate-fade-in ${
            isSolid 
              ? 'bg-[#fdfcf9]/95 backdrop-blur-md border-b border-stone-200/50 text-stone-900' 
              : 'bg-stone-950/95 backdrop-blur-md border-b border-white/5 text-white'
          }`}
        >
          <div className="flex flex-col space-y-3.5 text-xs uppercase tracking-[0.2em] font-sans font-medium text-right">
            {leftNavItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onOpenPanel(item);
                  setMobileMenuOpen(false);
                }}
                className={`transition-colors cursor-pointer border-b pb-2 w-full text-right ${
                  isSolid 
                    ? 'hover:text-[#8e7046] border-stone-100' 
                    : 'hover:text-tea-gold border-white/5'
                }`}
              >
                {t[item]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

