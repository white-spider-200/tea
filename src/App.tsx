/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, HelpCircle } from 'lucide-react';
import { Language, ActivePanel, CartItem, TeaProduct } from './types';
import { TRANSLATIONS } from './data';
import Header from './components/Header';
import ActivePanelDrawer from './components/ActivePanelDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import UniqueFlavors from './components/UniqueFlavors';
import PartnerLogos from './components/PartnerLogos';
import FarmsStory from './components/FarmsStory';
import Sustainability from './components/Sustainability';
import ContactPage from './components/ContactPage';
import ShopPage from './components/ShopPage';
import SiteFooter from './components/SiteFooter';

// Reference the generated background image as a static path
const heroVideo = '/src/assets/videos/2022__02__Home-Intro-Compressed.mp4';

export default function App() {
  // Global States
  const [language, setLanguage] = useState<Language>('ar');

  // Helper functions for SEO-friendly custom path-based routing
  const pathnameToPanel = (path: string): ActivePanel => {
    const cleanPath = path.replace(/^\/|\/$/g, '');
    if (!cleanPath) return null;
    const validPanels: Exclude<ActivePanel, null>[] = [
      'shop', 'about', 'inspiration', 'contact', 'account', 'search', 'cart', 'sustainability', 'farms'
    ];
    if (validPanels.includes(cleanPath as any)) {
      return cleanPath as ActivePanel;
    }
    return null;
  };

  const panelToPathname = (panel: ActivePanel): string => {
    return panel ? `/${panel}` : '/';
  };

  const [activePanel, setActivePanelState] = useState<ActivePanel>(() => {
    return pathnameToPanel(window.location.pathname);
  });

  const setActivePanel = (panel: ActivePanel) => {
    setActivePanelState(panel);
    const newPath = panelToPathname(panel);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePanelState(pathnameToPanel(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<TeaProduct | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState<{ simulated?: boolean; message?: string; recipient?: string } | null>(null);

  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  // Helper: toggle language (retained for backward compatibility but disabled)
  const handleLanguageToggle = () => {
    // Locked to Arabic
  };

  // Helper: add item to shopping cart
  const handleAddToCart = (product: TeaProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Optionally auto-open cart panel on add so user gets instant visual confirmation
    setActivePanel('cart');
  };

  // Helper: update item quantity in cart
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Helper: remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Helper: simulate checkout
  const handleCheckout = (info?: { simulated?: boolean; message?: string; recipient?: string }) => {
    setCheckoutInfo(info || null);
    setCheckoutSuccess(true);
    setCartItems([]); // empty the cart on successful checkout
    setActivePanel(null); // close the drawer
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic overlays & layouts based on language alignment
  const textAlignmentClass = isAr ? 'text-right' : 'text-left';
  const flexAlignmentClass = isAr ? 'items-end' : 'items-start';
  const overlayGradient = 'bg-gradient-to-t from-black/90 via-black/50 to-black/30';

  return (
    <div
      id="app-root-viewport"
      className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth font-sans select-none bg-stone-950 text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* PERSISTENT HEADER NAVIGATION BAR */}
      <Header
        lang={language}
        onLanguageToggle={handleLanguageToggle}
        onOpenPanel={setActivePanel}
        cartCount={cartCount}
        activePanel={activePanel}
      />

      {/* SECTION 1: THE IMPERIAL HERO LANDING */}
      <section id="hero-section" className="relative h-screen w-full flex flex-col overflow-hidden">
        {/* 1. IMMERSIVE HERO BACKGROUND VIDEO */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-[1.02]"
          />
          {/* Cinematic overlay — heavier at bottom for text readability */}
          <div className={`absolute inset-0 z-10 ${overlayGradient}`} />
          {/* Subtle vignette for cinematic depth */}
          <div className="absolute inset-0 z-11" style={{ boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.4)' }} />
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fbf9f6] via-[#fbf9f6]/60 to-transparent z-15 pointer-events-none" />
        </div>

        {/* HERO CONTENT — pushed to bottom-center for cinematic video feel */}
        <main
          id="hero-content"
          className={`relative z-20 flex-1 w-full px-6 sm:px-10 lg:px-20 flex flex-col justify-end ${isAr ? 'items-start' : 'items-end'} ${textAlignmentClass} pb-40 sm:pb-44`}
        >
          <div className="space-y-5 md:space-y-6" style={{ maxWidth: '640px' }}>

            {/* Main headline */}
            <motion.h3
              id="hero-headline"
              className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white leading-[1.1]"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              {t.heroTitle}
            </motion.h3>
       

            {/* Subtitle */}
            <motion.p
              id="hero-subheading"
              className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-md"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {t.heroSubtitle}
            </motion.p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="pt-1"
            >
              <button
                id="hero-cta-btn"
                onClick={() => setActivePanel('shop')}
                className="group px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-stone-950 hover:border-white transition-all duration-300 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white cursor-pointer hover:shadow-xl transform active:scale-95"
              >
                {t.heroButton}
              </button>
            </motion.div>
          </div>
        </main>

      </section>

      {/* SECTION 2: MAGNIFICENT INTERACTIVE UNIQUE FLAVORS CANNED SHOWCASE */}
      <UniqueFlavors lang={language} />

      {/* SECTION 3: COMPANIES WE WORK WITH */}
      <PartnerLogos lang={language} />

      {/* SITE-WIDE FOOTER (home scroll) */}
      <SiteFooter onOpenPanel={setActivePanel} activePanel={activePanel} />

      {/* 5. INTERACTIVE SIDE DRAWER PANELS (AnimatePresence handles slide exit) */}
      <AnimatePresence>
        {activePanel && activePanel !== 'sustainability' && activePanel !== 'contact' && activePanel !== 'farms' && activePanel !== 'shop' && (
          <ActivePanelDrawer
            panel={activePanel}
            onClose={() => setActivePanel(null)}
            onOpenPanel={setActivePanel}
            lang={language}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            onCheckout={handleCheckout}
          />
        )}
      </AnimatePresence>

      {/* 5.5. FULL PAGE SUSTAINABILITY COMPONENT */}
      <AnimatePresence>
        {activePanel === 'sustainability' && (
          <Sustainability
            lang={language}
            onClose={() => setActivePanel(null)}
            onOpenPanel={setActivePanel}
          />
        )}
      </AnimatePresence>

      {/* 5.6. FULL PAGE CONTACT COMPONENT */}
      <AnimatePresence>
        {activePanel === 'contact' && (
          <ContactPage
            lang={language}
            onClose={() => setActivePanel(null)}
            onOpenPanel={setActivePanel}
            cartCount={cartCount}
          />
        )}
      </AnimatePresence>

      {/* 5.7. FULL PAGE FARMS STORY COMPONENT */}
      <AnimatePresence>
        {activePanel === 'farms' && (
          <FarmsStory
            lang={language}
            onClose={() => setActivePanel(null)}
            onOpenPanel={setActivePanel}
          />
        )}
      </AnimatePresence>

      {/* 5.8. FULL PAGE SHOP COMPONENT */}
      <AnimatePresence>
        {activePanel === 'shop' && (
          <ShopPage
            lang={language}
            onClose={() => setActivePanel(null)}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            onOpenPanel={setActivePanel}
            cartCount={cartCount}
          />
        )}
      </AnimatePresence>

      {/* 6. DETAILED TEA PRODUCT MODAL (Activated from drawer click) */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            lang={language}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(prod) => {
              handleAddToCart(prod);
              setSelectedProduct(null); // close modal on add to let cart open
            }}
          />
        )}
      </AnimatePresence>

      {/* 7. CHECKOUT SUCCESS SIMULATION MODAL */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div id="checkout-success-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

            <motion.div
              className="bg-white rounded-lg w-full max-w-xs p-5 shadow-lg text-center relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                id="close-success-btn"
                onClick={() => {
                  setCheckoutSuccess(false);
                  setCheckoutInfo(null);
                }}
                className="absolute top-2 right-2 text-stone-400 hover:text-stone-700 w-8 h-8 flex items-center justify-center rounded-full bg-stone-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="mb-2 flex justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              {isAr ? (
                <div className="text-left" dir="ltr">
                  <h3 className="font-semibold text-lg text-stone-900 mb-2">
                    تم إرسال طلبك بنجاح!
                  </h3>
                  <p className="text-stone-600 text-sm mb-4">
                    تم استلام طلبك للمنتجات الفاخرة وسنتواصل معك قريباً لتأكيد الشحن.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-lg text-stone-900 mb-2">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-stone-600 text-sm mb-4">
                    Your order for premium, artisan teas has been submitted directly.
                  </p>
                </>
              )}

              <button
                onClick={() => {
                  setCheckoutSuccess(false);
                  setCheckoutInfo(null);
                }}
                className="w-full py-3 rounded-lg bg-tea-charcoal text-white text-xs uppercase tracking-widest font-bold hover:bg-[#8e7046] transition-colors cursor-pointer"
              >
                {isAr ? 'العودة للمتجر ' : 'Return to Slow Brewing'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
 
    </div>
  );
}
