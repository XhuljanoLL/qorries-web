import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu, logo, logotext } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} absolute left-0 right-0 top-0 z-50 w-full flex items-center bg-transparent py-1.5 sm:py-2`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}>
          <img
            src={logo} // your logo comes here
            alt="logo"
            className="sm:w-[80px] sm:h-[80px] w-[70px] h-[70px] object-contain"
          />

          {/* if you have text you want besides your logo it comes here.
          Otherwise delete this if you don't need it. */}
          {/* <img
            src={logotext}
            alt="logo"
            className="sm:w-[72px] sm:h-[72px] w-[68px] h-[68px] -ml-[0.5rem] object-contain"
          /> */}
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-french' : 'text-timberWolf'
              } hover:text-french text-[21px] font-medium font-mova 
                uppercase tracking-[3px] cursor-pointer nav-links`}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* mobile */}
        <div className="sm:hidden flex justify-end items-center">
          <img
            src={menu}
            alt="menu"
            className="w-[30px] h-[30px] object-contain cursor-pointer brightness-0 invert opacity-90 relative z-[60]"
            onClick={() => setToggle(true)}
          />

          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[55] bg-black/30 transition-opacity duration-300 ${
              toggle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setToggle(false)}
          />

          {/* Slide-in panel from right */}
          <div
            className={`mobile-grain-panel fixed top-0 right-0 h-full w-[72vw] max-w-[280px] z-[60] flex flex-col px-8 py-10 transition-transform duration-300 ease-in-out ${
              toggle ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="relative z-10 flex justify-end mb-14">
              <img
                src={close}
                alt="close"
                className="w-[20px] h-[20px] object-contain cursor-pointer invert opacity-80"
                onClick={() => setToggle(false)}
              />
            </div>
            <ul className="relative z-10 list-none flex flex-col gap-8 items-start">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? 'text-french' : 'text-timberWolf'
                  } text-[28px] font-bold font-arenq uppercase tracking-[3px] cursor-pointer`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}>
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
