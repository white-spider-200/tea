/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, Send, CheckCircle, 
  Award, Search, Check, Gift 
} from 'lucide-react';
import { ActivePanel, Language, CartItem, TeaProduct } from '../types';
import { TEA_PRODUCTS, TRANSLATIONS } from '../data';
import BreathingRitual from './BreathingRitual';

interface ActivePanelDrawerProps {
  panel: ActivePanel;
  onClose: () => void;
  lang: Language;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: TeaProduct) => void;
  onOpenProductDetail: (product: TeaProduct) => void;
  onCheckout: (info?: { simulated?: boolean; message?: string; recipient?: string }) => void;
}

export default function ActivePanelDrawer({
  panel,
  onClose,
  lang,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onOpenProductDetail,
  onCheckout,
}: ActivePanelDrawerProps) {
  const SALES_EMAIL = 'mhindi@trusttechlimited.com';
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // Shop states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Search states
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactLocation, setContactLocation] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!panel) return null;

  // Drawer slide animations based on RTL / LTR direction
  const drawerVariants = {
    hidden: { x: isAr ? '-100%' : '100%', opacity: 0.95 },
    visible: { x: 0, opacity: 1 },
    exit: { x: isAr ? '-100%' : '100%', opacity: 0.95 },
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError(null);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          location: contactLocation,
          message: contactMessage,
          isAr,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isAr ? 'فشل إرسال الرسالة. يرجى المحاولة لاحقاً.' : 'Failed to send message. Please try again.')
        );
      }

      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactLocation('');
      setContactMessage('');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : isAr
            ? 'عذراً، حدث خطأ أثناء إرسال رسالتك.'
            : 'Sorry, an error occurred while sending your message.';
      setContactError(message);
    } finally {
      setContactSubmitting(false);
    }
  };

  // Filter teas for Shop
  const shopCategories = ['All', 'Black', 'Herbal'];
  const shopCategoriesAr = ['الكل', 'أسود', 'عشبي'];

  const filteredTeas = TEA_PRODUCTS.filter((tea) => {
    if (selectedCategory === 'All') return true;
    return tea.category === selectedCategory;
  });

  // Filter teas for Search
  const searchedTeas = TEA_PRODUCTS.filter((tea) => {
    const q = searchQuery.toLowerCase();
    return (
      tea.name.toLowerCase().includes(q) ||
      tea.nameAr.includes(q) ||
      tea.origin.toLowerCase().includes(q) ||
      tea.originAr.includes(q) ||
      tea.description.toLowerCase().includes(q) ||
      tea.descriptionAr.includes(q) ||
      tea.category.toLowerCase().includes(q) ||
      tea.categoryAr.includes(q)
    );
  });

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleEmailOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          cartItems,
          cartTotal,
          isAr
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || (isAr ? 'فشل إرسال الطلب. يرجى المحاولة لاحقاً.' : 'Failed to send the order. Please try again.'));
      }
      
      // Trigger success callback in App.tsx (passing server response info)
      onCheckout({
        simulated: data.simulated,
        message: data.message,
        recipient: data.recipient
      });
      
      // Reset state
      setCheckoutStep('cart');
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setCustomerAddress('');
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || (isAr ? 'عذراً، حدث خطأ أثناء إرسال طلبك.' : 'Sorry, an error occurred while placing your order.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="active-panel-drawer" className="fixed inset-0 z-[60] flex overflow-hidden">
      {/* Blurred Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/45 backdrop-blur-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <motion.div
        id="sliding-drawer-container"
        className={`absolute top-0 ${
          isAr ? 'left-0 border-r' : 'right-0 border-l'
        } h-full w-full sm:max-w-lg md:max-w-xl bg-white shadow-2xl flex flex-col z-50 border-stone-100 text-stone-800`}
        dir={isAr ? 'rtl' : 'ltr'}
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="w-2.5 h-2.5 rounded-full bg-tea-gold animate-pulse" />
            <h2 className="font-serif text-lg md:text-xl font-medium tracking-wide uppercase">
              {t[panel]}
            </h2>
          </div>
          <button
            id="close-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-stone-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8">
          {/* 1. SHOP PANEL */}
          {panel === 'shop' && (
            <div id="shop-drawer-view" className="space-y-6">
              {/* Category Pills */}
              <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto pb-2 scrollbar-none">
                {shopCategories.map((cat, idx) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all cursor-pointer border ${
                      selectedCategory === cat
                        ? 'bg-tea-charcoal text-white border-tea-charcoal shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isAr ? shopCategoriesAr[idx] : cat}
                  </button>
                ))}
              </div>

              {/* Product Grid inside drawer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredTeas.map((tea) => (
                  <div
                    key={tea.id}
                    id={`shop-item-${tea.id}`}
                    className="group border border-stone-100 rounded-xl overflow-hidden hover:border-stone-200 hover:shadow-md transition-all duration-300 flex flex-col bg-white"
                  >
                    {/* Thumbnail click opens full detail modal */}
                    <div 
                      className="relative h-44 overflow-hidden cursor-zoom-in bg-stone-100"
                      onClick={() => onOpenProductDetail(tea)}
                    >
                      <img
                        src={tea.image}
                        alt={isAr ? tea.nameAr : tea.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-stone-100/50">
                        <span className="text-[10px] font-sans font-semibold text-tea-gold uppercase">
                          {isAr ? tea.categoryAr : tea.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 
                          onClick={() => onOpenProductDetail(tea)}
                          className="font-serif font-semibold text-sm md:text-base text-stone-900 cursor-pointer hover:text-tea-gold transition-colors"
                        >
                          {isAr ? tea.nameAr : tea.name}
                        </h4>
                        <p className="text-stone-400 text-xs mt-1 font-serif line-clamp-1 italic">
                          "{isAr ? tea.taglineAr : tea.tagline}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-semibold text-stone-900 font-mono">
                          ${tea.price}.00
                        </span>
                        <button
                          id={`add-to-cart-drawer-${tea.id}`}
                          onClick={() => onAddToCart(tea)}
                          className="px-3 py-1.5 rounded bg-stone-50 hover:bg-tea-charcoal text-stone-700 hover:text-white text-[10px] uppercase font-bold tracking-wider transition-all border border-stone-200 cursor-pointer"
                        >
                          {isAr ? 'أضف للسلة' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. CART PANEL */}
          {panel === 'cart' && (
            <div id="cart-drawer-view" className="flex flex-col h-full justify-between">
              {cartItems.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-stone-300 stroke-1" />
                  <p className="text-stone-500 text-sm italic">{t.cartEmpty}</p>
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className="text-xs uppercase tracking-widest font-semibold text-tea-gold hover:text-tea-gold-dark mt-2 underline"
                  >
                    {isAr ? 'بدء تصفح الشاي الآن' : 'Start Browsing Our Teas'}
                  </button>
                </div>
              ) : checkoutStep === 'cart' ? (
                <div className="space-y-6">
                  {/* Cart List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        id={`cart-row-${item.product.id}`}
                        className="flex items-center space-x-4 space-x-reverse border-b border-stone-100 pb-4"
                      >
                        <img
                          src={item.product.image}
                          alt={isAr ? item.product.nameAr : item.product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-stone-100 bg-stone-50"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="font-serif font-medium text-sm text-stone-900">
                            {isAr ? item.product.nameAr : item.product.name}
                          </h4>
                          <span className="block text-xs text-stone-500 font-mono">
                            ${item.product.price}.00
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center space-x-1.5 space-x-reverse border border-stone-200 rounded px-1 py-0.5 bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 text-stone-500 hover:text-stone-800 flex items-center justify-center text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-semibold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 text-stone-500 hover:text-stone-800 flex items-center justify-center text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title={isAr ? 'إزالة' : 'Remove'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Box */}
                  <div className="border-t border-stone-100 pt-6 space-y-3.5">
                    <div className="flex items-center justify-between text-sm text-stone-500">
                    </div>
                    <div className="flex items-center justify-between text-base font-semibold text-stone-900 border-b border-stone-100 pb-4">
                      <span>المجموع الكلي</span>
                      <span className="font-mono text-lg">{cartTotal} JOD</span>
                    </div>

                    <button
                      id="checkout-btn"
                      onClick={() => setCheckoutStep('form')}
                      className="w-full py-4 rounded-lg bg-tea-charcoal hover:bg-tea-gold text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <span>{isAr ? 'الاستمرار لإتمام الطلب بالبريد' : 'Proceed to Email Checkout'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Checkout Form */
                <form onSubmit={handleEmailOrderSubmit} className="space-y-5">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2">
                    <div className="border-t border-stone-200/60 pt-2 text-xs font-mono text-stone-600 space-y-1">
                      {cartItems.map(item => (
                        <div key={item.product.id} className="flex justify-between">
                          <span>{isAr ? item.product.nameAr : item.product.name} x {item.quantity}</span>
                          <span>${item.product.price * item.quantity}.00</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold border-t border-stone-200/40 pt-1.5 text-stone-900">
                        <span>{isAr ? 'المجموع الكلي' : 'Total Amount'}</span>
                        <span>${cartTotal}.00</span>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100 leading-normal">
                      <strong>{isAr ? 'خطأ:' : 'Error:'}</strong> {submitError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                        {isAr ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                        {isAr ? 'البريد الإلكتروني' : 'Your Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                        {isAr ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        disabled={isSubmitting}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+966 50 000 0000"
                        className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                        {isAr ? 'عنوان الشحن الكامل' : 'Full Shipping Address'}
                      </label>
                      <textarea
                        required
                        disabled={isSubmitting}
                        rows={3}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={isAr ? 'البلد، المدينة، الشارع، تفاصيل الحي والرمز البريدي...' : 'Country, City, Street, Postal Code...'}
                        className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setCheckoutStep('cart')}
                      className="w-full py-3 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isAr ? 'رجوع للسلة' : 'Back to Cart'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-lg bg-[#8e7046] hover:bg-tea-charcoal text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>{isAr ? 'جاري الإرسال...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <span>{isAr ? 'إرسال الطلب مباشر' : 'Place Order'}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 3. ABOUT PANEL */}
          {panel === 'about' && (
            <div id="about-drawer-view" className="space-y-6">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800"
                  alt="Tea harvesting"
                  className="w-full h-48 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide">
                  {isAr ? 'فن الشاي البطيء والأصيل' : 'The Art of Slow Brewing'}
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  {isAr
                    ? 'في "شاي أسوشيتس" (Tea Associates)، نؤمن بأن كوب الشاي اليومي الخاص بك لا يجب أن يكون مجرد عادة عابرة، بل طقساً فريداً للوعي والهدوء. نحن نختار أوراق الشاي بعناية فائقة من مزارع صغيرة تلتزم بالزراعة العضوية والمستدامة.'
                    : 'At Tea Associates, we believe your everyday cup of tea is a sacred catalyst for slowness and mindfulness. We partner exclusively with micro-estate organic farmers who preserve traditional shade-growing and hand-rolling methods.'}
                </p>
              </div>

              <div className="border-t border-stone-100 pt-5 space-y-4">
                <h4 className="font-serif font-semibold text-sm tracking-wide text-stone-900">
                  {isAr ? 'التزاماتنا البيئية المستدامة' : 'Our Sourcing Pledges'}
                </h4>
                <div className="grid grid-cols-1 gap-3.5 text-xs text-stone-600">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-5 h-5 rounded-full bg-tea-gold/15 flex items-center justify-center text-tea-gold mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="font-semibold block text-stone-800">
                        {isAr ? 'خالٍ من البلاستيك بنسبة ١٠٠٪' : '100% Plastic-free Bags'}
                      </span>
                      <span>
                        {isAr ? 'أكياس الشاي الهرمية لدينا مصنوعة من نشا الذرة غير المعدل وراثياً والقابل للتحلل بالكامل.' : 'Our pyramid mesh sachets are woven entirely from non-GMO plant starch, fully compostable.'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-5 h-5 rounded-full bg-tea-gold/15 flex items-center justify-center text-tea-gold mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="font-semibold block text-stone-800">
                        {isAr ? 'شراكات التجارة المباشرة' : 'Direct Trade Sourcing'}
                      </span>
                      <span>
                        {isAr ? 'نشتري الشاي مباشرة من المزارعين لضمان حصولهم على أسعار عادلة تتجاوز أسعار السوق التقليدية.' : 'We direct-trade with each micro-lot owner, guaranteeing prices far above generic industry fair-trade caps.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. INSPIRATION PANEL */}
          {panel === 'inspiration' && (
            <div id="inspiration-drawer-view" className="space-y-8">
              {/* Mindfulness Breather component */}
              <BreathingRitual lang={lang} />

              {/* Tea Pairing recommendations */}
              <div className="border-t border-stone-100 pt-6 space-y-4">
                <h4 className="font-serif font-semibold text-sm tracking-wide text-stone-900">
                  {isAr ? 'مزاوجة نكهات الشاي والطقوس السليمة' : 'Steeping Guide & Pairings'}
                </h4>
                <div className="space-y-4 text-xs text-stone-600 leading-relaxed">
                  <div className="p-4 bg-stone-50 rounded-xl">
                    <span className="font-serif font-semibold text-stone-800 block text-sm mb-1">
                      {isAr ? 'طقوس هدوء المساء بالبابونج' : 'The Afternoon Reset Ritual'}
                    </span>
                    <p>
                      {isAr
                        ? 'قم بنقع البابونج العضوي لمدة ٦ دقائق كاملة. استنشق البخار الدافئ أثناء النقع واقرأ بضع صفحات من كتاب مفضل.'
                        : 'Infuse our Organic Chamomile for a full 6 minutes. Breathe the rich honeyed vapor in deeply, letting the warmth ground you.'}
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl">
                    <span className="font-serif font-semibold text-stone-800 block text-sm mb-1">
                      {isAr ? 'تأمل الماتشا الصباحي الحرفي' : 'The Morning Mindful Whisk'}
                    </span>
                    <p>
                      {isAr
                        ? 'استخدم الماء بدرجة حرارة ٨٠ مئوية. انخل الماتشا واخفقها ببطء على شكل حرف M حتى تحصل على رغوة مخملية سميكة.'
                        : 'Sift 2g of Ceremonial Matcha, add 80°C hot water, and whisk in a tight M-motion until a lush, emerald velvet foam forms.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. ACCOUNT PANEL */}
          {panel === 'account' && (
            <div id="account-drawer-view" className="space-y-6">
              <div className="bg-stone-50/60 border border-stone-100 rounded-xl p-5 space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-tea-gold/20 flex items-center justify-center text-tea-gold font-serif text-lg font-bold">
                    M
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-stone-900">
                      {isAr ? 'مرحباً بك مجدداً، محمد!' : 'Welcome back, Mohammed!'}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono">{SALES_EMAIL}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 border-t border-stone-200/60 pt-4 text-xs">
                  <div>
                    <span className="block text-stone-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">
                      {t.accountLoyalty}
                    </span>
                    <span className="font-semibold text-stone-800 flex items-center space-x-1 space-x-reverse">
                      <Award className="w-3.5 h-3.5 text-tea-gold" />
                      <span>{isAr ? 'متذوق ذهبي' : 'Gold Leaf Connoisseur'}</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-stone-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">
                      {t.accountPoints}
                    </span>
                    <span className="font-mono font-bold text-tea-gold-dark text-sm">
                      450 {isAr ? 'نقطة' : 'Pts'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reward offers */}
              <div className="space-y-4">
                <h4 className="font-serif font-semibold text-sm text-stone-900 tracking-wide">
                  {isAr ? 'المكافآت والخصومات المتاحة لك' : 'Available Club Rewards'}
                </h4>
                <div className="space-y-3">
                  <div className="p-4 border border-stone-100 rounded-xl flex items-center justify-between text-xs bg-white hover:border-stone-200 transition-all">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Gift className="w-5 h-5 text-tea-gold" />
                      <div>
                        <span className="font-semibold block text-stone-800">
                          {isAr ? 'ماتشا أوجي يابانية مجانية' : 'Complimentary Uji Matcha Box'}
                        </span>
                        <span className="text-stone-400 text-[10px]">
                          {isAr ? 'يتطلب ٤٠٠ نقطة' : 'Requires 400 Pts'}
                        </span>
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded bg-tea-charcoal text-white font-semibold text-[10px] uppercase cursor-pointer">
                      {isAr ? 'استرداد' : 'Redeem'}
                    </button>
                  </div>

                  <div className="p-4 border border-stone-100 rounded-xl flex items-center justify-between text-xs bg-white hover:border-stone-200 transition-all opacity-75">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Gift className="w-5 h-5 text-stone-400" />
                      <div>
                        <span className="font-semibold block text-stone-800">
                          {isAr ? 'ملعقة قياس الشاي النحاسية' : 'Hand-carved Brass Tea Spoon'}
                        </span>
                        <span className="text-stone-400 text-[10px]">
                          {isAr ? 'يتطلب ٦٠٠ نقطة' : 'Requires 600 Pts'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-stone-400 uppercase">
                      {isAr ? 'غير كافٍ' : 'Locked'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. SEARCH PANEL */}
          {panel === 'search' && (
            <div id="search-drawer-view" className="space-y-6">
              <div className="relative">
                <Search className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} w-4.5 h-4.5 text-stone-400`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full py-2.5 ${
                    isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'
                  } text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold focus:bg-white transition-all`}
                />
              </div>

              {/* Searched Items Grid */}
              <div className="space-y-4">
                {searchedTeas.length > 0 ? (
                  searchedTeas.map((tea) => (
                    <div
                      key={tea.id}
                      id={`search-item-${tea.id}`}
                      className="flex items-center space-x-4 space-x-reverse border-b border-stone-100 pb-3 hover:bg-stone-50/50 p-1.5 rounded-lg transition-all"
                    >
                      <img
                        src={tea.image}
                        alt={isAr ? tea.nameAr : tea.name}
                        className="w-12 h-12 object-cover rounded-lg border border-stone-100 cursor-pointer"
                        onClick={() => onOpenProductDetail(tea)}
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 space-y-0.5">
                        <h4 
                          onClick={() => onOpenProductDetail(tea)}
                          className="font-serif font-semibold text-xs md:text-sm text-stone-900 cursor-pointer hover:text-tea-gold transition-colors"
                        >
                          {isAr ? tea.nameAr : tea.name}
                        </h4>
                        <span className="block text-[10px] text-stone-400 italic font-serif line-clamp-1">
                          {isAr ? tea.taglineAr : tea.tagline}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xs font-mono font-bold text-stone-800">
                          ${tea.price}
                        </span>
                        <button
                          id={`search-add-${tea.id}`}
                          onClick={() => onAddToCart(tea)}
                          className="p-1 rounded bg-stone-50 hover:bg-tea-charcoal text-stone-600 hover:text-white transition-colors border border-stone-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-stone-400 text-xs italic py-10">
                    {t.noResults}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 8. CONTACT PANEL */}
          {panel === 'contact' && (
            <div id="contact-drawer-view" className="space-y-6">
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                      {t.contactName}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={isAr ? 'محمد الحندي' : 'Mohammed Al-Handi'}
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                      {t.contactEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your-email@example.com"
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                      {t.contactPhone}
                    </label>
                    <input
                      type="tel"
                      required
                      disabled={contactSubmitting}
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+20 100 000 0000"
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold font-mono disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                      {t.contactLocation}
                    </label>
                    <input
                      type="text"
                      required
                      disabled={contactSubmitting}
                      value={contactLocation}
                      onChange={(e) => setContactLocation(e.target.value)}
                      placeholder={isAr ? 'المدينة، الدولة' : 'City, Country'}
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                      {t.contactMessage}
                    </label>
                    <textarea
                      required
                      rows={5}
                      disabled={contactSubmitting}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={isAr ? 'اكتب استفسارك هنا...' : 'How can we enhance your steeping ritual?'}
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-tea-gold disabled:opacity-60"
                    />
                  </div>

                  {contactError && (
                    <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100 leading-normal">
                      <strong>{isAr ? 'خطأ:' : 'Error:'}</strong> {contactError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-3.5 rounded-lg bg-tea-charcoal hover:bg-tea-gold disabled:bg-stone-300 text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{contactSubmitting ? (isAr ? 'جاري الإرسال...' : 'Sending...') : t.contactSubmit}</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <CheckCircle className="w-14 h-14 text-emerald-500 stroke-1" />
                  <h3 className="font-serif text-xl font-medium tracking-wide">
                    {isAr ? 'تم استلام رسالتك!' : 'Message Steeped Successfully!'}
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm max-w-sm leading-relaxed">
                    {t.contactSuccess}
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="text-xs uppercase tracking-widest font-semibold text-tea-gold hover:text-tea-gold-dark mt-2 underline"
                  >
                    {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
