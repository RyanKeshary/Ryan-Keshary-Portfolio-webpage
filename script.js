// ===========================
// CELEBRATION (CONFETTI)
// ===========================

function createConfetti(x, y) {
  const colors = ["#ffd700", "#ffffff", "#ff0055", "#4361ee", "#4cc9f0"];
  const confettiCount = 30;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-particle";

    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 8 + 4;
    const rotation = Math.random() * 360;

    confetti.style.backgroundColor = color;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.transform = `rotate(${rotation}deg)`;

    document.body.appendChild(confetti);

    // Animation
    let posX = x;
    let posY = y;
    let velX = Math.cos(angle) * velocity;
    let velY = Math.sin(angle) * velocity;
    const gravity = 0.2;
    let opacity = 1;

    function animate() {
      velY += gravity;
      posX += velX;
      posY += velY;
      opacity -= 0.02;

      confetti.style.left = `${posX}px`;
      confetti.style.top = `${posY}px`;
      confetti.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    }

    requestAnimationFrame(animate);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Confetti trigger on certificate button clicks
  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".btn-view-cert")) {
      const rect = e.target.closest(".btn-view-cert").getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createConfetti(x, y);
    }
  });

  // Click-to-Play/Toggle Video in About Section
  const aboutContainer = document.getElementById("aboutImageContainer");
  const aboutVideo = document.getElementById("aboutVideo");
  const clickTease = document.querySelector(".click-tease");
  let revertDelay;

  if (aboutContainer && aboutVideo) {
    aboutContainer.addEventListener("click", () => {
      clearTimeout(revertDelay);

      if (!aboutContainer.classList.contains("video-active")) {
        // ACTIVATE VIDEO
        aboutContainer.classList.add("video-active");
        aboutVideo.play();
        if (clickTease) {
          clickTease.classList.remove("tease-visible");
          // Set timer to show revert prompt
          revertDelay = setTimeout(() => {
            if (aboutContainer.classList.contains("video-active")) {
              clickTease.textContent = "Click to go back! 📸";
              clickTease.classList.add("revert-prompt");
              clickTease.classList.add("tease-visible");
            }
          }, 7000); // Show after 7 seconds
        }
      } else {
        // REVERT TO IMAGE
        aboutContainer.classList.remove("video-active");
        setTimeout(() => {
          aboutVideo.pause();
          aboutVideo.currentTime = 0;
        }, 600); // Wait for fade out
        if (clickTease) {
          clickTease.classList.remove("tease-visible");
          clickTease.classList.remove("revert-prompt");
          setTimeout(() => {
            clickTease.textContent = "Click for a surprise! ✨";
          }, 400);
        }
      }
    });

    // Auto-show tease on Mobile/Tab when scrolled into view (Only if not already playing)
    const teaserObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isMobileOrTab = window.innerWidth <= 1080;
          if (entry.isIntersecting && isMobileOrTab) {
            if (
              clickTease &&
              !aboutContainer.classList.contains("video-active")
            ) {
              clickTease.classList.add("tease-visible");
            }
          } else {
            if (
              clickTease &&
              !aboutContainer.classList.contains("video-active")
            ) {
              clickTease.classList.remove("tease-visible");
            }
          }
        });
      },
      { threshold: 0.6 },
    );

    teaserObserver.observe(aboutContainer);
  }
});

// ===========================
// ACHIEVEMENT DATA
// ===========================

const achievementData = {
  1: {
    icon: "🏆",
    date: "2025",
    title: "JARVIS 24-Hour Hackathon - 1st Place Winner",
    content: `
    <p>Secured <strong>1st Place</strong> at the JARVIS 24-Hour Hackathon for developing <strong>CrisisMitra</strong> - a real-time disaster management platform connecting victims, volunteers, and authorities, even in low-connectivity environments.</p>

    <p>The project featured live geolocation mapping, multilingual support, offline synchronization, and AI-powered natural language processing for interpreting crisis reports.</p>

    <p><strong>Key contributions:</strong></p>
    <ul>
      <li>Led frontend development and live map integration using Leaflet.js and OpenStreetMap</li>
      <li>Implemented multilingual interface (English, Hindi, Marathi) for inclusive accessibility</li>
      <li>Collaborated on AI-driven NLP using spaCy for offline crisis report parsing</li>
      <li>Integrated Firebase for real-time synchronization and data persistence</li>
      <li>Delivered a full-stack prototype within 24 hours under intense time pressure</li>
    </ul>

    <p>This win reinforced my ability to prototype fast, collaborate under pressure, and design scalable, socially impactful tech solutions.</p>

    <div class="modal-share-section">
      <div class="grain-overlay"></div>
      <div class="orb-3"></div>
      <div class="cert-wrapper">
        <a href="https://drive.google.com/file/d/1VGSquev-mbg83EI7XB65ruF8Z3PfkFMt/view?usp=sharing" target="_blank" class="btn-view-cert">
          <i class="fas fa-certificate"></i> View Certificate
        </a>
      </div>
      <div class="share-group">
        <a href="https://x.com/RyanKeshary/status/1977718825521983632" target="_blank" class="share-item twitter">
          <i class="fab fa-x-twitter"></i> Twitter
        </a>
        <a href="https://www.linkedin.com/posts/ryankeshary_hackathon-firstplace-crisismitra-activity-7383482917143949312-8l0d" target="_blank" class="share-item linkedin">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
    </div>
  `,
  },

  // 2: {
  //     icon: '',
  //     date: '2023',
  //     title: 'Full-Stack Certification',
  //     content: `
  //         <p>Completed comprehensive full-stack development program, mastering modern web technologies and best practices in software engineering.</p>

  //         <p>This intensive certification program covered the entire software development lifecycle, from planning and design to deployment and maintenance. The curriculum included:</p>

  //         <ul>
  //             <li>Frontend development with React, Vue.js, and modern JavaScript</li>
  //             <li>Backend development using Node.js, Express, and RESTful API design</li>
  //             <li>Database design and management with SQL and NoSQL databases</li>
  //             <li>DevOps practices including CI/CD, Docker, and cloud deployment</li>
  //             <li>Software architecture patterns and system design principles</li>
  //             <li>Agile methodologies and project management</li>
  //         </ul>

  //         <p>Throughout the program, I completed multiple real-world projects, including an e-commerce platform, a social media application, and a data analytics dashboard. These projects allowed me to apply theoretical knowledge to practical scenarios and build a strong portfolio.</p>

  //         <p>The certification validated my skills and prepared me for tackling complex development challenges in professional environments.</p>
  //     `
  // },
  // 3: {
  //     icon: '💡',
  //     date: '2023',
  //     title: 'Open Source Contributor',
  //     content: `
  //         <p>Active contributor to multiple open-source projects, helping improve documentation and implementing new features for the developer community.</p>

  //         <p>My open-source journey began with fixing small bugs and has evolved into making significant contributions to several major projects. I believe in giving back to the community that has provided so many valuable tools and learning resources.</p>

  //         <p>Notable contributions include:</p>
  //         <ul>
  //             <li>Improved documentation for a popular React UI library, making it more accessible to beginners</li>
  //             <li>Implemented new features for a Node.js testing framework used by thousands of developers</li>
  //             <li>Fixed critical bugs in a data visualization library</li>
  //             <li>Contributed to internationalization efforts for several projects</li>
  //             <li>Mentored new contributors and reviewed pull requests</li>
  //         </ul>

  //         <p>Through open-source contributions, I've learned the importance of code quality, documentation, testing, and collaboration. Working with developers from around the world has exposed me to different perspectives and best practices.</p>

  //         <p>I continue to actively maintain several repositories and look for opportunities to contribute to projects that align with my interests and expertise.</p>
  //     `
  // },
  // 4: {
  //     icon: '🌟',
  //     date: '2022',
  //     title: 'Best Project Award',
  //     content: `
  //         <p>Received recognition for outstanding project design and implementation in university capstone project, demonstrating advanced technical skills and innovation.</p>

  //         <p>Our capstone project focused on developing an intelligent transportation system that could optimize traffic flow in urban areas using real-time data and predictive analytics.</p>

  //         <p>The project included:</p>
  //         <ul>
  //             <li>IoT sensor integration for real-time traffic monitoring</li>
  //             <li>Machine learning algorithms for traffic pattern prediction</li>
  //             <li>Web-based dashboard for city planners and traffic management</li>
  //             <li>Mobile application for commuters with route optimization</li>
  //             <li>Comprehensive testing with simulated traffic scenarios</li>
  //         </ul>

  //         <p>What set our project apart was not just the technical implementation, but also the thorough research, user-centered design approach, and potential real-world impact. We conducted extensive user interviews, gathered feedback from traffic management professionals, and iterated on our design multiple times.</p>

  //         <p>The recognition from the academic panel validated our hard work and innovative approach to solving a complex urban challenge. This project taught me valuable lessons about project management, teamwork, and the importance of considering both technical feasibility and user needs.</p>
  //     `
  // }
};

