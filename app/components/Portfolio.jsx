'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Portfolio() {
  const imagesBaseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '/images';
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const projects = [
    {
      image: `${imagesBaseUrl}/SAW.png`,
      title: 'SAW calculation project',
      description: 'Semester 6 Decision Making System Course Project, namely for Scholarship Selection Using the SAW Method',
      tech: 'php, HTML5, CSS3, Bootstrap, and Java Script',
      link: null
    },
    {
      image: `${imagesBaseUrl}/BPJS.png`,
      title: 'Digitalization of BPJS Assets',
      description: 'Digitalization for asset/facility management at the BPJS Employment office',
      tech: 'Next.js, React.js, Node.js, and Prisma',
      link: 'https://github.com/Hensigeraldi/FasilitasBPJS.git'
    },
    {
      image: `${imagesBaseUrl}/Hasilsaw.png`,
      title: 'Scholarship Selection Results',
      description: 'After the prospective scholarship recipients fill out the specified form, the scholarship selection results will appear.',
      tech: 'php, HTML5, CSS3, Bootstrap, and Java Script',
      link: null
    },
    {
      image: `${imagesBaseUrl}/Kelembapanprediksi.png`,
      title: 'Soil moisture monitoring and water prediction using machine learning',
      description: 'My project in the Machine Learning course is designed to read soil moisture using soil moisture and predict liters of water using random forest machine learning to produce healthy and high-quality plants.',
      tech: 'Esp32, Python Random Forest, Frontend : Html5 Css3 and javascript',
      link: null
    },
    {
      image: `${imagesBaseUrl}/footer.png`,
      title: 'Footer',
      description: 'In this footer section to display the development team, a team that is committed to presenting the best technology solutions for farmers. Contact us for questions to us or to work together and about this system.',
      tech: 'Frontend : Html5 Css3 and javascript',
      link: null
    },
    {
      image: `${imagesBaseUrl}/commerce.png`,
      title: 'E-Commerce',
      description: 'My project this time is also a shopping website for various foods and drinks, a responsive display designed to give users a good shopping experience and will later be promoted to MSME partners.',
      tech: 'Visit',
      link: 'https://github.com/notnat1/Food-Store'
    }
  ];

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('portfolio-particles-js', {
        particles: {
          number: { 
            value: 80, 
            density: { 
              enable: true, 
              value_area: 800 
            } 
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { 
            value: 0.5, 
            random: false 
          },
          size: { 
            value: 3, 
            random: true 
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            out_mode: "out"
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { 
              enable: true, 
              mode: "repulse" 
            },
            onclick: { 
              enable: true, 
              mode: "push" 
            }
          },
          modes: {
            repulse: { 
              distance: 200, 
              duration: 0.4 
            },
            push: { 
              particles_nb: 4 
            }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <>
      <section className="portfolio" id="portfolio">
        <div id="portfolio-particles-js"></div>
        <div className="portfolio-container">
          <h2 className="section-title" data-aos="fade-down">My Project Experience</h2>
          <p className="section-subtitle" data-aos="fade-down" data-aos-delay="200">projects I have worked on so far</p>
          
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" data-aos="zoom-in" data-aos-delay={300 + (index * 100)}>
                <div className="project-image image-morph" onClick={() => openModal(project.image)}>
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={350} 
                    height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.link ? (
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">{project.tech}</a>
                  ) : (
                    <span className="project-link">{project.tech}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <span className="close-btn" onClick={closeModal}>&times;</span>
          <Image 
            src={modalImage} 
            alt="Modal" 
            className="modal-content"
            width={1200}
            height={800}
            style={{ width: 'auto', height: 'auto', maxWidth: '80%' }}
          />
        </div>
      )}
    </>
  );
}