/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useInView, AnimatePresence } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Language } from '../types';
import { PARTNER_LOGOS } from '../data/partnerLogos';

interface PartnerLogosProps {
  lang: Language;
}

/* ------------------------------------------------------------------ */
/*  Main Component — Animated Logo Grid                               */
/* ------------------------------------------------------------------ */

export default function PartnerLogos({ lang }: PartnerLogosProps) {
  const isAr = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="partner-logos-section"
      className="relative py-20 sm:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        background:
          'linear-gradient(168deg, #f9f6f1 0%, #fbf9f6 40%, #f5f0e8 100%)',
      }}
    >
      {/* Decorative top border — sweeps in */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(197,168,128,0.5), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Floating gold particles */}
      <FloatingParticles />

      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-14 sm:mb-16"
        >
          <motion.p
            className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.35em] text-[#b3946a] mb-4"
            style={{ fontWeight: 500 }}
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.35em' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isAr ? 'شركاؤنا والشهادات' : 'Partners & Certifications'}
          </motion.p>

          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-stone-900 tracking-wide leading-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isAr ? 'الشركات التي نتعاون معها' : 'Companies We Work With'}
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="h-px bg-[#c5a880]/40"
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-[#c5a880]"
              animate={isInView ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="h-px bg-[#c5a880]/40"
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </motion.div>

          <motion.p
            className="text-stone-400 text-sm sm:text-[0.9rem] max-w-lg mx-auto leading-relaxed mt-5 font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {isAr
              ? 'نفخر بالتعاون مع أبرز المؤسسات والجهات المعتمدة عالمياً في مجال الجودة والاستدامة.'
              : 'Proudly collaborating with leading global organizations in quality, safety, and sustainability.'}
          </motion.p>
        </motion.div>

        {/* Logo Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {PARTNER_LOGOS.map((logo, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            // Wave delay: diagonal sweep from top-left
            const delay = 0.6 + (row + col) * 0.06;

            return (
              <motion.div
                key={logo.id}
                className="group relative bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-lg p-4 sm:p-5 flex items-center justify-center aspect-[4/3] cursor-default hover:z-10"
                initial={{ opacity: 0, y: 30, scale: 0.85, rotateX: 15 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                      }
                    : {}
                }
                transition={{
                  delay,
                  duration: 0.55,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: '0 16px 40px -8px rgba(197,168,128,0.3)',
                  borderColor: 'rgba(197,168,128,0.6)',
                  backgroundColor: 'rgba(255,255,255,1)',
                  transition: { type: 'spring', stiffness: 300, damping: 18 },
                }}
                onHoverStart={() => setHoveredId(logo.id)}
                onHoverEnd={() => setHoveredId(null)}
                style={{ perspective: 800 }}
              >
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 35%, rgba(197,168,128,0.08) 42%, rgba(255,255,255,0.25) 50%, rgba(197,168,128,0.08) 58%, transparent 65%)',
                      animation: 'shimmer-sweep 1.5s ease-in-out',
                    }}
                  />
                </div>

                {/* Gold glow ring on hover */}
                <AnimatePresence>
                  {hoveredId === logo.id && (
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(197,168,128,0.12) 0%, transparent 70%)',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Logo image */}
                <img
                  src={logo.src}
                  alt={isAr ? logo.altAr : logo.alt}
                  className="max-h-11 sm:max-h-13 max-w-full w-auto object-contain transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />

                {/* Tooltip */}
                <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-bottom-1 transition-all duration-300 pointer-events-none text-[10px] text-stone-500 font-sans whitespace-nowrap bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md border border-stone-100/80 z-10">
                  {isAr ? logo.altAr : logo.alt}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative bottom border */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(197,168,128,0.3), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating gold particles                                           */
/* ------------------------------------------------------------------ */

function FloatingParticles() {
  // Stable values — no Math.random() during render
  const particles = [
    { id: 0, left: '12%', size: 3, delay: 0, duration: 5 },
    { id: 1, left: '24%', size: 4, delay: 0.8, duration: 6 },
    { id: 2, left: '35%', size: 2, delay: 1.5, duration: 4.5 },
    { id: 3, left: '48%', size: 3.5, delay: 2.2, duration: 5.5 },
    { id: 4, left: '60%', size: 2.5, delay: 3, duration: 4.8 },
    { id: 5, left: '72%', size: 3, delay: 3.7, duration: 6.2 },
    { id: 6, left: '83%', size: 4, delay: 4.4, duration: 5.3 },
    { id: 7, left: '92%', size: 2, delay: 5, duration: 4.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#c5a880]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            bottom: -10,
          }}
          animate={{
            y: [0, -400, -600],
            opacity: [0, 0.35, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
