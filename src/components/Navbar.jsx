import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu, logo } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} absolute left-0 right-0 top-0 z-[100] w-full flex items-center bg-transparent py-5`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="sm:w-[75px] sm:h-[75px] w-[60px] h-[60px] object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-12 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-white' : 'text-timberWolf'
              } hover:text-white text-[18px] font-medium font-mova uppercase tracking-[4px] cursor-pointer transition-all duration-300`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Trigger */}
        <div className="sm:hidden flex justify-end items-center">
          <img
            src={menu}
            alt="menu"
            className="w-[30px] h-[30px] object-contain cursor-pointer invert brightness-0 hover:scale-110 transition-transform"
            onClick={() => setToggle(true)}
          />

          {/* Full Screen Cinematic Overlay */}
          <div
            className={`fixed inset-0 h-screen w-screen z-[120] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
              toggle 
                ? 'opacity-100 pointer-events-auto backdrop-blur-2xl bg-black/90' 
                : 'opacity-0 pointer-events-none backdrop-blur-none bg-transparent'
            }`}
            // EXIT LOGIC: Clicking anywhere on the background closes the menu
            onClick={() => setToggle(false)}
          >
            {/* Close Button */}
            <div className="absolute top-10 right-10">
              <img
                src={close}
                alt="close"
                className="w-[26px] h-[26px] object-contain cursor-pointer invert opacity-40 hover:opacity-100 hover:rotate-90 transition-all duration-500"
                onClick={() => setToggle(false)}
              />
            </div>

            {/* Navigation Links */}
            <ul 
              className="list-none flex flex-col gap-10 items-center"
              // STOP PROPAGATION: Prevents the menu from closing if you click directly on the links list
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? 'text-white' : 'text-timberWolf'
                  } text-[36px] font-medium font-mova uppercase tracking-[12px] cursor-pointer transition-all duration-500 hover:text-white hover:tracking-[18px]`}
                  style={{ 
                    transitionDelay: toggle ? `${index * 100}ms` : '0ms',
                    transform: toggle ? 'translateY(0)' : 'translateY(40px)',
                    opacity: toggle ? 1 : 0
                  }}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>

            {/* Minimalist Brand Tag at Bottom */}
            <div 
              className={`absolute bottom-16 transition-all duration-1000 delay-500 ${
                toggle ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
               <p className="text-white text-[10px] tracking-[8px] uppercase font-mova">
                 Genald Komino • Film
               </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;