"use client"

import { useState, useEffect, useRef } from "react";

const Navbar = () => {

    const [isNavbarFixed, setIsNavbarFixed] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          
          setIsNavbarFixed(true);
        } else {
          setIsNavbarFixed(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <nav className={`bg-gray-800 p-4 ${isNavbarFixed ? 'fixed top-0 w-full' : ''}`}  >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">Poet's Haven</div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
