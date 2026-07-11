/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronDown, Check, Loader2 } from 'lucide-react';
import { Language, ActivePanel } from '../types';
import SiteFooter from './SiteFooter';

interface ContactPageProps {
  lang: Language;
  onClose: () => void;
  onOpenPanel: (panel: ActivePanel) => void;
  cartCount: number;
}

export default function ContactPage({ lang, onClose, onOpenPanel, cartCount }: ContactPageProps) {
  const isAr = lang === 'ar';

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: ''
  });
  
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle CAPTCHA checkbox click
  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChecked) {
      setFormError(isAr ? 'يرجى تأكيد أنك لست برنامج روبوت أولاً.' : 'Please verify you are not a robot first.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const fullMessage = [
      formData.title ? `${isAr ? 'اللقب' : 'Title'}: ${formData.title}` : '',
      formData.subject ? `${isAr ? 'الموضوع' : 'Subject'}: ${formData.subject}` : '',
      formData.message,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          message: fullMessage,
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

      setSubmitted(true);
      setFormData({
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        subject: '',
        message: '',
      });
      setCaptchaChecked(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : isAr
            ? 'عذراً، حدث خطأ أثناء إرسال رسالتك.'
            : 'Sorry, an error occurred while sending your message.';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Flower field background image from project assets
  const bannerImage = '/src/assets/images/chamomile_irrigation_field_1783414904690.jpg';

  return (
    <motion.div
      id="contact-full-page"
      className="fixed inset-0 z-30 overflow-y-auto bg-stone-900 text-stone-800 scrollbar-thin select-none pt-24 md:pt-32"
      dir="rtl" // Force RTL to preserve the exact Arabic layout of the uploaded image
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    >
      {/* 2. HEADER HERO BANNER (Orange flower field background) */}
      <section 
        id="contact-hero-banner"
        className="relative -mt-24 md:-mt-32 h-[calc(55vh+6rem)] md:h-[calc(55vh+8rem)] min-h-[calc(350px+6rem)] md:min-h-[calc(350px+8rem)] w-full flex items-center justify-center overflow-hidden bg-stone-900 text-white"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt="Royal Herbs Chamomile Field"
            className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette/shading overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
        </div>

        {/* Center Title */}
        <div className="relative z-10 text-center space-y-3 px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-md select-text"
          >
            ابقى على تواصل
          </motion.h1>
        </div>

        {/* Chevron down indicator */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/80" />
        </div>
      </section>

      {/* 3. CONTACT INFO (Orange Box) & MAP (Split Grid) */}
      <section id="info-map-section" className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white">
        
        {/* Left: Contact Info Orange Box (Col span 5) */}
        <div className="lg:col-span-5 bg-[#f59e1d] p-8 sm:p-12 md:p-16 flex flex-col justify-center text-white text-right">
          <div className="max-w-md mx-auto lg:mx-0 w-full space-y-10">
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide border-b border-white/20 pb-4">
              الاتصال بنا
            </h2>

            {/* Contact details with icons aligned on the right */}
            
          </div>
        </div>

        {/* Right: Live Interactive Google Maps Embed (Col span 7) */}
        <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-auto w-full bg-stone-100 overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9150604169654!2d31.1834222!3d29.9329444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847cd3ef396ab%3A0x8673f8ff52ff372a!2sRoyal%20Herbs!5e0!3m2!1sar!2seg!4v1783411234222"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '450px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="خريطة مقر رويال هيربس"
            className="w-full h-full filter saturate-[0.85] contrast-[1.02]"
          />
        </div>

      </section>

      {/* 4. SEND US A MESSAGE FORM (Light lime background section) */}
      <section 
        id="send-message-section"
        className="bg-[#cfdfa0] py-16 px-6 sm:px-12 md:px-24 border-t border-[#cfdfb5]"
      >
        <div className="max-w-3xl mx-auto space-y-10 text-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-snug">
            أرسل لنا رسالة
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              
              {/* Row 1: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    name="phone"
                    required
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="رقم الهاتف"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Row 2: Name & Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="الاسم"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="الموضوع"
                    className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs"
                  />
                </div>
              </div>

              {/* Textarea: Message */}
              <div className="space-y-1">
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="الرسالة"
                  className="w-full px-4 py-3 bg-white border border-stone-200/50 text-stone-900 rounded-sm focus:ring-2 focus:ring-[#8e7046] focus:border-transparent outline-none text-right placeholder-stone-400 font-sans text-sm md:text-base shadow-2xs h-36 resize-none"
                />
              </div>

              {/* Error block if any */}
              {formError && (
                <div className="text-red-700 font-bold text-xs bg-red-100/80 px-4 py-2 rounded-sm border border-red-200">
                  {formError}
                </div>
              )}

              {/* 5. GORGEOUS CUSTOM RECAPTCHA WIDGET */}
              <div className="flex justify-end pt-2">
                <div 
                  onClick={handleCaptchaClick}
                  className={`bg-stone-50 border border-stone-300/80 rounded-sm p-3.5 flex items-center justify-between w-full max-w-[310px] shadow-xs cursor-pointer select-none hover:bg-stone-100 transition-colors ${
                    captchaChecked ? 'border-emerald-500 bg-emerald-50/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="relative flex items-center justify-center w-7 h-7">
                      {captchaLoading ? (
                        <Loader2 className="w-5 h-5 text-[#8e7046] animate-spin" />
                      ) : captchaChecked ? (
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-scale-up">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-stone-300 rounded bg-white hover:border-stone-400 transition-colors" />
                      )}
                    </div>
                    <span className="text-xs font-sans font-semibold text-stone-700">
                      {captchaChecked ? 'تم التحقق بنجاح' : 'أنا لست برنامج روبوت'}
                    </span>
                  </div>

                  {/* reCAPTCHA Brand logo */}
                  <div className="flex flex-col items-center space-y-0.5 opacity-90 pr-1">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" fill="#4285f4" />
                    </svg>
                    <span className="text-[7.5px] text-stone-400 font-bold tracking-tight">reCAPTCHA</span>
                    <span className="text-[6px] text-stone-300 leading-none">الخصوصية - الشروط</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8e7046] hover:bg-[#725a38] disabled:bg-stone-400 text-white py-4 px-12 text-center uppercase tracking-widest font-bold text-sm transition-all shadow-md hover:shadow-lg rounded-sm cursor-pointer transform active:scale-98 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
                </button>
              </div>

            </form>
  
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 border border-white/50 rounded-lg p-10 max-w-lg mx-auto text-center space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-scale-up">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                تم الإرسال بنجاح!
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                شكراً لتواصلك معنا يا <span className="font-bold">{formData.name || 'عزيزنا'}</span>. لقد تم استلام استفسارك بنجاح وسيقوم فريق رويال هيربس بالتواصل معك عبر البريد الإلكتروني في غضون ٢٤ ساعة.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-widest font-bold text-[#8e7046] hover:underline pt-2 cursor-pointer block mx-auto"
              >
                إرسال استفسار آخر
              </button>
            </motion.div>
          )}

        </div>
      </section>

      <SiteFooter onOpenPanel={onOpenPanel} activePanel="contact" />

    </motion.div>
  );
}
