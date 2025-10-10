'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Certificates() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const certificates = [
    {
      image: '/images/1.jpg',
      title: 'Sertifikat Belajar dasar Pemograman Java',
      description: 'Sertifikat Kompetensi Kelulusan By Dicoding',
      year: '2024',
      link: 'https://drive.google.com/file/d/1iKaug5pakN-tZFpuKAYQfP2H1aaYgXzz/view?usp=drive_link'
    },
    {
      image: '/images/2.jpg',
      title: 'Sertifikat Junior Web Developer (JWD)',
      description: 'Sertifikat kompetensi by Vocational School Graduate Academy (VSGA)',
      year: '2023',
      link: 'https://drive.google.com/file/d/1q4NjaMuGM-oD_8q_HfNFmJTHWcifHQrc/view?usp=sharing'
    },
    {
      image: '/images/3.jpg',
      title: 'Sertifikat Belajar dasar Pemograman Web',
      description: 'Sertifikat Kompetensi Kelulusan By Dicoding',
      year: '2024',
      link: 'https://drive.google.com/file/d/1oZAKGawGg377rlDFG9fCemIwl0tM2vdV/view?usp=sharing'
    },
    {
      image: '/images/4.jpg',
      title: 'Sertifikat Javascript Introduction',
      description: 'Sertifikat Kompetensi by Myskill Short Class',
      year: '2024',
      link: 'https://drive.google.com/file/d/1OTPJfbg6LmMO_bUY7E9r0PGMGW-bR4Kr/view?usp=sharing'
    }
  ];

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll position untuk mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newSlide = Math.round(scrollLeft / cardWidth);
      
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, currentSlide]);

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth;
    
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
  };

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % certificates.length;
    setCurrentSlide(newSlide);
    
    if (isMobile) {
      scrollToSlide(newSlide);
    }
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + certificates.length) % certificates.length;
    setCurrentSlide(newSlide);
    
    if (isMobile) {
      scrollToSlide(newSlide);
    }
  };

  return (
    <section className="certificates" id="certificates">
      <div className="certificates-container">
        <h2 className="section-title" data-aos="fade-down">Certificates</h2>
        <p className="section-subtitle" data-aos="fade-down" data-aos-delay="200">My achievements</p>
        
        <div className="certificates-grid" ref={scrollContainerRef}>
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className={`certificate-card ${index === currentSlide ? 'active' : ''}`}
              data-aos="zoom-in" 
              data-aos-delay={300 + (index * 100)}
            >
              <div className="certificate-image">
                <Image 
                  src={cert.image} 
                  alt={cert.title} 
                  width={400} 
                  height={500}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  priority={index === 0}
                />
                <div className="certificate-overlay">
                  <h4>{cert.title}</h4>
                  <p>{cert.description}<br />{cert.year}</p>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    View Certificate Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls - Hanya muncul di mobile */}
        <div className="slider-controls">
          <button className="prev-btn" onClick={prevSlide} aria-label="Previous certificate">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="slide-indicator">
            {currentSlide + 1} / {certificates.length}
          </div>
          <button className="next-btn" onClick={nextSlide} aria-label="Next certificate">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}