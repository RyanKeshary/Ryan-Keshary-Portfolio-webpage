"use client";

import dynamic from "next/dynamic";
import React from "react";
import Background from "@/app/components/Background";
import NeuralLoader from "@/app/components/NeuralLoader";
import usePortfolioEffects from "@/app/hooks/usePortfolioEffects";

/**
 * High-Performance Portfolio Sections (Memoized)
 * Fixes Issue 4: Unnecessary Re-renders
 */
import { Nav, Hero, About, TechStack, Projects, Footer } from "@/app/components/PortfolioSections";
import { Experience, Achievements, Modals } from "@/app/components/PortfolioExtra";

/**
 * Audit Findings Fixes Summary:
 * 1. Rule 1: Dynamic imports for browser-heavy components (CustomCursor).
 * 2. Rule 2: next/image implemented in Sections.js.
 * 3. Rule 4: React.memo() applied throughout subcomponents.
 */

const CustomCursor = dynamic(() => import("@/app/components/CustomCursor"), {
  ssr: false,
});

export default function PortfolioClient() {
  // Rule 7: Bootstraps interactive hook with verified cleanup logic
  usePortfolioEffects();

  return (
    <>
      {/* Portal-based Loader (Rule 1-5) */}
      <NeuralLoader />

      {/* GPU-Accelerated Background (Memoized) */}
      <Background />

      {/* SSR-Disabled Custom Cursor (Rule 1) */}
      <CustomCursor />

      {/* Scroll Indicator */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" id="scrollProgress"></div>
      </div>

      <Nav />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Achievements />
      <Projects />
      <Modals />
      <Footer />

      {/* Back to Top */}
      <button id="backToTop" className="back-to-top" aria-label="Back to top">
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
