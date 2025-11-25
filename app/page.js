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
    
    // Initialize AOS - VERSI YANG BENAR
    AOS.init({
      duration: 600, // Lebih cepat dari 800ms
      once: true, // ⭐ Animasi hanya sekali
      offset: 50, // Lebih kecil agar animasi lebih cepat trigger
      mirror: false, // ⭐ Nonaktifkan mirror
      easing: 'ease-out', // Lebih ringan
      delay: 0, // Tidak ada delay
      // ❌ HAPUS disable: function() - ini yang bikin konten hilang!
    });

    // Sticky Navbar - OPTIMIZED dengan throttle
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
            } else {
              navbar.classList.remove('scrolled');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup AOS jika perlu
      AOS.refresh();
    };
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