// ===========================
// PROJECT DATA (FOR LIGHTBOX)
// ===========================

const projectData = {
  crisismitra: {
    title: "CrisisMitra Platform",
    theme: "emergency",
    image: "./material/images/CrisisMitra website.png",
    tags: [
      "Node.js",
      "Firebase",
      "Leaflet.js",
      "FastAPI",
      "Google Translate API",
      "Offline Sync",
      "OpenStreetMap",
    ],
    demoLink: "https://ryankeshary.github.io/Team-Errorist/",
    codeLink: "https://github.com/RyanKeshary/Team-Errorist",
    videoId: "bhH8VVJGsy8",
    context: "Hackathon Winner",
    description: `
      <p><strong>CrisisMitra</strong> is a full-stack disaster management system designed to solve communication breakdowns during natural calamities. It was developed during a 24-hour sprint and won <strong>1st Place</strong> at the JARVIS Hackathon.</p>
      
      <p>Key technical features include:</p>
      <ul>
        <li><strong>Offline Resilience:</strong> Uses intelligent queuing to store SOS alerts locally when internet is lost, syncing automatically upon restoration.</li>
        <li><strong>Situational Awareness:</strong> Integrates Leaflet.js and OpenStreetMap for a real-time command dashboard for authorities.</li>
        <li><strong>Linguistic Inclusion:</strong> Automatic translation support for regional languages (Hindi, Marathi) ensuring no one is left behind.</li>
        <li><strong>Cloud Architecture:</strong> Real-time data streaming via Firebase and a robust backend powered by Node.js and FastAPI.</li>
      </ul>
    `,
  },
  unifiedx: {
    title: "UnifiedX Digital Inclusion",
    theme: "inclusion",
    image: "./material/images/unifiedx-screenshot.png",
    tags: [
      "Vanilla JS",
      "JSON",
      "CSS Grid",
      "Digital Literacy",
      "Public Transit API",
    ],
    demoLink: "https://ryankeshary.github.io/Idea-Lab---UnifiedX/",
    codeLink: "https://github.com/RyanKeshary/Idea-Lab---UnifiedX",
    videoId: "3gaPY9mBnNQ",
    context: "Digital Inclusion",
    description: `
      <p><strong>UnifiedX</strong> targets the digital divide in developing urban areas. It's a comprehensive web portal designed for ease of use by non-tech-savvy citizens.</p>
      
      <p>Highlighted Features:</p>
      <ul>
        <li><strong>Transit Navigation:</strong> A simplified localization system for public transport routes and schedules.</li>
        <li><strong>Cyber Hygiene:</strong> Interactive modules teaching basic digital safety and secure internet practices.</li>
        <li><strong>Pure Performance:</strong> Built without heavy frameworks for maximum loading speed on low-bandwidth connections.</li>
        <li><strong>Data-Driven:</strong> Managed via organized JSON structures for easy content updates without code changes.</li>
      </ul>
    `,
  },
  sunilkeshary: {
    title: "Sunil Keshary Site",
    theme: "visionary",
    image: "./material/images/Sunil Keshary Site.png",
    tags: [
      "Responsive Design",
      "JavaScript",
      "Animations",
      "UI/UX",
      "Form Integration",
    ],
    demoLink: "https://www.sunilkeshary.in/",
    codeLink: "https://github.com/RyanKeshary/Sunil-Keshary-Website",
    context: "Freelance Work",
    description: `
      <p>A high-performance commercial portfolio built for a political vision and community engagement presence.</p>
      
      <p>Core elements include:</p>
      <ul>
        <li><strong>Visual Storytelling:</strong> Integrated dynamic gallery lightboxes and smooth intersection observers for an engaging narrative flow.</li>
        <li><strong>Multi-Channel Contact:</strong> Secure form integration and direct social automation for constituent outreach.</li>
        <li><strong>Regional Focus:</strong> Multilingual SEO optimization to reach diverse local demographics.</li>
        <li><strong>Aesthetic Polish:</strong> Custom-tailored CSS with a premium feel and zero-layout-shift performance.</li>
      </ul>
    `,
  },
};

// ===========================
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  const themeIcon = document.querySelector(".theme-toggle i");

  const applyTheme = () => {
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Animate icon change with a spin
    if (themeIcon) {
      themeIcon.style.transform = "scale(0) rotate(180deg)";
      setTimeout(() => {
        themeIcon.className =
          newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
        themeIcon.style.transform = "scale(1) rotate(0deg)";
      }, 150);
    }
  };

  // Modern View Transition API: Atmospheric Depth Morph
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      applyTheme();
    });
  } else {
    // Fallback: Smooth CSS transition Utility
    document.body.classList.add("theme-transitioning");
    applyTheme();
    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 600);
  }
}

