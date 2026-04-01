"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — Root-level smooth scroll engine based on Lenis.
 * Rule 1: Initialized once at the top level.
 * Rule 2: Synchronized RAF loop.
 * Rule 3: Disabled on mobile (innerWidth < 768).
 * Rule 4: Optimized lerp (0.1) for performance.
 * Rule 5: Proper destruction/cleanup on unmount.
 */
const SmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Rule 3: Disable Lenis on mobile/touch devices for native feel and performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Rule 4: Lean lerp value (0.1) to minimize frame callback overhead
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1, // Rule 4: Corrected lerp value
    });

    lenisRef.current = lenis;
    window.lenis = lenis; // Expose for scrollTo logic in child hooks

    // Rule 2: Optimized RAF loop management
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Rule 5: Cleanup function for ghost scroll prevention
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.lenis = null;
    };
  }, []);

  return null;
};

export default SmoothScroll;
