/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { ActivePanel } from '../types';

interface SiteFooterProps {
  onOpenPanel: (panel: ActivePanel) => void;
  activePanel?: ActivePanel;
}

export default function SiteFooter({ onOpenPanel, activePanel = null }: SiteFooterProps) {
  const go = (panel: ActivePanel) => {
    onOpenPanel(panel);
  };

  return (
    <footer className="bg-[#4a3b2c] text-stone-200 py-16 px-6 sm:px-12 md:px-24 border-t border-stone-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Col 1: Explore */}
          <div className="space-y-4 text-right md:pr-10 border-b md:border-b-0 md:border-l border-white/10 pb-8 md:pb-0">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2 mb-2">
              استكشف
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => go(null)}
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('farms')}
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  مزارعنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('shop')}
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  منتجاتنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('sustainability')}
                  className="hover:text-[#f59e1d] transition-colors cursor-pointer text-right w-full"
                >
                  مسئوليتنا
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Stay in touch */}
          <div className="space-y-4 text-right md:px-10 border-b md:border-b-0 md:border-l border-white/10 pb-8 md:pb-0">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2 mb-2">
              ابقى على تواصل
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-center space-x-2.5 space-x-reverse text-stone-200 justify-start">
                <Phone className="w-4.5 h-4.5 text-[#f59e1d] shrink-0" />
                <a href="tel:19746" className="font-mono hover:underline">19746</a>
              </li>
              <li className="flex items-center space-x-2.5 space-x-reverse text-stone-200 justify-start">
                <Mail className="w-4.5 h-4.5 text-[#f59e1d] shrink-0" />
                <a href="mailto:info@royalherbs.com" className="font-mono hover:underline">info@royalherbs.com</a>
              </li>
              <li className="flex items-start space-x-2.5 space-x-reverse text-stone-200 justify-start">
                <MapPin className="w-4.5 h-4.5 text-[#f59e1d] mt-0.5 shrink-0" />
                <span className="leading-relaxed">اوتومان جروب، اعشاب رويال ش.م.م، شبرامنت، الجيزة، مصر</span>
              </li>
            </ul>
          </div>

          {/* Col 3: About */}
          <div className="space-y-4 text-right md:pl-10">
            <h4 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-white/10 pb-2 mb-2">
              تابعنا
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-300">
              شاي رويال أسوشيتس: تأسست عام ١٩٨٥ لتقديم أجود الأعشاب والمحاصيل الطبيعية الحرفية 
              بطريقة مستدامة ومسؤولة بيئياً ومجتمعياً.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/5 mt-12 pt-6 text-center text-[11px] text-stone-400 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 1985-2026 ROYAL HERBS ASSOCIATES. جميع الحقوق محفوظة.</span>
        <span className="flex items-center space-x-1 space-x-reverse">
          <span>صُنع بكل حب واستدامة في مصر</span>
        </span>
      </div>
    </footer>
  );
}