// Load saved theme on page load
// Load saved theme on page load and listen for system changes
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    const themeIcon = document.querySelector(".theme-toggle i");
    if (themeIcon) {
      themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
  };

  // 1. Initial Load - Prioritize System Sync
  applyTheme(systemQuery.matches ? "dark" : "light");

  // Optional: Check if a session override exists (sessionStorage vs localStorage)
  // For strict system sync, we skip persistent storage acting as an override on load.

  // 2. Real-time System Sync
  systemQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    applyTheme(newTheme);
    // Sync localStorage so the preference persists if page reloaded immediately
    localStorage.setItem("theme", newTheme);
  });
}

// ===========================
// MOBILE MENU
// ===========================

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");

  if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

// ===========================
// GLOBAL PERFORMANCE STATE
// ===========================
window.isLowEnd = false;
window.isMobile = window.innerWidth <= 768;

function checkSystemPerformance() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const cores = navigator.hardwareConcurrency || 4;

  // Strict "Potato" criteria
  // Less aggressive criteria to allow animations on modern mobile devices
  const isPotato =
    cores < 2 || // Only truly old devices
    (connection &&
      (connection.saveData || connection.effectiveType.includes("2g")));

  if (isPotato) {
    window.isLowEnd = true;
    document.body.classList.add("reduced-animations");
    console.log("🥔 Potato Mode Engaged: Performance Optimizations Active");
  } else {
    console.log("🚀 Performance Mode: Atmospheric Effects Active");
  }
}
// Run immediately
checkSystemPerformance();

// ===========================
// SMOOTH SCROLL (LENIS)
// ===========================

let lenis;
if (!window.isLowEnd && !window.isMobile) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function initSmoothScroll() {
  document
    .querySelectorAll('a[href^="#"]:not(.btn-modal-action)')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
          // Use Lenis if available, else native smooth scroll
          if (lenis) {
            lenis.scrollTo(target, {
              offset: -80,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            // Native fallback for potato/mobile
            const offset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: window.isLowEnd ? "auto" : "smooth",
            });
          }

          // Close mobile menu if open
          const navLinks = document.querySelector(".nav-links");
          const hamburger = document.querySelector(".hamburger");
          if (navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            document.body.classList.remove("menu-open");
          }
        }
      });
    });
}

// ===========================
// TYPING ANIMATION
// ===========================

function typeText(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add cursor class when done
      element.classList.add("typing-cursor");
      // Remove cursor after 2 seconds
      setTimeout(() => {
        element.classList.remove("typing-cursor");
      }, 2000);
    }
  }

  type();
}

// ===========================
// HERO ANIMATIONS
// ===========================

function initHeroAnimations() {
  const typingElement = document.querySelector(".typing-text");
  const subtitle = document.querySelector(".hero-subtitle");
  const description = document.querySelector(".hero-description");
  const ctaButton = document.querySelector(".cta-button");

  const isTranslated =
    document.cookie.includes("googtrans") &&
    !document.cookie.includes("googtrans=/en/en");

  if (window.isLowEnd) {
    if (typingElement) typingElement.textContent = "hi, ryan here";
    if (subtitle) {
      subtitle.style.opacity = 1;
      subtitle.style.transform = "none";
    }
    if (description) {
      description.style.opacity = 1;
      description.style.transform = "none";
    }
    if (ctaButton) {
      ctaButton.style.opacity = 1;
      ctaButton.style.transform = "none";
    }
    return;
  }

  if (typingElement) {
    setTimeout(() => {
      // If translated, type the text in the target language if possible,
      // or just set it to avoid the typing animation breaking translation
      if (isTranslated) {
        typingElement.textContent = "hi, ryan here"; // Let Google handle it
      } else {
        typeText(typingElement, "hi, ryan here", 80);
      }
    }, 400);
  }

  if (subtitle) {
    subtitle.style.opacity = "0";
    subtitle.style.transform = "translateY(20px)";
    setTimeout(() => {
      subtitle.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      subtitle.style.opacity = "1";
      subtitle.style.transform = "translateY(0)";
    }, 100);
  }

  if (description) {
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";
    setTimeout(() => {
      description.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      description.style.opacity = "1";
      description.style.transform = "translateY(0)";
    }, 1600);
  }

  if (ctaButton) {
    ctaButton.style.opacity = "0";
    ctaButton.style.transform = "translateY(20px)";
    setTimeout(() => {
      ctaButton.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      ctaButton.style.opacity = "1";
      ctaButton.style.transform = "translateY(0)";
    }, 2000);
  }
}

// ===========================
// PARTICLE SYSTEM
// ===========================

function createParticles() {
  if (window.isLowEnd) return; // KILL SWITCH for potato devices

  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  // Increased particles for better visibility
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 18 : 35;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Diverse shape variety
    const size = Math.random() * (isMobile ? 50 : 100) + 40;
    const isCircle = Math.random() > 0.6;
    const isDiamond = !isCircle && Math.random() > 0.5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    if (isCircle) {
      particle.style.borderRadius = "50%";
    } else if (isDiamond) {
      particle.style.transform = "rotate(45deg)";
      particle.style.borderRadius = "12%";
    } else {
      particle.style.borderRadius = "20%"; // Aesthetic rounded square
    }

    // Elegant multi-axis animation
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * -20;
    particle.style.animation = `floatAndRotate ${duration}s infinite linear`;
    particle.style.animationDelay = `${delay}s`;

    // Varying blur for 3D depth effect (REMOVED JS BLUR FOR PERFORMANCE)
    // particle.style.backdropFilter = `blur(${blurAmount}px)`; // KILLER OF FPS

    // Use simple opacity instead
    particle.style.opacity = Math.random() * 0.4 + 0.1;

    particlesContainer.appendChild(particle);

    // Higher opacity for better visibility
    setTimeout(() => {
      particle.style.opacity = Math.random() * 0.4 + 0.35; // Increased minimum opacity
      particle.style.transition = "opacity 3s ease";
    }, Math.random() * 1500);
  }
}

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observerOptions = {
    threshold: 0.1, // Reduced for faster response
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  reveals.forEach((el) => observer.observe(el));
}

// ===========================
// SKILL BAR ANIMATIONS
// ===========================

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
        observer.unobserve(bar);
      }
    });
  }, observerOptions);

  skillBars.forEach((bar) => observer.observe(bar));
}

// ===========================
// PROJECT FILTERING
// ===========================

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects with animation
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ===========================
// ACHIEVEMENT MODAL
// ===========================

