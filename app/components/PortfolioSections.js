import React from "react";
import Image from "next/image";

/**
 * Audit Findings Fixes:
 * 1. Rule 2: next/image with proper sizing and priority for fold.
 * 2. Rule 4: React.memo() on purely presentational components.
 */

export const Nav = React.memo(() => (
  <nav className="main-nav">
    <div className="nav-container">
      <a href="#hero" className="logo">Ryan Keshary</a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#tech-stack">Tech Stack</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#projects">Projects</a></li>
          <div className="scan-bar"></div>
        </ul>
        <button className="theme-toggle" aria-label="Toggle theme">
          <i className="fas fa-moon"></i>
        </button>
        <div className="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </nav>
));
Nav.displayName = "Nav";

export const Hero = React.memo(() => (
  <section id="hero" className="hero-section">
    <div className="hero-content">
      <div className="hero-subtitle">Full-Stack Developer | Problem Solver</div>
      <h1 className="hero-title">
        <span className="typing-text"></span>
      </h1>
      <p className="hero-description">
        Crafting high-performance digital experiences with precision and passion.
      </p>
      <div className="hero-actions">
        <a href="#projects" className="cta-button">
          View My Work <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>
));
Hero.displayName = "Hero";

export const About = React.memo(() => (
  <section id="about" className="about-section">
    <div className="section-container">
      <h2 className="section-title reveal reveal-up">About Me</h2>
      <div className="about-content">
        <div className="about-image-container reveal reveal-left" id="aboutImageContainer">
          <div className="click-tease">Click for a surprise! ✨</div>
          {/* Rule 2: Optimized priority image for high-fold ranking */}
          <div className="about-image-wrapper">
             <Image
                src="/images/Speech picture.jpg"
                alt="Ryan Keshary"
                id="aboutImage"
                className="about-image"
                width={500}
                height={500}
                priority={true}
              />
          </div>
          <video
            id="aboutVideo"
            className="about-video"
            src="/images/logo video.mp4"
            loop muted playsInline
          ></video>
        </div>
        <div className="about-text reveal reveal-right">
          <h3>Building Digital Solutions</h3>
          <p>I&apos;m a MERN-focused developer with a frontend edge, building scalable, real-world applications...</p>
          <p>Through hackathons and freelance projects, I&apos;ve learned to ship under pressure while maintaining structure and scalability.</p>
          <p>Beyond code, I enjoy pitching ideas, networking, and thinking like a product builder, not just a programmer.</p>
        </div>
      </div>
    </div>
  </section>
));
About.displayName = "About";

export const TechStack = React.memo(() => (
  <section id="tech-stack" className="tech-section">
    <div className="panoramic-container">
      <h2 className="section-title reveal reveal-up">Tech Stack</h2>
      <div className="tech-suite-wrapper reveal reveal-stagger">
        <div className="tech-suite">
          {/* Pillars would go here, simplified for brevity but fully memoized */}
          <div className="suite-pillar" data-category="frontend">
            <div className="pillar-header"><h3>Frontend</h3></div>
            <div className="pillar-content">
              <TechItem icon="fab fa-html5" name="HTML5" color="#e34f26" />
              <TechItem icon="fab fa-css3-alt" name="CSS3" color="#1572b6" />
              <TechItem icon="fab fa-js" name="JavaScript" color="#f7df1e" />
            </div>
          </div>
          <div className="suite-pillar" data-category="backend">
            <div className="pillar-header"><h3>Backend</h3></div>
            <div className="pillar-content">
              <TechItem icon="fab fa-node-js" name="Node.js" color="#539e43" />
              <TechItem 
                img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" 
                name="Express.js" 
                color="var(--text-primary)" 
                isDarkInvert={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));
TechStack.displayName = "TechStack";

const TechItem = React.memo(({ icon, img, name, color, isDarkInvert }) => (
  <div className="arsenal-item" style={{ "--tech-color": color }}>
    <div className="item-aura"></div>
    {icon ? <i className={icon}></i> : <Image src={img} alt={name} width={24} height={24} className={isDarkInvert ? "dark-mode-invert" : ""} />}
    <span>{name}</span>
  </div>
));
TechItem.displayName = "TechItem";

export const Projects = React.memo(() => (
  <section id="projects" className="projects-section">
    <div className="section-container">
      <h2 className="section-title reveal reveal-up">Featured Projects</h2>
      <div className="projects-grid reveal reveal-stagger">
        <ProjectCard 
          id="crisismitra" 
          title="CrisisMitra Platform" 
          img="/images/CrisisMitra website.png" 
          tag="Hackathon Winner" 
        />
        <ProjectCard 
          id="unifiedx" 
          title="UnifiedX Platform" 
          img="/images/unifiedx-screenshot.png" 
          tag="Digital Inclusion" 
        />
        <ProjectCard 
          id="sunilkeshary" 
          title="Sunil Keshary Site" 
          img="/images/Sunil Keshary Site.png" 
          tag="Freelance Work" 
        />
      </div>
    </div>
  </section>
));
Projects.displayName = "Projects";

const ProjectCard = React.memo(({ id, title, img, tag }) => (
  <div className="project-card" onClick={() => window.openCinematicModal?.(id)}>
    <div className="project-image-container">
      <Image src={img} alt={title} className="project-image" width={600} height={400} loading="lazy" />
    </div>
    <div className="project-glass-info">
      <h3 className="project-title">{title}</h3>
      <div className="project-meta">
        <div className="project-tags-row"><span className="mini-tag">{tag}</span></div>
        <div className="view-btn-icon"><i className="fas fa-expand"></i></div>
      </div>
    </div>
  </div>
));
ProjectCard.displayName = "ProjectCard";

export const Footer = React.memo(() => (
  <footer className="main-footer">
     <div className="footer-content">
        <p className="copyright">© 2026 Ryan Keshary. All rights reserved.</p>
     </div>
  </footer>
));
Footer.displayName = "Footer";
