'use client';

export default function Skills() {
  const skills = [
    { icon: 'fab fa-html5', title: 'HTML5', description: 'Semantic markup, accessibility, SEO optimization' },
    { icon: 'fab fa-css3-alt', title: 'CSS3', description: 'Flexbox, Grid, Animations, Responsive design' },
    { icon: 'fab fa-js', title: 'JavaScript', description: 'DOM manipulation, API integration' },
    { icon: 'fab fa-react', title: 'React', description: 'Components, Hooks, State management' },
    { icon: 'fas fa-bolt', title: 'Next.js', description: 'SSR, SSG, API routes, Full-stack development' },
    { icon: 'fab fa-php', title: 'PHP', description: 'Laravel, REST APIs, Server-side scripting' },
    { icon: 'fas fa-database', title: 'MySQL', description: 'Database design' },
    { icon: 'fab fa-python', title: 'Python', description: 'Automation, Scripting' },
    { icon: 'fas fa-microchip', title: 'ESP32', description: 'IoT development, Sensor integration' },
    { icon: 'fas fa-robot', title: 'Machine Learning', description: 'Predictive modeling, Data preprocessing' }
  ];

  const scrollSkills = (direction) => {
    const container = document.querySelector('.skills-scroll-container');
    const scrollAmount = 300;
    
    if (container) {
      if (direction === 1) {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <h2 className="section-title" data-aos="fade-down">Technical Skills</h2>
        <p className="section-subtitle" data-aos="fade-down" data-aos-delay="200">Tools and technologies I work with</p>
        
        <div className="skills-scroll-container">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card" data-aos="zoom-in" data-aos-delay={300 + (index * 50)}>
                <i className={skill.icon}></i>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span className="scroll-arrow left-arrow" onClick={() => scrollSkills(-1)}>&#10094;</span>
          <span className="scroll-dots"></span>
          <span className="scroll-arrow right-arrow" onClick={() => scrollSkills(1)}>&#10095;</span>
        </div>
      </div>
    </section>
  );
}