function openAchievementModal(id) {
  const modal = document.getElementById("achievementModal");
  const data = achievementData[id];

  if (!data) return;

  // Populate modal content
  document.querySelector(".modal-icon").textContent = data.icon;
  document.querySelector(".modal-date").textContent = data.date;
  document.querySelector(".modal-title").textContent = data.title;
  document.querySelector(".modal-body").innerHTML = data.content;

  // Show modal and reset scroll position
  modal.classList.add("active");
  const modalContentOuter = modal.querySelector(".modal-content") || modal;
  modalContentOuter.scrollTop = 0;

  // Robust Scroll Lock (HTML + BODY)
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.overflow = "hidden";

  // Stop Lenis
  if (typeof lenis !== "undefined") lenis.stop();

  // Nudge Translation Engine for dynamic content
  if (typeof window.assassinateGoogleUI === "function")
    window.assassinateGoogleUI();
}

function closeAchievementModal() {
  const modal = document.getElementById("achievementModal");
  modal.classList.remove("active");

  // Release Lock
  document.documentElement.style.overflow = "";
  document.documentElement.style.scrollBehavior = "";
  document.body.style.overflow = "";

  // Resume Lenis
  if (typeof lenis !== "undefined") lenis.start();
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAchievementModal();
  }
});

// Close modal on background click
document.getElementById("achievementModal")?.addEventListener("click", (e) => {
  if (e.target.id === "achievementModal") {
    closeAchievementModal();
  }
});

// ===========================
// CINEMATIC LIGHTBOX LOGIC
// ===========================

