'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function About() {
  const imagesBaseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '/images';
  const [activeTab, setActiveTab] = useState('experience');

  const stats = [
    { icon: '💼', number: '2', label: 'Experience' },
    { icon: '🚀', number: '5+', label: 'Projects Completed' },
    { icon: '⚡', number: '10+', label: 'Technologies' },
    { icon: '☕', number: '∞', label: 'Coffee Consumed' }
  ];

  const experiences = [
    {
      company: 'PT Kompas Cyber Media (KCM)',
      location: 'Jakarta Pusat',
      role: 'DevOps Engineer',
      duration: 'July 2025 - December 2025',
      period: '6 months',
      responsibilities: [
        'Implemented CI/CD pipelines',
        'Managed cloud infrastructure (AWS)',
        'Automated deployment processes',
        'Containerization with Docker'
      ],
      color: '#667eea'
    },
    {
      company: 'PT Wapoga Mutiara Industri (WMI)',
      location: 'Biak Numfor',
      role: 'IT Support Technician',
      duration: 'September 2019 - November 2019',
      period: '3 months',
      responsibilities: [
        'Network cable installation (RJ45)',
        'Printer assembly and setup',
        'Hardware maintenance and troubleshooting'
      ],
      color: '#764ba2'
    }
  ];

  const education = {
    institution: 'Manado State Polytechnic',
    location: 'Manado, Sulawesi Utara',
    program: 'Informatics Engineering',
    duration: '2022 - Present',
    achievements: [
      'GPA: 3.5/4.0',
      'Focus on Software Development',
    ]
  };

  return (
    <section className="about-modern" id="about">
      <div className="about-modern-container">
        
        {/* Header Section */}
        <div className="about-header" data-aos="fade-down">
          <h2 className="about-title">About Me</h2>
          <p className="about-subtitle">Full Stack Developer & DevOps Enthusiast</p>
        </div>

        {/* Profile & Intro Section */}
        <div className="profile-section" data-aos="fade-up">
          <div className="profile-image-wrapper" data-aos="zoom-in" data-aos-delay="200">
            <div className="profile-glow"></div>
            <div className="image-morph-modern">
              <Image 
                src={`${imagesBaseUrl}/Kompas.jpg`}
                alt="Hensi Geraldi Irot" 
                width={300} 
                height={300}
                className="profile-image"
              />
            </div>
          </div>
          
          <div className="profile-intro" data-aos="fade-left" data-aos-delay="300">
            <h3>Hello, I'm Hensi Geraldi Irot 👋</h3>
            <p>
              Originally from Sulawesi and born in Papua Biak Numfor. 
              I am passionate about fullstack development with expertise in creating responsive and interactive 
              web applications. During my internship at Kompas Cyber Media, I also gained valuable experience 
              in DevOps practices, working with modern tools and technologies to enhance development workflows 
              and deployment processes.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid" data-aos="fade-up" data-aos-delay="400">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
              data-aos="zoom-in"
              data-aos-delay={400 + (index * 100)}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs for Experience & Education */}
        <div className="tabs-section" data-aos="fade-up" data-aos-delay="600">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <i className="fas fa-briefcase"></i>
              Experience
            </button>
            <button 
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <i className="fas fa-graduation-cap"></i>
              Education
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'experience' ? (
              <div className="experience-timeline">
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className="timeline-item"
                    data-aos="fade-up"
                    data-aos-delay={700 + (index * 200)}
                  >
                    <div className="timeline-dot" style={{ background: exp.color }}></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h4>{exp.company}</h4>
                        <span className="timeline-period">{exp.period}</span>
                      </div>
                      <p className="timeline-location">{exp.location}</p>
                      <div className="timeline-role">{exp.role}</div>
                      <p className="timeline-duration">{exp.duration}</p>
                      <ul className="timeline-responsibilities">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="education-content" data-aos="fade-up" data-aos-delay="700">
                <div className="education-card">
                  <div className="education-icon">
                    <i className="fas fa-university"></i>
                  </div>
                  <div className="education-details">
                    <h4>{education.institution}</h4>
                    <p className="education-location">{education.location}</p>
                    <div className="education-program">{education.program}</div>
                    <p className="education-duration">{education.duration}</p>
                    <div className="education-achievements">
                      {education.achievements.map((achievement, i) => (
                        <div key={i} className="achievement-item">
                          <i className="fas fa-check-circle"></i>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}