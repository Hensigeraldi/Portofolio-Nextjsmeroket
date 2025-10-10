'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle navigation to home sections from any page
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const navLinks = document.getElementById('navLinks');
      const menuToggle = document.querySelector('.menu-toggle');
      
      if (navLinks && menuToggle && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/" className="logo-link">
          <Image 
            src="/images/logo1.jpeg" 
            alt="Nzyy Logo" 
            width={40} 
            height={40} 
            className="logo-img"
          />
          <span className="logo-text">Nzyy.</span>
        </Link>
      </div>
      
      <div className={`nav-links ${isOpen ? 'active' : ''}`} id="navLinks">
        <a 
          href="/#home" 
          onClick={(e) => handleSectionClick(e, 'home')} 
          className={pathname === '/' ? 'active' : ''}
        >
          <i className="fas fa-home mobile-icon"></i>
          Home
        </a>
        <a 
          href="/#about" 
          onClick={(e) => handleSectionClick(e, 'about')}
        >
          <i className="fas fa-user mobile-icon"></i>
          About Me
        </a>
        <a 
          href="/#portfolio" 
          onClick={(e) => handleSectionClick(e, 'portfolio')}
        >
          <i className="fas fa-briefcase mobile-icon"></i>
          Portfolio
        </a>
        <a 
          href="/#skills" 
          onClick={(e) => handleSectionClick(e, 'skills')}
        >
          <i className="fas fa-code mobile-icon"></i>
          Skills
        </a>
        <a 
          href="/#certificates" 
          onClick={(e) => handleSectionClick(e, 'certificates')}
        >
          <i className="fas fa-certificate mobile-icon"></i>
          Certificates
        </a>
        <Link 
          href="/contact" 
          onClick={handleLinkClick} 
          className={pathname === '/contact' ? 'active' : ''}
        >
          <i className="fas fa-envelope mobile-icon"></i>
          Contact
        </Link>
      </div>
      
      {/* Animated Hamburger Menu - HANYA UNTUK MOBILE */}
      <button 
        className={`menu-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </nav>
  );
}