function openCinematicModal(id) {
  const overlay = document.getElementById("cinematicOverlay");
  const modal = overlay.querySelector(".cinematic-modal");
  const data = projectData[id];
  if (!data) return;

  // Reset theme classes
  overlay.classList.remove(
    "emergency-theme",
    "inclusion-theme",
    "visionary-theme",
  );
  if (data.theme) {
    overlay.classList.add(`${data.theme}-theme`);
  }

  // Render Visuals
  document.getElementById("modalVisualImage").src = data.image;
  document.getElementById("modalVisualTitle").textContent = data.title;
  document.getElementById("modalVisualBody").innerHTML = data.description;

  // Handle Video
  const videoContainer = document.getElementById("modalVideoContainer");
  if (data.videoId) {
    const autoPlay = window.isLowEnd ? "0" : "1";
    videoContainer.innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${data.videoId}?autoplay=${autoPlay}&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playlist=${data.videoId}&loop=1" 
        style="pointer-events: none;"
        allow="autoplay; encrypted-media">
      </iframe>`;
    videoContainer.style.display = "block";
  } else {
    videoContainer.innerHTML = "";
    videoContainer.style.display = "none";
  }

  // Links
  document.getElementById("modalVisualDemo").href = data.demoLink;
  document.getElementById("modalVisualCode").href = data.codeLink;

  // Tag Rendering
  const tagsContainer = document.getElementById("modalVisualTags");
  tagsContainer.innerHTML = "";

  // Add Context Tag first
  const ctxSpan = document.createElement("span");
  ctxSpan.className = "mini-tag context-highlight";
  ctxSpan.textContent = data.context;
  tagsContainer.appendChild(ctxSpan);

  // Add Tech Tags
  data.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "mini-tag";
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Activate and Reset Scroll Position
  overlay.classList.add("active");
  overlay.scrollTop = 0;

  // Lock Body to prevent background scroll
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.scrollBehavior = "auto";

  // Stop Lenis to allow native independent scrolling in modal
  if (typeof lenis !== "undefined") {
    lenis.stop();
  }

  // Thumbnail click events
  const imageContainer = document.querySelector(".modal-image-container");
  if (imageContainer) {
    imageContainer.onclick = () => openMediaViewer("image", data.image);
  }

  if (data.videoId) {
    videoContainer.onclick = () => openMediaViewer("video", data.videoId);
  }

  // Nudge Translation Engine for dynamic content
  if (typeof window.assassinateGoogleUI === "function")
    window.assassinateGoogleUI();
}

function closeCinematicModal() {
  const overlay = document.getElementById("cinematicOverlay");
  // Stop video when closing
  document.getElementById("modalVideoContainer").innerHTML = "";
  overlay.classList.remove("active");

  // Release Lock
  document.documentElement.style.overflow = "";
  document.documentElement.style.scrollBehavior = "";
  document.body.style.overflow = "";

  if (typeof lenis !== "undefined") lenis.start();
}

// Global Modal Esc Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCinematicModal();
    closeAchievementModal();
  }
});

// Cinematic Modal Backdrop Click
document.getElementById("cinematicOverlay")?.addEventListener("click", (e) => {
  if (e.target.id === "cinematicOverlay") {
    closeCinematicModal();
  }
});

// ===========================
// MEDIA VIEWER (FULL SCREEN)
// ===========================

function openMediaViewer(type, content) {
  const viewer = document.getElementById("mediaViewer");
  const viewerContent = document.getElementById("mediaViewerContent");

  if (type === "image") {
    viewerContent.innerHTML = `<img src="${content}" style="max-width: 95%; max-height: 95%; object-fit: contain; border-radius: 10px; box-shadow: 0 0 50px rgba(255,255,255,0.1);">`;
  } else if (type === "video") {
    const autoPlay = window.isLowEnd ? "0" : "1";
    viewerContent.innerHTML = `
      <div style="width: 100%; max-width: 1000px; aspect-ratio: 16/9;">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${content}?autoplay=${autoPlay}&modestbranding=1&rel=0" 
          frameborder="0" 
          allow="autoplay; fullscreen"
          style="border-radius: 10px;"
        ></iframe>
      </div>`;
  }

  viewer.classList.add("active");
}

function closeMediaViewer() {
  const viewer = document.getElementById("mediaViewer");
  const viewerContent = document.getElementById("mediaViewerContent");
  viewer.classList.remove("active");
  viewerContent.innerHTML = "";
}

// Global Escape for Media Viewer
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMediaViewer();
  }
});

// Cinematic Backdrop Click
document.getElementById("cinematicOverlay")?.addEventListener("click", (e) => {
  if (e.target.id === "cinematicOverlay") {
    closeCinematicModal();
  }
});

// ===========================
// ACTIVE NAV LINK
// ===========================

function updateActiveNavLink() {
  // Performance: Use IntersectionObserver instead of scroll event
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

// ===========================
// PARALLAX EFFECTS
// ===========================

function initParallax() {
  const hero = document.querySelector(".hero-content");
  const particles = document.getElementById("particles");
  const animatedBg = document.querySelector(".animated-bg");

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;

    // Use translate3d for hardware acceleration & smooth performance
    if (scrolled < window.innerHeight) {
      if (hero && window.innerWidth > 768) {
        hero.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
      }

      if (particles && window.innerWidth > 768) {
        particles.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
      }

      if (animatedBg && window.innerWidth > 768) {
        animatedBg.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
      }
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// ===========================
// EMAIL COPY FUNCTIONALITY
// ===========================

function initEmailCopy() {
  const emailLink = document.querySelector(".social-link.email");
  if (!emailLink) return;

  emailLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = "ryankeshary@gmail.com";

    navigator.clipboard
      .writeText(email)
      .then(() => {
        showToast("Email copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy email:", err);
        showToast("Failed to copy email", "error");
      });
  });
}

// ===========================
// TOAST NOTIFICATION
// ===========================

function showToast(message, type = "success") {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === "success" ? "var(--success)" : "var(--warning)"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        font-weight: 600;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeInUp 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===========================
// MOUSE PARALLAX (HERO)
// ===========================

function initMouseParallax() {
  const heroSection = document.querySelector(".hero-section");
  const heroContent = document.querySelector(".hero-content");
  const blob1 = document.querySelector(".hero-section::before"); // Pseudo-elements can't be selected directly in JS for style
  // We need to use custom properties or transform the container/separate elements
  // Since we used pseudo-elements for blobs, we'll animate the container's background-position or add specific elements.
  // Correction: CSS variables are better for pseudo-elements.

  if (!heroSection) return;

  heroSection.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Smooth Parallax for Card
    if (heroContent) {
      const moveX = (x - 0.5) * 30; // Increased range for better feel
      const moveY = (y - 0.5) * 30;

      heroContent.style.transform = `
        perspective(1200px) 
        rotateY(${moveX * 0.4}deg) 
        rotateX(${-moveY * 0.4}deg) 
        translateZ(20px)
      `;
    }

    // Update blobs position via CSS variables for extra smoothness
    heroSection.style.setProperty("--m-x", x);
    heroSection.style.setProperty("--m-y", y);
  });

  // Reset on leave
  heroSection.addEventListener("mouseleave", () => {
    if (heroContent) {
      heroContent.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    }
  });
}

// ===========================
// PERFORMANCE MONITORING
// ===========================

function checkPerformance() {
  // Detect low-end devices via Hardware Concurrency or Save-Data
  const isLowEnd =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  // Instead of blocking animations entirely, we'll just add a class
  // to toggle lighter versions of effects if needed.
  // The user requested that animations SHOULD work on all devices.
  if (isLowEnd) {
    document.body.classList.add("mobile-device");
  }

  // Init Mouse Parallax if not reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (
    !prefersReducedMotion &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    initMouseParallax();
  }
}

// ===========================
// WINDOW RESIZE HANDLER
// ===========================

let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
      particlesContainer.innerHTML = "";
      createParticles();
    }
  }, 250);
}

// ===========================
// LAZY LOADING IMAGES
// ===========================

function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }

  // Fallback for browsers that don't support native lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

function initKeyboardNav() {
  // ESC key to close mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const navLinks = document.querySelector(".nav-links");
      const hamburger = document.querySelector(".hamburger");

      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    }
  });

  // Tab trap in mobile menu
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    const focusableElements = navLinks.querySelectorAll("a, button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    navLinks.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && navLinks.classList.contains("active")) {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
}

// UNIQUE DIGITAL ECHO CURSOR
// ===========================

function initCustomCursor() {
  if (window.isLowEnd || window.innerWidth <= 1024) return;
  if (window.innerWidth <= 1024) return;

  const dot = document.querySelector(".cursor-dot");

  const outline = document.querySelector(".cursor-outline");
  const echoes = document.querySelectorAll(".cursor-echo");

  if (!dot || !outline) return;

  let mouseX = 0,
    mouseY = 0; // Current mouse pos
  let dotX = 0,
    dotY = 0; // Main dot pos
  let outX = 0,
    outY = 0; // Outline pos
  let echoPos = Array.from({ length: echoes.length }, () => ({ x: 0, y: 0 }));

  let lastX = 0,
    lastY = 0; // For velocity calculation
  let velocity = 0;
  let angle = 0;

  // Track raw mouse position
  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    },
    { passive: true },
  );

  const animateCursor = () => {
    // STOP LOOP ON MOBILE/TOUCH to save battery/CPU
    if (window.innerWidth <= 1024) return;

    // 1. Calculate Velocity & Angle for stretching
    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    velocity = Math.sqrt(dx * dx + dy * dy);
    angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    lastX = mouseX;
    lastY = mouseY;

    // 2. Smooth movement (lerp) for different parts
    dotX += (mouseX - dotX) * 0.4;
    dotY += (mouseY - dotY) * 0.4;

    outX += (mouseX - outX) * 0.15;
    outY += (mouseY - outY) * 0.15;

    // Update Main Dot with stretching
    const stretch = 1 + Math.min(velocity / 100, 1); // Max 2x stretch
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    dot.style.setProperty("--cursor-stretch", stretch);
    dot.style.setProperty("--cursor-angle", angle);

    // Update Outline
    outline.style.left = `${outX}px`;
    outline.style.top = `${outY}px`;

    // Update Mouse Glow Position
    const glow = document.getElementById("mouseGlow");
    if (glow) {
      glow.style.left = `${dotX}px`;
      glow.style.top = `${dotY}px`;
    }

    // 3. Update Echoes (trailing points)

    echoPos.forEach((pos, i) => {
      const prev = i === 0 ? { x: dotX, y: dotY } : echoPos[i - 1];
      pos.x += (prev.x - pos.x) * 0.35;
      pos.y += (prev.y - pos.y) * 0.35;

      echoes[i].style.left = `${pos.x}px`;
      echoes[i].style.top = `${pos.y}px`;
    });

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Handle clickable elements using event delegation
  document.addEventListener("mouseover", (e) => {
    if (
      e.target.closest(
        "a, button, .project-card, .achievement-card, .social-link",
      )
    ) {
      document.body.classList.add("cursor-active");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (
      e.target.closest(
        "a, button, .project-card, .achievement-card, .social-link",
      )
    ) {
      document.body.classList.remove("cursor-active");
    }
  });

  // Cursor visibility
  document.addEventListener("mouseleave", () => {
    dot.style.display = "none";
    outline.style.display = "none";
    echoes.forEach((e) => (e.style.display = "none"));
  });

  document.addEventListener("mouseenter", () => {
    dot.style.display = "block";
    outline.style.display = "block";
    echoes.forEach((e) => (e.style.display = "block"));
    const glow = document.getElementById("mouseGlow");
    if (glow) glow.style.opacity = "1";
  });
}

// ===========================
// MAGNETIC BUTTON EFFECT
// ===========================

function initMagneticButtons() {
  if (window.isLowEnd) return;

  const magnetics = document.querySelectorAll(
    ".cta-button, .social-link, .nav-link, .btn-read-more-v7, .btn-modal-action",
  );

  magnetics.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull percentage (0.3 = 30% pull)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

// ===========================
// TEXT SCRAMBLE EFFECT
// ===========================

function scrambleText(element) {
  // Always allow on all devices as per user request
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const originalText = element.innerText;
  let iteration = 0;

  const interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((char, index) => {
        if (index < iteration) return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= originalText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
}

// ===========================
// INITIALIZE ON DOM LOADED
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize page loader first
  initPageLoader();

  // Initialize theme
  initTheme();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize scroll reveal
  initScrollReveal();

  // Initialize skill bar animations
  animateSkillBars();

  // Initialize project filters
  initProjectFilters();

  // Initialize email copy
  initEmailCopy();

  // Initialize lazy loading
  initLazyLoading();

  // Initialize keyboard navigation
  initKeyboardNav();

  // Initialize custom cursor
  initCustomCursor();

  // Initialize background orbs
  initFloatingOrbs();

  // Initialize magnetic buttons
  initMagneticButtons();

  // Initialize mobile touch effects
  initTouchEffects();

  // Initialize section title scramble on reveal
  const sectionTitles = document.querySelectorAll(".section-title.reveal");
  const scrambleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
          scrambleText(entry.target);
          entry.target.dataset.scrambled = "true";
        }
      });
    },
    { threshold: 0.5 },
  );
  sectionTitles.forEach((title) => scrambleObserver.observe(title));

  // Check device performance
  checkPerformance();

  // Initialize parallax (check for reduced motion)
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!prefersReducedMotion) {
    initParallax();
  }

  // Scroll handlers
  const handleScroll = () => {
    // 1. Update Scroll Progress Bar
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    }

    // 2. Sticky Nav Toggle
    const nav = document.querySelector(".main-nav");
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    // 3. Active Nav Link (Handled by IntersectionObserver now)
    // updateActiveNavLink();

    // 4. Background Parallax
    if (!prefersReducedMotion) {
      document.body.style.setProperty("--scroll-y", window.scrollY);
    }

    // 5. Back to Top Toggle
    const backToTop = document.getElementById("backToTop");
    const langFab = document.getElementById("langFab");

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("active");
        if (langFab) langFab.classList.add("scrolled");
      } else {
        backToTop.classList.remove("active");
        if (langFab) langFab.classList.remove("scrolled");
      }
    }
  };

  window.addEventListener("scroll", throttle(handleScroll, 10));

  // Back to Top Click
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Add resize event listener
  window.addEventListener("resize", handleResize);

  // Add hamburger click event
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // Add theme toggle event
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Initialize Language Switcher
  if (typeof initLanguageSwitcher === "function") {
    initLanguageSwitcher();
  }

  // Initialize Odyssey Tilt
  initOdysseyTilt();
});

// ===========================
// PAGE LOADER SEQUENCE
// ===========================

function initPageLoader() {
  const loader = document.getElementById("pageLoader");
  const bar = document.getElementById("loaderBar");
  const status = document.querySelector(".loader-status");

  if (!loader || !bar) return;

  // Disable scrolling during load
  document.body.style.overflow = "hidden";
  if (typeof lenis !== "undefined") lenis.stop();

  let progress = 0;
  const statusMessages = [
    "Initializing Neural Interface...",
    "Syncing Bio-Metrics...",
    "Decrypting Experience Data...",
    "Loading Digital Footprint...",
    "Interface Ready.",
  ];

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;

    bar.style.width = `${progress}%`;

    const statusIndex = Math.min(
      Math.floor((progress / 100) * statusMessages.length),
      statusMessages.length - 1,
    );
    status.innerText = statusMessages[statusIndex];

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("loaded");
        // Remove from DOM after animation and re-enable scroll
        setTimeout(() => {
          loader.remove();
          document.body.style.overflow = "";
          window.scrollTo(0, 0); // Force scroll reset to prevent "half up" landing
          if (typeof lenis !== "undefined") lenis.start();
        }, 1000);
      }, 500);
    }
  }, 150);
}

// ===========================
// FLOATING BOKEH ORBS
// ===========================

function initFloatingOrbs() {
  const orbs = document.querySelectorAll(".bokeh-orb");
  if (orbs.length === 0) return;

  const orbData = Array.from(orbs, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    targetX: Math.random() * window.innerWidth,
    targetY: Math.random() * window.innerHeight,
    size: 300 + Math.random() * 200,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  function moveOrbs() {
    orbs.forEach((orb, i) => {
      const data = orbData[i];

      // Gentle drift
      data.x += data.vx;
      data.y += data.vy;

      // Bounce off walls
      if (data.x < -100 || data.x > window.innerWidth) data.vx *= -1;
      if (data.y < -100 || data.y > window.innerHeight) data.vy *= -1;

      // Mouse interaction (gentle push)
      // We can use the global mouseX/mouseY from cursor logic if available,
      // but let's just use raw drift for now to keep it CPU friendly.

      orb.style.transform = `translate(${data.x}px, ${data.y}px)`;
    });
    requestAnimationFrame(moveOrbs);
  }

  moveOrbs();
}

// ===========================
// MOBILE TOUCH EFFECTS
// ===========================

function initTouchEffects() {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) return;

  window.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      createTouchRipple(touch.clientX, touch.clientY);
    },
    { passive: true },
  );
}

function createTouchRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.className = "touch-ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  document.body.appendChild(ripple);

  // Clean up
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// ===========================
// ODYSSEY 3D INTERACTION
// ===========================

function initOdysseyTilt() {
  // Disable ONLY on very small mobile if it interferes with scrolling,
  // but keeping it active where possible.
  if (window.innerWidth <= 480) return;

  const cards = document.querySelectorAll(".odyssey-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 20;
      const rotateY = (x - centerX) / 20;

      card.style.transform = `
        perspective(2000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(50px)
      `;

      // Update scanline intensity on hover
      const scanline = card.querySelector(".card-scanline");
      if (scanline) {
        scanline.style.opacity = "0.6";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(2000px) rotateX(0) rotateY(0) translateZ(0)";
      const scanline = card.querySelector(".card-scanline");
      if (scanline) {
        scanline.style.opacity = "0.3";
      }
    });
  });
}

// ===========================
// INITIALIZE ON WINDOW LOAD
// ===========================

// Initialize Theme immediately to prevent flash
document.addEventListener("DOMContentLoaded", initTheme);

window.addEventListener("load", () => {
  // Create particles after page load
  createParticles();

  // Initialize hero animations
  initHeroAnimations();

  // Update active nav link
  updateActiveNavLink();
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===========================
// EXPORT FOR EXTERNAL USE
// ===========================

window.portfolioUtils = {
  toggleTheme,
  toggleMenu,
  showToast,
  throttle,
  debounce,
  isInViewport,
  openAchievementModal,
  closeAchievementModal,
  openCinematicModal,
  closeCinematicModal,
};

/* ===========================
   LANGUAGE SWITCHER ENGINE
   =========================== */

const languages = [
  { name: "English", code: "en", native: "English" },
  { name: "Mandarin Chinese", code: "zh-CN", native: "普通话" },
  { name: "Hindi", code: "hi", native: "हिन्दी" },
  { name: "Spanish", code: "es", native: "Español" },
  { name: "French", code: "fr", native: "Français" },
  { name: "Modern Standard Arabic", code: "ar", native: "العربية" },
  { name: "Bengali", code: "bn", native: "বাংলা" },
  { name: "Portuguese", code: "pt", native: "Português" },
  { name: "Russian", code: "ru", native: "Русский" },
  { name: "Urdu", code: "ur", native: "اردو" },
  { name: "Indonesian", code: "id", native: "Bahasa Indonesia" },
  { name: "German", code: "de", native: "Deutsch" },
  { name: "Japanese", code: "ja", native: "日本語" },
  { name: "Nigerian Pidgin", code: "pcm", native: "Naija" },
  { name: "Marathi", code: "mr", native: "मराठी" },
  { name: "Telugu", code: "te", native: "తెలుగు" },
  { name: "Turkish", code: "tr", native: "Türkçe" },
  { name: "Tamil", code: "ta", native: "தமிழ்" },
  { name: "Yue Chinese", code: "yue", native: "粵語" },
  { name: "Vietnamese", code: "vi", native: "Tiếng Việt" },
  { name: "Tagalog", code: "tl", native: "Tagalog" },
  { name: "Wu Chinese", code: "wuu", native: "吴语" },
  { name: "Korean", code: "ko", native: "한국어" },
  { name: "Iranian Persian", code: "fa", native: "فارسی" },
  { name: "Hausa", code: "ha", native: "Hausa" },
  { name: "Swahili", code: "sw", native: "Kiswahili" },
  { name: "Javanese", code: "jw", native: "Basa Jawa" },
  { name: "Italian", code: "it", native: "Italiano" },
  { name: "Gujarati", code: "gu", native: "ગુજરાતી" },
  { name: "Thai", code: "th", native: "ไทย" },
  { name: "Amharic", code: "am", native: "አማርኛ" },
  { name: "Kannada", code: "kn", native: "ಕನ್ನಡ" },
  { name: "Bhojpuri", code: "bho", native: "भोजपुरी" },
  { name: "Western Punjabi", code: "pnb", native: "پنجابی" },
  { name: "Jin Chinese", code: "cjy", native: "晋语" },
  { name: "Min Nan Chinese", code: "nan", native: "閩南語" },
  { name: "Yoruba", code: "yo", native: "Yorùbá" },
  { name: "Hakka Chinese", code: "hak", native: "客家話" },
  { name: "Burmese", code: "my", native: "မြန်မာ" },
  { name: "Polish", code: "pl", native: "Polski" },
  { name: "Oromo", code: "om", native: "Oromoo" },
  { name: "Pashto", code: "ps", native: "پښتو" },
  { name: "Malayalam", code: "ml", native: "മലയാളം" },
  { name: "Sundanese", code: "su", native: "Basa Sunda" },
  { name: "Maithili", code: "mai", native: "मैथिली" },
  { name: "Uzbek", code: "uz", native: "Oʻzbekcha" },
  { name: "Sindhi", code: "sd", native: "سنڌي" },
  { name: "Romanian", code: "ro", native: "Română" },
  { name: "Fula", code: "ff", native: "Fulfulde" },
  { name: "Azerbaijani", code: "az", native: "Azərbaycanca" },
  { name: "Dutch", code: "nl", native: "Nederlands" },
  { name: "Greek", code: "el", native: "Ελληνικά" },
  { name: "Swedish", code: "sv", native: "Svenska" },
  { name: "Hebrew", code: "he", native: "עברית" },
  { name: "Ukrainian", code: "uk", native: "Українська" },
  { name: "Hungarian", code: "hu", native: "Magyar" },
  { name: "Czech", code: "cs", native: "Čeština" },
  { name: "Catalan", code: "ca", native: "Català" },
  { name: "Danish", code: "da", native: "Dansk" },
  { name: "Finnish", code: "fi", native: "Suomi" },
  { name: "Norwegian", code: "no", native: "Norsk" },
  { name: "Sinhala", code: "si", native: "සිංහල" },
  { name: "Khmer", code: "km", native: "ខ្មែរ" },
  { name: "Kazakh", code: "kk", native: "Қазақ тілі" },
  { name: "Standard Malay", code: "ms", native: "Bahasa Melayu" },
  { name: "Lao", code: "lo", native: "ລາວ" },
  { name: "Mongolian", code: "mn", native: "Монгол" },
  { name: "Tibetan", code: "bo", native: "བོད་སྐད་" },
  { name: "Armenian", code: "hy", native: "Հայերեն" },
  { name: "Igbo", code: "ig", native: "Asụsụ Igbo" },
  { name: "Zulu", code: "zu", native: "isiZulu" },
  { name: "Afrikaans", code: "af", native: "Afrikaans" },
  { name: "Somali", code: "so", native: "Soomaali" },
  { name: "Kinyarwanda", code: "rw", native: "Ikinyarwanda" },
  { name: "Shona", code: "sn", native: "ChiShona" },
  { name: "Guarani", code: "gn", native: "Avañe'ẽ" },
  { name: "Quechua", code: "qu", native: "Runa Simi" },
  { name: "Bulgarian", code: "bg", native: "Български" },
  { name: "Serbian", code: "sr", native: "Српски" },
  { name: "Croatian", code: "hr", native: "Hrvatski" },
  { name: "Slovak", code: "sk", native: "Slovenčina" },
  { name: "Lithuanian", code: "lt", native: "Lietuvių" },
  { name: "Latvian", code: "lv", native: "Latviešu" },
  { name: "Estonian", code: "et", native: "Eesti" },
  { name: "Georgian", code: "ka", native: "ქართული" },
  { name: "Albanian", code: "sq", native: "Shqip" },
  { name: "Macedonian", code: "mk", native: "Македонски" },
  { name: "Irish", code: "ga", native: "Gaeilge" },
  { name: "Welsh", code: "cy", native: "Cymraeg" },
  { name: "Haitian Creole", code: "ht", native: "Kreyòl Ayisyen" },
  { name: "Wolof", code: "wo", native: "Wolof" },
  { name: "Berber", code: "tzm", native: "Tamazight" },
  { name: "Kyrgyz", code: "ky", native: "Кыргызча" },
  { name: "Tajik", code: "tg", native: "Тоҷикӣ" },
  { name: "Turkmen", code: "tk", native: "Türkmençe" },
  { name: "Dari", code: "fa-AF", native: "دری" },
  { name: "Hazaragi", code: "haz", native: "آزارگی" },
  { name: "Balinese", code: "ban", native: "Basa Bali" },
  { name: "Madurese", code: "mad", native: "Basa Madura" },
  { name: "Batak", code: "btk", native: "Surat Batak" },
];

function initLanguageSwitcher() {
  const fab = document.getElementById("langFab");
  const overlay = document.getElementById("langOverlay");
  const modal = document.getElementById("langModal");
  const closeBtn = document.getElementById("langClose");
  const grid = document.getElementById("langGrid");

  if (!fab || !modal || !grid) return;
  const searchInput = document.getElementById("langSearch");
  const clearSearch = document.getElementById("clearSearch");

  // DEVICE AUTO-SYNC PROTOCOL
  const browserLocale = navigator.language || navigator.userLanguage;
  const shortCode = browserLocale.split("-")[0].toLowerCase();

  const detectedMatch = languages.find(
    (l) => l.code === shortCode || l.code === browserLocale,
  );
  const systemLang = detectedMatch ? detectedMatch.code : "en";

  let currentLang = localStorage.getItem("app_ui_lang") || "en";
  const isPinned = localStorage.getItem("app_lang_pinned") === "true";

  if (!isPinned) {
    if (currentLang !== systemLang) {
      currentLang = systemLang;
      localStorage.setItem("app_ui_lang", currentLang);
      localStorage.setItem("app_lang_pinned", "false");
      setGoogleTranslateCookie(currentLang);
      if (currentLang !== "en" || document.cookie.includes("googtrans")) {
        setTimeout(() => window.location.reload(), 300);
      }
    }
  }

  function renderGrid(filter = "") {
    const term = filter.toLowerCase().trim();
    const filtered = languages.filter((lang) => {
      return (
        lang.name.toLowerCase().includes(term) ||
        lang.native.toLowerCase().includes(term) ||
        lang.code.toLowerCase().includes(term)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; padding: 3rem; text-align: center; color: var(--text-secondary);">
          <i class="fas fa-search-minus" style="font-size: 2rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
          <p>No languages found matching "${filter}"</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((lang, index) => {
        const delay = Math.min(index * 0.02, 0.6);
        return `
        <div 
          class="lang-card ${lang.code === currentLang ? "active" : ""}" 
          data-code="${lang.code}"
          role="button"
          tabindex="0"
          aria-label="Select ${lang.name}"
          style="transition-delay: ${delay}s"
        >
          <div class="lang-native">${lang.native}</div>
          <div class="lang-name">${lang.name}</div>
        </div>
      `;
      })
      .join("");
  }

  // Initial Render
  renderGrid();

  // Search Logic
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      renderGrid(value);

      if (clearSearch) {
        if (value.length > 0) clearSearch.classList.add("active");
        else clearSearch.classList.remove("active");
      }
    });

    // Focus search on open (optional but premium)
    fab.addEventListener("click", () => {
      setTimeout(() => searchInput.focus(), 500);
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      renderGrid("");
      clearSearch.classList.remove("active");
    });
  }

  // Event Listeners
  fab.addEventListener("click", () => toggleLangModal(true));
  closeBtn.addEventListener("click", () => toggleLangModal(false));
  overlay.addEventListener("click", () => toggleLangModal(false));

  grid.addEventListener("click", (e) => {
    if (isLangModalLoading) return;
    const card = e.target.closest(".lang-card");
    if (card) {
      const code = card.dataset.code;
      selectLanguage(code);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      toggleLangModal(false);
    }
  });

  if (currentLang !== "en") {
    setGoogleTranslateCookie(currentLang);
  }
}

let isLangModalLoading = false;

function toggleLangModal(show) {
  const overlay = document.getElementById("langOverlay");
  const modal = document.getElementById("langModal");
  const grid = document.getElementById("langGrid");
  const html = document.documentElement;

  if (show) {
    overlay.classList.add("active");
    modal.classList.add("active");
    html.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    // SAFETY LOCK: Prevent accidental clicks during pop-in animation
    isLangModalLoading = true;
    setTimeout(() => {
      isLangModalLoading = false;
    }, 600);

    if (window.lenis) window.lenis.stop();
    if (grid) grid.scrollTop = 0;
  } else {
    overlay.classList.remove("active");
    modal.classList.remove("active");
    html.classList.remove("modal-open");
    document.body.style.overflow = "";
    if (window.lenis) window.lenis.start();
  }
}

function selectLanguage(code) {
  if (isLangModalLoading) return; // Intentionality check

  localStorage.setItem("app_ui_lang", code);
  localStorage.setItem("app_lang_pinned", "true");

  // Set Cookie for Google Translate
  setGoogleTranslateCookie(code);

  // Broadcast to other tabs
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "app_ui_lang",
      newValue: code,
    }),
  );

  // INSTANT SWITCH: Trigger Google control directly without reload
  const googleSelect = document.querySelector(".goog-te-combo");

  // Special handling for English (Reset)
  if (code === "en") {
    window.location.reload();
    return;
  }

  if (googleSelect) {
    googleSelect.value = code;
    googleSelect.dispatchEvent(new Event("change"));
    toggleLangModal(false);
  } else {
    setTimeout(() => window.location.reload(), 200);
  }
}

function setGoogleTranslateCookie(code) {
  // Clear old cookies first
  const domain = window.location.hostname;
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;

  // Set new cookie
  const cookieValue = `/en/${code}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
}

// DEPLOY DOM ASSASSIN: Instantly kill any Google UI elements and fix scripts
window.assassinateGoogleUI = () => {
  const targets = [
    ".goog-te-banner-frame",
    "#goog-gt-tt",
    ".goog-te-balloon-frame",
    ".goog-te-menu-frame",
    ".goog-te-gadget-icon",
    'img[src*="translate_24dp"]',
    ".goog-logo-link",
  ];
  targets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });
  document.body.style.top = "0px";

  // HINDI SCRIPT CORRECTION: Force "रायन" instead of "रयान" using TreeWalker (High Performance)
  if (
    document.documentElement.lang === "hi" ||
    document.cookie.includes("googtrans=/en/hi")
  ) {
    // TreeWalker is 100x faster than querySelectorAll('*') for text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes("रयान")) {
        node.nodeValue = node.nodeValue.replace(/रयान/g, "रायन");
      }
    }
  }
};

// Google Translate Init Function
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: languages.map((l) => l.code).join(","),
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element",
  );

  // Debounce the observer to prevent CPU spikes
  let timeout;
  const debouncedAssassin = () => {
    clearTimeout(timeout);
    timeout = setTimeout(window.assassinateGoogleUI, 1000); // 1s Throttle
  };

  const observer = new MutationObserver(debouncedAssassin);
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial strike
  window.assassinateGoogleUI();
};

// Inject Google Translate script and container
(function injectGoogleTranslate() {
  // Create hidden container if missing
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div");
    div.id = "google_translate_element";
    // STEALTH MODE: Force inline styles to ensure invisibility while allowing init
    div.style.cssText =
      "visibility: hidden; width: 0px; height: 0px; overflow: hidden; position: absolute; z-index: -9999; top: 0; left: 0;";
    document.body.appendChild(div);
  }

  if (document.querySelector("#google-translate-script")) return;
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
})();

// Sync language changes from other tabs
window.addEventListener("storage", (e) => {
  if (e.key === "app_ui_lang") {
    window.location.reload();
  }
});
