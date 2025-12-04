'use client';
import Image from 'next/image';

export default function About() {
  // Ambil base URL dari environment variable
  const imagesBaseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '/images';
  
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-img" data-aos="zoom-out-right" data-aos-delay="200">
          <div className="image-morph">
            <Image 
              src={`${imagesBaseUrl}/Kompas.jpg`}
              alt="About Me" 
              width={400} 
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
        <div className="about-content" data-aos="zoom-out-left" data-aos-delay="400">
          <h2 className="text-morph">About Me</h2>
          <p data-aos="fade-up" data-aos-delay="600">
            Hello, I am Hensi Geraldi Irot, I come from Sulawesi and was born in Papua Biak Numfor and I am very interested in fullstack developers which allows me to develop responsive and interactive interface websites.
          </p>
          <div className="about-details">
            <div className="detail-item" data-aos="flip-left" data-aos-delay="800">
              <i className="fas fa-graduation-cap"></i>
              <h3>Education</h3>
              <p>Informatics Engineering<br />Manado State Polytechnic</p>
            </div>
            <div className="detail-item" data-aos="flip-right" data-aos-delay="1000">
              <i className="fas fa-briefcase"></i>
              <h3>Experience</h3>
              <p>2019 - 3 Months<br />Pt Wapoga Mutiara Industri Biak Numfor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}