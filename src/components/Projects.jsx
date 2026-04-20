import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { projects } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';

const ProjectCard = ({
  id,
  name,
  description,
  image,
  demo,
  index,
  active,
  handleClick,
}) => {
  const isActive = active === id;

  return (
    <motion.div
      initial={false}
      animate={{
        // Desktop flex animation
        flex: isActive ? 10 : 2,
        lgFlex: isActive ? 3.5 : 0.5,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className={`relative flex items-center justify-center min-w-[170px] 
        h-[420px] cursor-pointer card-shadow`}
      // Desktop hover triggers expansion
      onMouseEnter={() => window.innerWidth >= 1024 && handleClick(id)}
      onClick={() => handleClick(id)}
    >
      <img
        src={image}
        alt={name}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />

      {/* Text overlay */}
      {!isActive ? (
        <div className="flex items-center justify-start pr-[4.5rem]">
          <h3
            className="font-extrabold font-beckman uppercase w-[200px] h-[30px] 
              whitespace-nowrap sm:text-[27px] text-[18px] text-timberWolf tracking-[1px]
              absolute z-0 lg:bottom-[7rem] lg:rotate-[-90deg] lg:origin-[0,0]
              leading-none z-20"
          >
            {name}
          </h3>
        </div>
      ) : (
        // Active card content
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 p-8 justify-start w-full flex-col z-20
            lg:bg-[rgba(122,122,122,0.5)] rounded-b-[24px]"
        >
          <h2
            className="font-bold sm:text-[32px] text-[24px] 
            text-timberWolf uppercase font-beckman sm:mt-0 -mt-[1rem]"
          >
            {name}
          </h2>

          <p
            className="text-silver sm:text-[14px] text-[12px] 
            max-w-3xl sm:leading-[24px] leading-[18px]
            font-poppins tracking-[1px]"
          >
            {description}
          </p>

          <button
            className="flex items-center justify-center 
            sm:text-[16px] text-[14px] text-timberWolf 
            font-bold font-beckman py-4 px-6 
            rounded-[10px] glassmorphism 
            sm:mt-[22px] mt-[16px] 
            hover:bg-battleGray hover:text-eerieBlack 
            transition duration-[0.2s] ease-in-out"
            onClick={() => window.open(demo, '_blank')}
          >
            WATCH
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [active, setActive] = useState('project-2');

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Visual Stories</p>
        <h2 className={`${styles.sectionHeadTextLight}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
          A selection of projects highlighting cinematic storytelling across music videos, 
          commercial work, and event coverage, including aftermovies — from concept to final edit.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <div className="mt-[20px] flex lg:flex-row flex-col min-h-[40vh] gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              {...project}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Projects, 'projects');