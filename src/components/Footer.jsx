import { Link } from 'react-router-dom';
import { logo, logotext } from '../assets';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 py-8 px-6 sm:px-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}>
          <img
            src={logo}
            alt="logo"
            className="w-[32px] h-[32px] object-contain"
          />
          <img
            src={logotext}
            alt="logo text"
            className="w-[58px] h-[58px] -ml-[0.4rem] object-contain"
          />
        </Link>

        <p className="text-taupe text-[13px] font-poppins tracking-wider">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
