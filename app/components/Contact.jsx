'use client';
import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    // Initialize AOS
    import('aos').then((AOS) => {
      AOS.init({
        duration: 1000,
        once: false,
        offset: 120,
        mirror: true,
        easing: 'ease-in-out-quad'
      });
    });
  }, []);

  return (
    <>
      {/* Parallax Hero */}
      <div className="container">
        <div className="parallax"></div>
      </div>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <h2 className="section-title" data-aos="fade-down">Contact Me</h2>
          <p className="section-subtitle" data-aos="fade-down" data-aos-delay="200">
            Get in touch with me
          </p>

          <div className="contact-content">
            <div className="contact-info" data-aos="fade-right" data-aos-delay="300">
              <div className="contact-form">
                <form action="https://formspree.io/f/manozrzv" method="POST">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="message" 
                      placeholder="Your Message" 
                      rows="5" 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="border-button">
                    <span className="btn-text">Send Message</span>
                  </button>
                </form>
              </div>

              <div className="contact-social">
                <h3>Connect with me</h3>
                <div className="social">
                  <a 
                    href="https://wa.me/082239791258" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a 
                    href="https://www.instagram.com/hensigeraldi_?igsh=MTNyemJtMHJ4MW1neA==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="https://www.facebook.com/share/1EoQDvdb29/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-map" data-aos="fade-left" data-aos-delay="400">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4969.947684985823!2d124.8861880758621!3d1.5159031610177338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287a06bc0f99f51%3A0x84b0eb65fef69c90!2sKost%20Pagar%20Miring!5e1!3m2!1sen!2sid!4v1748076626345!5m2!1sen!2sid" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}