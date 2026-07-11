import { motion } from 'motion/react';
import { X, Globe } from 'lucide-react';
import { Language, ActivePanel } from '../types';
import SiteFooter from './SiteFooter';

interface FarmsStoryProps {
  lang: Language;
  onClose: () => void;
  onOpenPanel: (panel: ActivePanel) => void;
}

export default function FarmsStory({ lang, onClose, onOpenPanel }: FarmsStoryProps) {
  const isAr = lang === 'ar';

  // Sourced images with correct timestamps
  const bannerImg = '/src/assets/images/farms_story_banner_1783414876355.jpg';
  const teaCupImg = '/src/assets/images/apothecary_herbal_tea_1783414891707.jpg';
  const fieldImg = '/src/assets/images/chamomile_irrigation_field_1783414904690.jpg';

  return (
    <motion.div
      id="farms-full-page"
      className="fixed inset-0 z-30 overflow-y-auto bg-[#fbf9f6] text-stone-900 scrollbar-thin select-none pt-24 md:pt-32"
      dir={isAr ? 'rtl' : 'ltr'}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    >
      {/* SECTION 1: OUR FARMS.. OUR STORY */}
      <section id="farms-story-intro" className="relative w-full overflow-hidden pb-16 -mt-24 md:-mt-32">
        
        {/* Banner with Aerial View of the Farm */}
        <div className="relative h-[calc(320px+6rem)] sm:h-[calc(400px+6rem)] md:h-[calc(480px+8rem)] w-full flex items-center justify-center">
          <img
            src={bannerImg}
            alt="Royal Farms Aerial View"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f6] via-transparent to-black/35" />
          
          <div className="relative z-10 text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white drop-shadow-md"
            >
              {isAr ? 'مزارعنا.. قصتنا' : 'Our Farms.. Our Story'}
            </motion.h2>
          </div>
        </div>

        {/* Floating/Overlapping Card with Farms Story Content */}
        <div className="max-w-6xl mx-auto px-4 -mt-16 sm:-mt-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-[#e4eccd]/95 hover:bg-[#e4eccd] transition-colors duration-500 rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-[#d6e0b7]/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Bold Egyptian Accent Statement */}
              <div className="md:col-span-5 border-stone-800/10 md:ltr:border-r md:rtl:border-l md:px-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                  {isAr 
                    ? 'دي مش مجرد صور حلوة لمناظر طبيعية، دي صور حقيقية من مزارعنا!' 
                    : 'These are not just beautiful landscape photos; they are real pictures of our actual farms!'}
                </h3>
              </div>

              {/* Meticulous Farmland Details */}
              <div className="md:col-span-7">
                <p className="font-sans font-normal text-stone-800 text-sm sm:text-base leading-relaxed">
                  {isAr 
                    ? 'على مدار ثلاثة وعشرين سنة، حولنا الصحرا لأرض خضرا. اخترنا المكان بعناية في مناطق بعيدة عن التلوث، وزودنا مساحة أراضينا لـ 8 آلاف فدان في محافظات الفيوم، والمنيا، والوادي الجديد، والواحات، وبني سويف، وأسيوط، وأسوان.' 
                    : 'Over twenty-three years, we turned barren desert into lush green fields. We chose our location with meticulous care in pristine regions far from pollution, expanding our farmland to 8,000 acres across the provinces of Fayoum, Minya, New Valley, Oases, Beni Suef, Assiut, and Aswan.'}
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: APOTHECARY SECTION */}
      <section id="apothecary-section" className="relative w-full min-h-[480px] sm:min-h-[580px] flex items-center py-20 overflow-hidden">
        
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={teaCupImg}
            alt="Herbal Tea Apothecary Background"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/70 to-stone-900/60" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-3xl space-y-8 text-white">
            
            <motion.div
              initial={{ opacity: 0, x: isAr ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-teal-400 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest block">
                {isAr ? 'تراثنا القديم' : 'OUR HISTORIC HERITAGE'}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide text-white">
                {isAr ? 'مستودع للأدوية' : 'The Living Apothecary'}
              </h2>
            </motion.div>

            {/* Split Paragraph Layout inside Glassmorphic card for extreme readability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <p className="font-sans font-light text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed">
                  {isAr 
                    ? "المدينة المصرية القديمة 'أبوتك' اللي كانت موجودة في صعيد مصر هي اللي ألهمت فكرة مزارعنا. في اللغة المصرية القديمة، كلمة 'أبوتك' معناها 'مستودع الأدوية'. المدينة دي كانت مشهورة باستخدامها للأعشاب في الحياة اليومية العادية لقرون طويلة." 
                    : "The ancient Egyptian city of 'Abutek' located in Upper Egypt inspired our farms' vision. In the ancient Egyptian language, 'Abutek' translates to 'apothecary' or 'medicine repository'. For centuries, this historic city was famous for integrating rich medicinal herbs into everyday life."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <p className="font-sans font-light text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed">
                  {isAr 
                    ? 'في مزارعنا بنستخدم أحدث التكنولوجيا الزراعية علشان ننتج أعشاب رائعة، زي الشمر الحلو، وعشب الليمون، والعرقسوس، وبلسم الليمون، والأذريون، والريحان، والكراوية، والهندباء، وقش الشوفان، والحلبة، والكزبرة، والبرسيم.' 
                    : 'On our farms, we use state-of-the-art agricultural technology to cultivate outstanding herbs, such as sweet fennel, lemongrass, licorice, lemon balm, calendula, basil, caraway, dandelion, oat straw, fenugreek, coriander, and clover.'}
                </p>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: YOUR NEEDS ARE WITH US */}
      <section id="wellness-needs-section" className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl overflow-hidden shadow-xl border border-stone-200/50">
          
          {/* Left Column: Chamomile Field Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 min-h-[300px] md:min-h-[400px] relative overflow-hidden group"
          >
            <img
              src={fieldImg}
              alt="Chamomile field in Egypt"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Right Column: Beautiful Solid Sage-Green Card */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-[#d1dfa2] flex flex-col justify-center p-8 sm:p-12 md:p-16 text-stone-900"
          >
            <div className="space-y-6">
              <span className="text-stone-700/80 font-sans font-bold text-xs sm:text-sm uppercase tracking-widest block">
                {isAr ? 'عناية كاملة وجودة فائقة' : 'HOLISTIC WELLNESS'}
              </span>
              
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-normal leading-tight text-stone-950">
                {isAr ? 'احتياجاتكم عندنا' : 'Your Needs, Met Fully'}
              </h2>
              
              <p className="font-sans font-normal text-stone-800 text-sm sm:text-base leading-relaxed">
                {isAr 
                  ? 'علشان دايماً بنحب نوازن مع الطبيعة والتكنولوجيا، بنستخدم التكنولوجيا الحديثة مع أساليب الزراعة التقليدية اللي ورثناها من قرون. بالطريقة دي، منتجاتنا بتكون عضوية (organic) وفي نفس الوقت بنحقق مستويات عالية من الكفاءة والجودة.' 
                  : 'Because we always strive to balance nature with technology, we combine modern agricultural tools with traditional farming methods inherited over centuries. Consequently, our products are completely organic while achieving the highest standards of efficiency and premium quality.'}
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      <SiteFooter onOpenPanel={onOpenPanel} activePanel="farms" />
    </motion.div>
  );
}

