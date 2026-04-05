import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { styles } from '../styles';

/** Hero background: place an MP4 at `public/hero-bg.mp4` (filename documented in `public/hero-video-readme.txt`). */
const HERO_VIDEO_SRC = '/hero-bg.mp4';

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const backdropFade = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={heroRef} className="relative h-screen">
      <div className="absolute top-0 left-0 z-0 h-full w-screen overflow-hidden">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: backdropFade }}
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
        />
        <motion.div
          className="absolute inset-0 bg-black/40"
          style={{ opacity: backdropFade }}
          aria-hidden
        />
      </div>
      <section
        className="relative z-[1] flex sm:flex-row flex-col w-full h-screen mx-auto 
        overflow-hidden">
        <div
          className={`absolute inset-0 sm:top-[250px] top-[150px] 
          lg:top-[150px] xl:top-[250px] ${styles.paddingX} 
          max-w-7xl mx-auto flex flex-row items-start
          justify-between gap-3`}>
          <div className="flex flex-col justify-center items-center mt-5 ml-3">
            <div className="w-5 h-5 rounded-full bg-[#0a0a0a] sm:hidden" />
            <div className="w-1 sm:h-80 h-40 bw-gradient sm:hidden" />
          </div>

          <div>
            <h1
              className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`}>
              <span
                className="block sm:text-battleGray sm:text-[90px] 
                text-eerieBlack text-[50px] font-mova
                font-extrabold uppercase">
                Genald
              </span>
              <span
                className="block sm:text-battleGray sm:text-[90px] 
                text-eerieBlack text-[50px] font-mova
                font-extrabold uppercase">
                Komino
              </span>
            </h1>
          </div>
          <div
            className="w-screen flex flex-col items-start 
            justify-center sm:-ml-[3rem] xxs:mt-4"></div>

          <div></div>
        </div>

        <div
          className="absolute xs:bottom-10 bottom-32 w-full z-[2]
          flex justify-center items-center">
          <a href="#about">
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4 
            border-french border-dim flex
            justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Hero;
