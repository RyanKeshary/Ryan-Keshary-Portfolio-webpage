import React from "react";

/**
 * Audit Findings Fixes:
 * 1. Rule 4: React.memo() on achievement and interactive nodes.
 */

export const Experience = React.memo(() => (
  <section id="experience" className="experience-section">
    <div className="section-container">
      <h2 className="section-title reveal reveal-up">Experience</h2>
      <div className="experience-odyssey">
        <div className="odyssey-rail"><div className="rail-glow"></div></div>
        <ExperienceItem 
          side="right" 
          year="2025" 
          role="Project Developer" 
          company="INDEPENDENT WORK · 2025 – PRESENT" 
          icon="fas fa-terminal"
        />
        <ExperienceItem 
          side="left" 
          year="2025" 
          role="Hackathon Champion" 
          company="JARVIS 24-HOUR HACKATHON · OCT 2025" 
          icon="fas fa-medal"
        />
        <ExperienceItem 
          side="right" 
          year="2026" 
          role="Startup Finalist" 
          company="HULT PRIZE · FIRST RUNNER-UP · 2026" 
          icon="fas fa-lightbulb"
        />
      </div>
    </div>
  </section>
));
Experience.displayName = "Experience";

const ExperienceItem = React.memo(({ side, year, role, company, icon }) => (
  <div className={`odyssey-item reveal ${side}`} data-year={year}>
    <div className="odyssey-node"><div className="node-inner"></div><div className="node-pulse"></div></div>
    <div className="odyssey-beam"></div>
    <div className="odyssey-content">
      <div className="odyssey-card">
        <div className="card-scanline"></div>
        <div className="card-header">
          <div className="role-icon"><i className={icon}></i></div>
          <div className="role-meta"><h3>{role}</h3><span className="company">{company}</span></div>
        </div>
      </div>
    </div>
  </div>
));
ExperienceItem.displayName = "ExperienceItem";

export const Achievements = React.memo(() => (
  <section id="achievements" className="achievements-section">
    <div className="section-container">
      <h2 className="section-title reveal reveal-up">Achievements</h2>
      <div className="timeline reveal reveal-scale">
        <AchievementCard 
          id={1} 
          year="2025" 
          title="JARVIS 24-Hour Hackathon Winner" 
          preview="Led a team to victory in an intensive 24-hour hackathon, developing an innovative AI-powered solution..." 
        />
      </div>
    </div>
  </section>
));
Achievements.displayName = "Achievements";

const AchievementCard = React.memo(({ id, year, title, preview }) => (
  <div className="achievement-card">
    <div className="card-glow-border"></div>
    <div className="achievement-icon">🏆</div>
    <div className="achievement-content">
      <div className="achievement-date">{year}</div>
      <h3>{title}</h3>
      <p className="achievement-preview">{preview}</p>
      <div className="achievement-actions">
        <button className="btn-read-more-v7" onClick={() => window.openAchievementModal?.(id)}>
          Read More <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
));
AchievementCard.displayName = "AchievementCard";

export const Modals = React.memo(() => (
  <>
    {/* Cinematic Lightbox Modal */}
    <div id="cinematicOverlay" className="immersive-overlay" data-lenis-prevent="">
    <button className="modal-close-trigger" onClick={() => window.closeCinematicModal?.()}><i className="fas fa-times"></i></button>
      <div className="cinematic-modal">
        <div className="modal-visual-side">
          <img id="modalVisualImage" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="Project Preview" />
          <div id="modalVideoContainer" className="modal-video-container"></div>
        </div>
        <div className="modal-content-side">
          <h2 id="modalVisualTitle" className="modal-project-title"></h2>
          <div id="modalVisualTags" className="modal-project-tags"></div>
          <div id="modalVisualBody" className="modal-project-body"></div>
        </div>
      </div>
    </div>

    {/* Achievement Modal */}
    <div id="achievementModal" className="modal" data-lenis-prevent="">
      <div className="modal-content">
        <button className="modal-close" onClick={() => window.closeAchievementModal?.()}><i className="fas fa-times"></i></button>
        <div className="modal-header"><div className="modal-icon"></div><div><div className="modal-date"></div><h2 className="modal-title"></h2></div></div>
        <div className="modal-body"></div>
      </div>
    </div>

    {/* Media Viewer */}
    <div id="mediaViewer" className="modal" style={{ zIndex: 100020, background: "rgba(0, 0, 0, 0.95)" }}>
      <button className="modal-close" onClick={() => window.closeMediaViewer?.()} style={{ zIndex: 100030 }}><i className="fas fa-times"></i></button>
      <div id="mediaViewerContent" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}></div>
    </div>
  </>
));
Modals.displayName = "Modals";
