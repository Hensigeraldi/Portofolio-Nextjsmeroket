'use client';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Lazy load Lanyard component hanya untuk desktop
const Lanyard = dynamic(() => import('./Lanyard/Lanyard'), { 
  ssr: false,
  loading: () => <div className="lanyard-loading">Loading 3D...</div>
});

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const texts = [
    "Hensi Geraldi Irot", 
    "a Frontend Developer",
    "a Backend Developer"
  ];

  // Deteksi device type - dengan error handling
  useEffect(() => {
    const checkDevice = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = window.innerWidth <= 1024; // iPad dan mobile
        setIsMobile(isMobileDevice);
      }
    };

    // Check initial device
    checkDevice();
    
    // Add event listener hanya di client side
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkDevice);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkDevice);
      }
    };
  }, []);

  useEffect(() => {
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const pauseBetween = 2000;

    const timeout = setTimeout(() => {
      const currentText = texts[textIndex];
      
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseBetween);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    // Initialize Particles untuk Home section
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { 
            value: 160, 
            density: { 
              enable: true, 
              value_area: 800 
            } 
          },
          color: { value: "#ffffff" },
          shape: { 
            type: "circle", 
            stroke: { 
              width: 0, 
              color: "#000000" 
            } 
          },
          opacity: {
            value: 1,
            random: true,
            anim: { 
              enable: true, 
              speed: 1, 
              opacity_min: 0, 
              sync: false 
            }
          },
          size: { 
            value: 3, 
            random: true 
          },
          line_linked: { 
            enable: false 
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            out_mode: "out"
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { 
              enable: true, 
              mode: "bubble" 
            },
            onclick: { 
              enable: true, 
              mode: "repulse" 
            }
          },
          modes: {
            bubble: { 
              distance: 250, 
              size: 0, 
              duration: 2 
            },
            repulse: { 
              distance: 400, 
              duration: 0.4 
            }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <section className="home" id="home">
      <div id="particles-js"></div>
      <div className="home-content">
        <h1 data-aos="fade-right">Hallo,</h1>
        <h2 data-aos="fade-right" data-aos-delay="200" className="typing-container">
          I'm <span className="typing-text">{texts[textIndex].substring(0, charIndex)}</span>
          <span className="cursor">|</span>
        </h2><br />
        <p data-aos="fade-right" data-aos-delay="400">
          I am a web developer who specializes in building interactive, responsive, and functional websites for a variety of digital needs.
        </p><br />
        <button className="border-button" data-aos="fade-up" data-aos-delay="600" onClick={scrollToAbout}>
          <span className="btn-text">More About Me</span>
          <span className="arrow">&#8594;</span>
        </button> <br /><br />
        <div className="social-icons">
          <a href="https://wa.me/082239791258" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-aos="zoom-in" data-aos-delay="800">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.instagram.com/hensigeraldi_?igsh=MTNyemJtMHJ4MW1neA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-aos="zoom-in" data-aos-delay="900">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/share/1EoQDvdb29/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-aos="zoom-in" data-aos-delay="1000">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hensiirot100@gmail.com&su=Halo%20Hensi&body=Hai%20Hensi%2C%20saya%20tertarik%20dengan%20portfolio%20kamu!" target="_blank" rel="noopener noreferrer" aria-label="Email" data-aos="zoom-in" data-aos-delay="1100">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      
      {/* Profile Image Container - Responsive */}
      <div className="profile-container" data-aos="zoom-in-left" data-aos-delay="300">
        {isMobile ? (
          // Tampilkan foto biasa untuk mobile dan iPad
          <div className="profile-image-mobile">
            <Image 
              src="/images/me.jpg" // Menggunakan foto dari public/images/me.jpg
              alt="Hensi Geraldi Irot"
              width={400}
              height={500}
              className="profile-img"
              priority
            />
          </div>
        ) : (
          // Tampilkan Lanyard 3D untuk desktop
          <div className="lanyard-container">
            <Suspense fallback={<div className="lanyard-loading">Loading 3D Model...</div>}>
              <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} fov={25} transparent={true} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}