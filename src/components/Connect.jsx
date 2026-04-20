import { motion } from 'framer-motion';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { socialLinks } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';

const Connect = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>Check me out</p>
        <h2 className={styles.sectionHeadTextLight}>Connect.</h2>
      </motion.div>

      <div className="mt-14 flex flex-wrap justify-center gap-10 md:gap-14">
        {socialLinks.map(({ name, href, icon }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block touch-none rounded-full focus-within:outline-none focus-visible:ring-2 focus-visible:ring-platinum focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="sr-only">
              {name}
            </a>
            <div
              className="h-28 w-28 cursor-grab overflow-hidden rounded-full active:cursor-grabbing"
              aria-hidden>
              <BallCanvas icon={icon} href={href} />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Connect, 'connect');
