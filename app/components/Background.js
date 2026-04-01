"use client";

import React, { useEffect, useRef } from "react";

/**
 * Background component handles high-performance background animations.
 * Optimized with React.memo to prevent unnecessary re-renders.
 * Uses CSS transforms and opacity for 60FPS performance.
 */
const Background = React.memo(() => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const isLowEnd =
      navigator.hardwareConcurrency <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Use a fixed number of particles for CSS-only performance where possible
    const particleCount = isLowEnd ? 10 : 25;
    const container = particlesRef.current;
    if (!container) return;

    container.innerHTML = ""; // Clear existing

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      
      const size = Math.random() * 60 + 40;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = Math.random() * 20 + 20;
      const delay = Math.random() * -20;
      const opacity = Math.random() * 0.3 + 0.1;

      // Rule 1: Use transform instead of top/left
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
      p.style.opacity = opacity;
      
      // Rule 3: Use CSS keyframes for rotation and floating
      p.style.animation = `floatAndRotate ${dur}s infinite linear`;
      p.style.animationDelay = `${delay}s`;

      container.appendChild(p);
    }
  }, []);

  return (
    <>
      {/* Optimized Mouse Background Glow */}
      <div className="mouse-glow" id="mouseGlow"></div>

      {/* Cyber-Grid Background - Optimized with opacity only */}
      <div className="cyber-grid"></div>

      {/* Floating Background Orbs - Rule 5: Reduced to 3 orbs, Rule 3: CSS Animations */}
      <div className="bokeh-orb orb-1"></div>
      <div className="bokeh-orb orb-2"></div>
      <div className="bokeh-orb orb-3"></div>

      {/* Hero Blobs - Moved here for unified background management */}
      <div className="hero-blob blob-1"></div>
      <div className="hero-blob blob-2"></div>

      {/* Particles Container */}
      <div className="particles-bg" ref={particlesRef}></div>
    </>
  );
});

Background.displayName = "Background";

export default Background;
