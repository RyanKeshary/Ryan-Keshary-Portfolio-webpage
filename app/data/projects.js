/**
 * Project data for the cinematic lightbox modal.
 * Keys correspond to project IDs passed to openCinematicModal().
 */
export const projectData = {
  crisismitra: {
    title: "CrisisMitra Platform",
    theme: "emergency",
    image: "/images/CrisisMitra website.png",
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
    image: "/images/unifiedx-screenshot.png",
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
    image: "/images/Sunil Keshary Site.png",
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
