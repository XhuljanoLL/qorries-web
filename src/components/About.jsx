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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
        sapiente ipsum dolorum dicta eaque cumque inventore molestias, beatae ea
        quaerat alias accusamus voluptas autem! Alias odit voluptates in totam
        vitae dignissimos minus eaque culpa unde tempore dolore aperiam
        obcaecati voluptatum aliquam corrupti, suscipit accusamus! Odit unde
        veniam dolorum ipsum doloribus.
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
