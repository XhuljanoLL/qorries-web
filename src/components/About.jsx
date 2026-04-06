import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useState, useEffect } from 'react';

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

    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
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
        animate={
          isMobile
            ? {} // 🔥 no animation on mobile
            : {
                rotateX: rotate.x,
                rotateY: rotate.y,
                scale: 1.06,
                y: -10,
              }
        }
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        className="relative overflow-hidden rounded-[20px] border border-platinum/20 py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col bg-transparent"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow (disabled on mobile) */}
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

        <div
          className="flex flex-col items-center justify-evenly h-full w-full"
          style={{ transform: 'translateZ(60px)' }}
        >
          {typeof Icon === 'string' ? (
            <img src={Icon} alt={title} className="h-16 w-16 object-contain" />
          ) : (
            <Icon className="h-16 w-16 text-taupe" aria-hidden />
          )}

          <h3 className="text-center text-[18px] font-bold text-silver">
            {title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>Introduction</p>
        <h2 className={styles.sectionHeadTextLight}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 max-w-3xl text-[18px] leading-[30px] text-timberWolf">
        I’m a professional filmmaker and videographer based in Berlin, 
        and the founder of Paraclitus Pictures, specializing in cinematic, 
        emotionally driven video production and visual storytelling. I work with brands, 
        artists, and creators across Berlin to produce high-quality commercial videos, 
        music videos, and creative content that connects with audiences and leaves a lasting impact. 
        From concept to final cut, every project is crafted with intention, 
        combining strong storytelling with a refined, modern cinematic aesthetic. 
        Whether it’s a brand campaign, promotional film, or music video production in Berlin, 
        my focus is on delivering authentic, engaging, and visually distinctive content. 
        Through Paraclitus Pictures, I offer a full-service video production approach in Berlin, 
        handling everything from creative direction and filming to editing and post-production. 
        This end-to-end process ensures professional, tailored visuals that bring each 
        project’s vision to life and stand out in Berlin’s competitive creative industry.
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
