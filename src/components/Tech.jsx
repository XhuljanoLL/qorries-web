import { motion } from 'framer-motion';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { socialLinks } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>Contact</p>
        <h2 className={styles.sectionHeadTextLight}>Connect.</h2>
      </motion.div>

      <div className="mt-14 flex flex-wrap justify-center gap-10 md:gap-14">
        {socialLinks.map(({ name, href, icon }) => (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum focus-visible:ring-offset-2 focus-visible:ring-offset-eerieBlack">
            <div className="h-28 w-28 [&_canvas]:pointer-events-none">
              <BallCanvas icon={icon} />
            </div>
          </motion.a>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, 'connect');
