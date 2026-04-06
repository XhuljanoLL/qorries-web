import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, Icon }) => {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className="xs:w-[250px] w-full rounded-[20px] border border-platinum/20 py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
      <Icon className="h-16 w-16 text-taupe" aria-hidden />
      <h3 className="text-center text-[18px] font-bold text-silver">
        {title}
      </h3>
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
        Based in Berlin, I am a professional photographer, filmmaker, 
        and videographer specializing in cinematic videos, music video production, 
        and creative video content. From concept to final cut, every shot is crafted 
        to engage audiences, capture emotion, and tell compelling visual stories. 
        I work with brands, artists, and creators to produce high-quality commercial videos, 
        promotional films, and unforgettable music videos. With expertise in videography, 
        video editing, and cinematic direction, each project is designed to connect 
        with viewers and leave a lasting impact. Whether it’s a brand campaign, 
        event coverage, or artistic project, my Berlin-based video production services 
        bring ideas to life. Partner with me for professional photography and video 
        content that elevates your vision and reaches your audience.
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
