'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      mirror: true,
      easing: 'ease-in-out-quad'
    });

    // Sticky Navbar
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
          navbar.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Certificates />
      <Footer />
      <AIChatbot />
    </>
  );
}