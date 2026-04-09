import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { styles } from '../styles';

const HERO_VIDEO_DESKTOP = '/hero-bg.webm';
const HERO_VIDEO_MOBILE = '/hero-bg-mobile.webm';

const Hero = () => {
  const heroRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const wasInViewRef = useRef(true);
  const savedTimeRef = useRef(0);

  const [showScrollCta, setShowScrollCta] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backdropFade = useTransform(
    scrollYProgress,
    [0, 0.35, 0.58],
    [1, 0.45, 0]
  );

  const getActiveVideo = () => {
    if (window.matchMedia('(max-width: 639px)').matches) {
      return mobileVideoRef.current;
    }

    return desktopVideoRef.current;
  };

  const pauseAndSaveTime = (video) => {
    if (!video) return;

    savedTimeRef.current = video.currentTime || 0;

    if (!video.paused) {
      video.pause();
    }
  };

  const resumeFromSavedTime = async (video) => {
    if (!video) return;

    const startPlayback = async () => {
      try {
        if (Number.isFinite(savedTimeRef.current) && savedTimeRef.current > 0) {
          const safeTime =
            Number.isFinite(video.duration) && video.duration > 0
              ? Math.min(savedTimeRef.current, Math.max(video.duration - 0.05, 0))
              : savedTimeRef.current;

          if (Math.abs(video.currentTime - safeTime) > 0.05) {
            video.currentTime = safeTime;
          }
        }

        await video.play();
      } catch {
        // Ignore Safari/autoplay promise issues.
      }
    };

    if (video.readyState < 1) {
      video.addEventListener('loadedmetadata', startPlayback, { once: true });
      return;
    }

    await startPlayback();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;
        const activeVideo = getActiveVideo();

        setShowScrollCta(window.scrollY < 48);

        // Hero fully left the viewport: pause and remember the time.
        if (!isInView && wasInViewRef.current) {
          pauseAndSaveTime(activeVideo);
        }

        // Hero came back into view: continue from the saved time.
        if (isInView && !wasInViewRef.current) {
          void resumeFromSavedTime(activeVideo);
        }

        wasInViewRef.current = isInView;
      },
      {
        threshold: 0,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
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
          ref={desktopVideoRef}
          className="absolute inset-0 z-0 hidden h-full min-h-[100svh] w-full object-cover sm:block"
          src={HERO_VIDEO_DESKTOP}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => {
            if (window.matchMedia('(min-width: 640px)').matches) {
              void e.currentTarget.play().catch(() => {});
            }
          }}
        />

        {/* Mobile video */}
        <video
          ref={mobileVideoRef}
          className="absolute inset-0 z-0 h-full min-h-[100svh] w-full object-cover sm:hidden"
          src={HERO_VIDEO_MOBILE}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => {
            if (window.matchMedia('(max-width: 639px)').matches) {
              void e.currentTarget.play().catch(() => {});
            }
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-0 min-h-[100svh] bg-black/40" aria-hidden />
      </motion.div>

      <section className="relative z-[1] flex min-h-0 flex-1 flex-col w-full mx-auto overflow-hidden sm:flex-row">
        <div
          className={`absolute inset-0 top-[52%] sm:top-[400px] lg:top-[440px] xl:top-[500px] ${styles.paddingX} max-w-7xl mx-auto flex flex-row items-start justify-between gap-3`}
        >
          <div className="flex flex-col justify-center items-center mt-5 ml-3"></div>

          <div>
            <h1 className={`${styles.heroHeadText} text-eerieBlack font-poppins uppercase`}>
              <span className="block sm:text-battleGray sm:text-[112px] leading-none text-battleGray text-[58px] font-mova font-extrabold uppercase">
                Genald
              </span>
              <span className="block sm:text-battleGray sm:text-[112px] leading-none text-battleGray text-[58px] font-mova font-extrabold uppercase">
                Komino
              </span>
            </h1>
          </div>

          <div className="w-screen flex flex-col items-start justify-center sm:-ml-[3rem] xxs:mt-4"></div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;