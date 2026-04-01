"use client";

import React, { useEffect, useRef } from "react";

/**
 * CustomCursor — High-performance cursor system.
 * Rule 1: Uses CSS variables (--cursor-x, --cursor-y) via RAF.
 * Rule 2: Single native mousemove listener.
 * Rule 3: Max 3 echoes with lerp offset.
 * Rule 4: Direct DOM manipulation via refs.
 * Rule 5: Disables on mobile/touch devices.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const echoesRef = useRef([]);

  useEffect(() => {
    // Rule 5: Disable on mobile/touch devices
    const isTouchDevice = 
      "ontouchstart" in window || 
      navigator.maxTouchPoints > 0 || 
      window.innerWidth <= 1024;

    if (isTouchDevice) {
      document.body.classList.add("cursor-native");
      return;
    }

    document.body.classList.remove("cursor-native");

    const dot = dotRef.current;
    const outline = outlineRef.current;
    const echoes = echoesRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outX = 0;
    let outY = 0;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;
    let angle = 0;

    const echoPos = echoes.map(() => ({ x: 0, y: 0 }));

    // Rule 2: Single native mousemove listener
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Rule 1: requestAnimationFrame loop
    let rafId;
    const animate = () => {
      // Calculate velocity and angle for the "stretch" effect
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      velocity = Math.sqrt(dx * dx + dy * dy);
      angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      lastX = mouseX;
      lastY = mouseY;

      // Rule 3: Lerp (Linear Interpolation) for smoothing
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      outX += (mouseX - outX) * 0.12;
      outY += (mouseY - outY) * 0.12;

      const stretch = 1 + Math.min(velocity / 80, 1.2);

      // Rule 4: Direct DOM manipulation on refs
      if (dot) {
        dot.style.setProperty("--cursor-x", `${dotX}px`);
        dot.style.setProperty("--cursor-y", `${dotY}px`);
        dot.style.setProperty("--cursor-stretch", stretch);
        dot.style.setProperty("--cursor-angle", `${angle}deg`);
      }

      if (outline) {
        outline.style.setProperty("--cursor-x", `${outX}px`);
        outline.style.setProperty("--cursor-y", `${outY}px`);
      }

      // Handle Mouse Glow (optional, but integrated for performance)
      const glow = document.getElementById("mouseGlow");
      if (glow) {
        glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Rule 3: Max 3 echoes with lerp
      echoPos.forEach((pos, i) => {
        const prev = i === 0 ? { x: dotX, y: dotY } : echoPos[i - 1];
        pos.x += (prev.x - pos.x) * 0.3;
        pos.y += (prev.y - pos.y) * 0.3;
        
        const echoEl = echoes[i];
        if (echoEl) {
          echoEl.style.setProperty("--cursor-x", `${pos.x}px`);
          echoEl.style.setProperty("--cursor-y", `${pos.y}px`);
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Interactive element detection (hover state)
    const onMouseOver = (e) => {
      if (e.target.closest("a, button, .project-card, .achievement-card, .social-link, .lang-card")) {
        document.body.classList.add("cursor-active");
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest("a, button, .project-card, .achievement-card, .social-link, .lang-card")) {
        document.body.classList.remove("cursor-active");
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="cursor-wrapper">
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (echoesRef.current[i] = el)}
          className="cursor-echo"
        ></div>
      ))}
    </div>
  );
};

export default CustomCursor;
