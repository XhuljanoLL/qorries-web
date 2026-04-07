import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

/**
 * Sparkle Component
 * Creates a classic 80s-style 4-pointed star twinkle.
 */
const Sparkle = ({ delay, left, top, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, top: `${top}%` }}
    initial={{ scale: 0, opacity: 0, rotate: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 90, 180],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: Math.random() * 4 + 2, // Random wait between sparkles
      delay: delay,
      ease: "easeInOut",
    }}
  >
    {/* The 4-pointed star shape */}
    <div 
      className="bg-white rounded-full blur-[1px]" 
      style={{ 
        width: size, 
        height: size, 
        boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' 
      }} 
    />
    {/* Cross-hair flares for that 80s look */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[1px] bg-white opacity-50" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200%] w-[1px] bg-white opacity-50" />
  </motion.div>
);

const HighlightLink = ({ children, href }) => {
  // We only need a few sparkles to keep it subtle
  const sparkleConfigs = [
    { id: 1, delay: 0, left: 10, top: 20, size: '8px' },
    { id: 2, delay: 2, left: 50, top: 10, size: '6px' },
    { id: 3, delay: 4, left: 85, top: 60, size: '9px' },
    { id: 4, delay: 1, left: 30, top: 70, size: '5px' },
  ];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block font-black text-[22px] text-white cursor-pointer px-1 group"
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Sparkle Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {sparkleConfigs.map((s) => (
          <Sparkle key={s.id} {...s} />
        ))}
      </div>
    </motion.a>
  );
};

const ServiceCard = ({ index, title, Icon }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 16;
    const rotateX = -((y - midY) / midY) * 16;
    setRotate({ x: rotateX, y: rotateY });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotate({ x: 0, y: 0 });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className="xs:w-[250px] w-full [perspective:1000px]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={isMobile ? {} : { rotateX: rotate.x, rotateY: rotate.y, scale: 1.06, y: -10 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        className="relative overflow-hidden rounded-[20px] border border-platinum/20 py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col bg-transparent"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {!isMobile && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(200,200,200,0.12), transparent 60%)`,
              opacity: glow.opacity,
              transition: 'opacity 0.2s ease',
            }}
          />
        )}
        <div className="flex flex-col items-center justify-evenly h-full w-full" style={{ transform: 'translateZ(60px)' }}>
          {typeof Icon === 'string' ? (
            <img src={Icon} alt={title} className="h-16 w-16 object-contain" />
          ) : (
            <Icon className="h-16 w-16 text-taupe" aria-hidden />
          )}
          <h3 className="text-center text-[18px] font-bold text-silver">{title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const projectUrl = "https://www.instagram.com/paraclituspictures/"; 

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>Introduction</p>
        <h2 className={styles.sectionHeadTextLight}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 max-w-4xl text-[18px] leading-[30px] text-timberWolf"
      >
        I’m a professional filmmaker and videographer based in Berlin, and the founder of{' '}
        <HighlightLink href={projectUrl}>Paraclitus Pictures</HighlightLink>, 
        specializing in cinematic, emotionally driven video production and visual storytelling. 
        I work with brands, artists, and creators across Berlin to produce high-quality 
        commercial videos, music videos, and creative content that connects with audiences 
        and leaves a lasting impact. From concept to final cut, every project is crafted 
        with intention, combining strong storytelling with a refined, modern cinematic aesthetic. 
        Whether it’s a brand campaign, promotional film, or music video production in Berlin, 
        my focus is on delivering authentic, engaging, and visually distinctive content. 
        Through Paraclitus Pictures, I offer a full-service video production approach in Berlin, 
        handling everything from creative direction and filming to editing and post-production.
        This end-to-end process ensures professional, tailored visuals that bring each project’s vision to 
        life and stand out in Berlin’s competitive creative industry.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');