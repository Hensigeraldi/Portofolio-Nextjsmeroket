'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  // Handle navigation to home sections from any page
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    
    // If we're not on home page, go to home first then scroll
    if (pathname !== '/') {
      router.push('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Already on home, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image src="/images/logo1.jpeg" alt="Logo" width={40} height={40} />
              <span>Nzyy.</span>
            </Link>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link href="/#home" onClick={(e) => handleSectionClick(e, 'home')}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" onClick={(e) => handleSectionClick(e, 'about')}>
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" onClick={(e) => handleSectionClick(e, 'portfolio')}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#skills" onClick={(e) => handleSectionClick(e, 'skills')}>
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#certificates" onClick={(e) => handleSectionClick(e, 'certificates')}>
                  Certificates
                </Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Info</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <a 
                  href="https://maps.app.goo.gl/zedZLjGwgmiZR1iF7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Kost Pagar Miring, Manado
                </a>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a 
                  href="https://wa.me/6282239791258" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  +62 822-3979-1258
                </a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hensiirot100@gmail.com&su=Halo%20Hensi&body=Hai%20Hensi%2C%20saya%20tertarik%20dengan%20portfolio%20kamu!" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  hensiirot100@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h3>Follow Me</h3>
            <div className="social-icons">
              <a href="https://wa.me/082239791258" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/hensigeraldi_?igsh=MTNyemJtMHJ4MW1neA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/share/1EoQDvdb29/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Hensi Geraldi Irot. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}