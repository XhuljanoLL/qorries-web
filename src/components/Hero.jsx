import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { styles } from '../styles';

const HERO_VIDEO_DESKTOP = '/hero-bg.mp4';
const HERO_VIDEO_MOBILE  = '/hero-bg-mobile.mp4';

const SCROLL_CTA_THRESHOLD_PX = 48;

const Hero = () => {
  const heroRef = useRef(null);
  const [showScrollCta, setShowScrollCta] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const backdropFade = useTransform(
    scrollYProgress,
    [0, 0.35, 0.58],
    [1, 0.45, 0],
  );

  useEffect(() => {
    const onScroll = () => setShowScrollCta(window.scrollY < SCROLL_CTA_THRESHOLD_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative flex min-h-screen w-full flex-col">
      {/* Hero background container */}
      <motion.div
        className="absolute inset-0 z-0 min-h-[100svh] overflow-hidden"
        style={{ opacity: backdropFade }}
      >
        {/* Desktop video */}
        <video
          className="absolute inset-0 z-0 h-full min-h-[100svh] w-full object-cover hidden sm:block"
          src={HERO_VIDEO_DESKTOP}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Mobile video */}
        <video
          className="absolute inset-0 z-0 h-full min-h-[100svh] w-full object-cover sm:hidden"
          src={HERO_VIDEO_MOBILE}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 z-0 min-h-[100svh] bg-black/40" aria-hidden />
      </motion.div>

      <section
        className="relative z-[1] flex min-h-0 flex-1 flex-col w-full mx-auto overflow-hidden sm:flex-row"
      >
        <div
          className={`absolute inset-0 top-[52%] sm:top-[400px]
          lg:top-[440px] xl:top-[500px] ${styles.paddingX} 
          max-w-7xl mx-auto flex flex-row items-start
          justify-between gap-3`}
        >
          <div className="flex flex-col justify-center items-center mt-5 ml-3"></div>

          <div>
            <h1
              className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`}
            >
              <span
                className="block sm:text-battleGray sm:text-[112px] leading-none
                text-battleGray text-[58px] font-mova
                font-extrabold uppercase"
              >
                Genald
              </span>
              <span
                className="block sm:text-battleGray sm:text-[112px] leading-none
                text-battleGray text-[58px] font-mova
                font-extrabold uppercase"
              >
                Komino
              </span>
            </h1>
          </div>
          <div
            className="w-screen flex flex-col items-start 
            justify-center sm:-ml-[3rem] xxs:mt-4"
          ></div>

          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;