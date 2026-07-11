import React from 'react';
import { motion } from 'motion/react';
import { X, Globe, ExternalLink, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Language, ActivePanel } from '../types';
import SiteFooter from './SiteFooter';

interface SustainabilityProps {
  lang: Language;
  onClose: () => void;
  onOpenPanel: (panel: ActivePanel) => void;
}

export default function Sustainability({ lang, onClose, onOpenPanel }: SustainabilityProps) {
  const isAr = lang === 'ar';

  // High-quality imagery for goals & elements
  const goal1Img = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200'; // Pivot/field irrigation
  const goal2Img = 'https://images.unsplash.com/photo-1444858291040-58ea7f279a13?auto=format&fit=crop&q=80&w=1200'; // Green dates/plants
  const goal3Img = 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1200'; // Field workers
  const goal4Img = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'; // Rustic door on yellow wall
  const employeeImg = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'; // Smiling employee

  return (
    <motion.div
      id="sustainability-full-page"
      className="fixed inset-0 z-30 overflow-y-auto bg-[#eef4e2] text-stone-800 scrollbar-thin select-none pt-24 md:pt-32"
      dir={isAr ? 'rtl' : 'ltr'}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    >
      {/* HEADER INTRO BANNER */}
      <section className="bg-[#eef4e2] py-16 px-6 sm:px-12 md:px-24 text-center border-b border-[#cfdfb5]">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-snug"
          >
            {isAr ? 'استراتيجيتنا للاستدامة والتأثير' : 'Our Sustainability & Impact Strategy'}
          </motion.h1>

          <div className="h-0.5 w-24 bg-[#8e7046] mx-auto rounded-full" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-stone-800 text-sm sm:text-base leading-relaxed text-justify md:text-center space-y-4 whitespace-pre-line"
          >
            {isAr ? (
              <>
                من بدايتنا كنا دايماً بنحاول نخلق مساحة من السلام والهدوء، من خلال أفضل الموارد الطبيعية مع الحفاظ على البيئة والمجتمع. نباتاتنا ومحاصيلنا بتزود غنى الحياة البرية وتجذب حيوانات جديدة وتنقي الهوا في مناطق كانت مهجورة قبل كدة. احنا كمان دايماً بنفكر في قدام ولمصلحة الأجيال اللي جاية، وإزاي نقدر تقديم لهم حاجة إيجابية عن طريق الاستخدام الصحيح للموارد الطبيعية غير المتجددة، والحفاظ على الموارد المتجددة ودعمها بحيث تبقى موارد مستدامة.
                <br /><br />
                وبما إن منتجاتنا بتتباع في عشرين دولة، احنا مدركين تأثيرنا على التوريد والأسواق المحلية. علشان كدة صممتنا الاستراتيجية دي علشان تساعدنا على التركيز على المناطق اللي نقدر نأثر عليها أكثر مع تحقيق رؤيتنا الخاصة بالاستدامة في المستقبل.
                <br /><br />
                من فهمنا وتقييمنا للتحديات اللي بنواجهها ومن خبرتنا السابقة في مبادرات مختلفة، قدرنا نحدد أربع أهداف هي أساس استراتيجيتنا.
              </>
            ) : (
              <>
                From our beginnings, we have always strived to create a space of peace and tranquility, utilizing the finest natural resources while preserving the environment and society. Our plants and crops enrich wildlife, attract new animal species, and purify the air in areas that were previously abandoned. We also always think ahead for the benefit of future generations, and how we can offer them something positive through the correct use of non-renewable natural resources, and the preservation and support of renewable resources so that they remain sustainable.
                <br /><br />
                Since our products are sold in twenty countries, we are aware of our impact on supply chains and local markets. That is why we designed this strategy to help us focus on the areas where we can make the greatest impact while achieving our specific vision for sustainability in the future.
                <br /><br />
                From our understanding and assessment of the challenges we face, and from our past experience in various initiatives, we have been able to identify four goals that form the foundation of our strategy.
              </>
            )}
          </motion.p>
        </div>
      </section>

      {/* FOUR OBJECTIVES GRID */}
      <section id="sustainability-four-goals" className="w-full">
        {/* Goal 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-stone-200">
          {/* Left Commitments Box - Warm Yellow */}
          <div className="lg:col-span-5 bg-[#fed25c] p-8 sm:p-12 md:p-16 flex flex-col justify-center text-stone-900">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-stone-700/80 block">
                {isAr ? 'الهدف الأول' : 'OBJECTIVE 01'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {isAr ? 'التزاماتنا تجاه الطبيعة' : 'Our Commitments to Nature'}
              </h2>
              <div className="h-0.5 w-16 bg-stone-900/30 rounded" />
              <ul className="space-y-3.5 text-sm sm:text-base leading-relaxed list-disc list-inside">
                {isAr ? (
                  <>
                    <li>تحويل واحدة على الأقل من الأراضي المتدهورة أو الصحراوية إلى مساحات طبيعية منتجة ومستدامة.</li>
                    <li>إحياء الأنظمة البيئية والحفاظ على التنوع الحيوي.</li>
                    <li>الالتزام بنسب محايدة من الكربون والتكيف مع تغيرات المناخ.</li>
                  </>
                ) : (
                  <>
                    <li>Transform at least one degraded or desert land into highly productive and sustainable natural spaces.</li>
                    <li>Revitalize ecosystems and preserve biodiversity.</li>
                    <li>Commit to carbon-neutral ratios and adapt to climate changes.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* Right Image Box */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-auto overflow-hidden">
            <img
              src={goal1Img}
              alt="Goal 1"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] hover:scale-105 transition-all duration-[5s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex items-end p-8 sm:p-12">
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white tracking-wide">
                {isAr ? 'الهدف الأول: حماية الطبيعة وإعادة التوازن' : 'Goal 1: Protecting Nature & Restoring Balance'}
              </h3>
            </div>
          </div>
        </div>

        {/* Goal 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-stone-200">
          {/* Left Commitments Box - Herbal Lime Green */}
          <div className="lg:col-span-5 bg-[#c8e283] p-8 sm:p-12 md:p-16 flex flex-col justify-center text-stone-900">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-stone-700/80 block">
                {isAr ? 'الهدف الثاني' : 'OBJECTIVE 02'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {isAr ? 'التزاماتنا الزراعية' : 'Our Agricultural Pledges'}
              </h2>
              <div className="h-0.5 w-16 bg-stone-900/30 rounded" />
              <ul className="space-y-3.5 text-sm sm:text-base leading-relaxed list-disc list-inside">
                {isAr ? (
                  <>
                    <li>بناء نموذج عمل حلقي حقيقي.</li>
                    <li>استخدام المياه بحكمة ومسؤولية.</li>
                    <li>إنتاج طاقة متجددة ومستدامة.</li>
                    <li>بناء بيئة خضراء دائمة مع أخذ السكان والنظم البيئية المحلية في الاعتبار.</li>
                  </>
                ) : (
                  <>
                    <li>Build a genuine circular business model.</li>
                    <li>Use water wisely and responsibly.</li>
                    <li>Produce renewable and sustainable energy.</li>
                    <li>Build a permanent green environment while taking local inhabitants and ecosystems into account.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* Right Image Box */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-auto overflow-hidden">
            <img
              src={goal2Img}
              alt="Goal 2"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] hover:scale-105 transition-all duration-[5s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex items-end p-8 sm:p-12">
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white tracking-wide">
                {isAr ? 'الهدف الثاني: نزرع بذكاء ونغلق الحلقات' : 'Goal 2: Smart Farming & Closing Loops'}
              </h3>
            </div>
          </div>
        </div>

        {/* Goal 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-stone-200">
          {/* Left Commitments Box - Pastel Lavender Purple */}
          <div className="lg:col-span-5 bg-[#bcadcf] p-8 sm:p-12 md:p-16 flex flex-col justify-center text-stone-900">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-stone-700/80 block">
                {isAr ? 'الهدف الثالث' : 'OBJECTIVE 03'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {isAr ? 'التزاماتنا تجاه موظفينا' : 'Our Employee Well-being'}
              </h2>
              <div className="h-0.5 w-16 bg-stone-900/30 rounded" />
              <ul className="space-y-3.5 text-sm sm:text-base leading-relaxed list-disc list-inside">
                {isAr ? (
                  <>
                    <li>دعم الصحة الجسدية والعقلية لموظفينا.</li>
                    <li>ضمان السلامة والأمان بطريقة فعالة وجديرة بالثقة.</li>
                    <li>خلق بيئة عمل متنوعة مرحبة تشمل الجميع.</li>
                    <li>مساعدة موظفينا على الاجتهاد والتقدم المهني.</li>
                  </>
                ) : (
                  <>
                    <li>Support the physical and mental health of our employees.</li>
                    <li>Ensure safety and security in an effective and trustworthy manner.</li>
                    <li>Create a diverse, welcoming, and inclusive work environment.</li>
                    <li>Help our employees strive and advance professionally.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* Right Image Box */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-auto overflow-hidden">
            <img
              src={goal3Img}
              alt="Goal 3"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] hover:scale-105 transition-all duration-[5s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex items-end p-8 sm:p-12">
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white tracking-wide">
                {isAr ? 'الهدف الثالث: نهتم بموظفينا بعمق وصدق' : 'Goal 3: Caring Deeply & Sincerely for Our Employees'}
              </h3>
            </div>
          </div>
        </div>

        {/* Goal 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-stone-200">
          {/* Left Commitments Box - Warm Sunset Orange */}
          <div className="lg:col-span-5 bg-[#f89a24] p-8 sm:p-12 md:p-16 flex flex-col justify-center text-stone-900">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-stone-700/80 block">
                {isAr ? 'الهدف الرابع' : 'OBJECTIVE 04'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {isAr ? 'التزاماتنا للمستقبل' : 'Our Vision for the Future'}
              </h2>
              <div className="h-0.5 w-16 bg-stone-900/30 rounded" />
              <ul className="space-y-3.5 text-sm sm:text-base leading-relaxed list-disc list-inside">
                {isAr ? (
                  <>
                    <li>تحسين مستويات المعيشة للمجتمعات المحلية.</li>
                    <li>بناء شراكات مؤثرة تساهم في تحقيق أهداف التنمية المستدامة.</li>
                    <li>إلهام عملائنا لاتباع نمط حياة صحي ومستدام.</li>
                    <li>قيادة الشركات نحو تبني النزاهة وتحقيق المساءلة في إدارة أعمالهم.</li>
                    <li>استخدام الأساليب العالمية وتقديم تقارير عن تقدمنا.</li>
                  </>
                ) : (
                  <>
                    <li>Improve living standards for local communities.</li>
                    <li>Build impactful partnerships that contribute to achieving sustainable development goals.</li>
                    <li>Inspire our clients to adopt healthy and sustainable lifestyles.</li>
                    <li>Lead companies toward adopting integrity and accountability in business management.</li>
                    <li>Use global methodologies and report on our progress.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* Right Image Box */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-auto overflow-hidden">
            <img
              src={goal4Img}
              alt="Goal 4"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] hover:scale-105 transition-all duration-[5s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex items-end p-8 sm:p-12">
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white tracking-wide">
                {isAr ? 'الهدف الرابع: نتوجه نحو المستقبل المستدام' : 'Goal 4: Navigating Towards a Sustainable Future'}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS LOGO SECTION */}
      <section className="bg-[#f0f5fc] py-16 px-4 sm:px-10 text-center border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            {isAr ? 'شركاء من أجل الصالح العام' : 'Partners for the Common Good'}
          </h2>

          {/* Symmetrical Vector Logotype Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-center w-full mx-auto">
            {/* Logo 1: Ader */}
            <div className="bg-white/80 border border-stone-200 py-10 px-2 sm:py-12 sm:px-4 rounded-lg shadow-2xs hover:shadow-sm hover:bg-white transition-all duration-300 w-full h-[110px] sm:h-[140px] flex items-center justify-center">
              <span className="font-serif font-black tracking-widest text-[#2c3d5a] text-2xl md:text-3xl lg:text-4xl italic">ader</span>
            </div>
            
            {/* Logo 2: Econsult */}
            <div className="bg-white/80 border border-stone-200 py-10 px-2 sm:py-12 sm:px-4 rounded-lg shadow-2xs hover:shadow-sm hover:bg-white transition-all duration-300 w-full h-[110px] sm:h-[140px] flex flex-col items-center justify-center space-y-2">
              <div className="flex space-x-2 space-x-reverse mb-1">
                <span className="w-4 h-4 rounded-full bg-[#52a77c]" />
                <span className="w-4 h-4 rounded-full bg-[#52a77c]" />
                <span className="w-4 h-4 rounded-full bg-[#3c7255]" />
              </div>
              <span className="font-sans font-bold tracking-wider text-[#2e503f] text-lg md:text-xl">econsult</span>
            </div>

            {/* Logo 3: Apco */}
            <div className="bg-white/80 border border-stone-200 py-10 px-2 sm:py-12 sm:px-4 rounded-lg shadow-2xs hover:shadow-sm hover:bg-white transition-all duration-300 w-full h-[110px] sm:h-[140px] flex flex-col items-center justify-center space-y-2">
              <span className="font-sans font-black tracking-tighter text-[#f37c22] text-xl md:text-2xl lg:text-3xl">apco.</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 text-center leading-tight">Sustainable Energy Developers</span>
            </div>

            {/* Logo 4: ACDA */}
            <div className="bg-white/80 border border-stone-200 py-10 px-2 sm:py-12 sm:px-4 rounded-lg shadow-2xs hover:shadow-sm hover:bg-white transition-all duration-300 w-full h-[110px] sm:h-[140px] flex flex-col items-center justify-center space-y-2">
              <div className="border-b border-[#a82531] pb-0.5 mb-1 flex items-center justify-center space-x-2 space-x-reverse">
                <span className="text-[#a82531] font-bold text-base md:text-lg">ACDA</span>
                <span className="text-[12px] text-stone-600">جمعية التنمية والبيئة</span>
              </div>
              <span className="text-[9px] uppercase font-medium tracking-widest text-stone-400">Environment & Association</span>
            </div>
          </div>
        </div>
      </section>
 

     
      <SiteFooter onOpenPanel={onOpenPanel} activePanel="sustainability" />
    </motion.div>
  );
}
