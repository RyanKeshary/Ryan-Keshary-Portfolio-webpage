"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * NeuralLoader — Cyber injection sequence.
 * 
 * Rule 1: Portal mounted to document.body.
 * Rule 2: CSS typing (@keyframes steps).
 * Rule 3: Body pointer-events lockout.
 * Rule 4: CSS Exit transition (className toggle).
 * Rule 5: Full DOM unmounting.
 * Rule 6: 2000ms fixed duration.
 */
export default function NeuralLoader() {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Rule 3: Lock interaction during initial hydration/load parallelization
    document.body.style.pointerEvents = "none";

    // Rule 6: Fixed short duration intro
    const timer = setTimeout(() => {
      setExiting(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  const handleTransitionEnd = () => {
    if (exiting) {
      // Rule 5: Fully unmount after exit animation
      setVisible(false);
      document.body.style.pointerEvents = "auto";
    }
  };

  if (!mounted || !visible) return null;

  // Rule 1: Render into document.body portal
  return createPortal(
    <div 
      className={`neural-loader ${exiting ? "exiting" : ""}`}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden="true"
    >
      <div className="loader-content">
        <div className="loader-logo">
          <div className="cyber-reactor">
            <div className="reactor-ring ring-1"></div>
            <div className="reactor-ring ring-2"></div>
            <div className="reactor-ring ring-3"></div>
            <div className="reactor-core"></div>
          </div>
        </div>
        
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>
        
        <div className="loader-status-container">
          {/* Rule 2: CSS-only typing sequence using keyframes and steps() */}
          <div className="loader-status-cycle">
            <span className="status-text">INITIALIZING NEURAL INTERFACE...</span>
            <span className="status-text">SYNCING BIO-METRICS...</span>
            <span className="status-text">DECRYPTING DATA CORE...</span>
            <span className="status-text">INTERFACE READY.</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
