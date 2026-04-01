# 🌌 AntiGravity Portfolio: Ryan Keshary

![Version](https://img.shields.io/badge/version-2.1.0-blueviolet?style=for-the-badge)
![Tech](https://img.shields.io/badge/Next.js-16%2B-black?style=for-the-badge&logo=next.js)
![Performance](https://img.shields.io/badge/FPS-60-brightgreen?style=for-the-badge)
![Design](https://img.shields.io/badge/Style-Glassmorphism-blue?style=for-the-badge)

A high-performance, immersive digital experience built with **Next.js 16 (App Router)**. This portfolio isn't just a website; it's a meticulously engineered piece of software designed for 60FPS visuals, extreme responsiveness, and premium aesthetics.

---

## 🎨 Design Systems: The "Prism" Palette

The portfolio utilizes a dual-theme architecture with fluid transitions and high-contrast accessibility.

### ❄️ Prism Light Mode (Deep Ice)
*   **Primary Background**: `#f0f7ff` (Soft Cloud)
*   **Secondary Background**: `#e0f2fe` (Ice Blue)
*   **Text (Primary)**: `#001d3d` (Deepest Navy)
*   **Text (Secondary)**: `#003566` (Deep Navy)
*   **Accent Color**: `#0056b3` (Rich Royal)
*   **Glass Tokens**: `rgba(255, 255, 255, 0.6)` with `0.15` opacity borders.

### 🌑 Midnight Void Dark Mode
*   **Primary Background**: `#000814` (Stellar Black)
*   **Secondary Background**: `#001d3d` (Midnight Blue)
*   **Text (Primary)**: `#e0f2fe` (Luminous Sky)
*   **Text (Secondary)**: `#7fb3d5` (Muted Steel)
*   **Accent Color**: `#00b4d8` (Hyper Blue)
*   **Glass Tokens**: `rgba(0, 29, 61, 0.4)` with `0.2` opacity glows.

---

## 🚀 Technical Architecture & Performance

The site has undergone a massive refactor to move from a legacy script-heavy model to a **React-First, Performance-Always** architecture.

### 1. Selective Hydration & SSR Safety
*   **Dynamic Components**: Heavy browser-dependent components (`CustomCursor`, `SmoothScroll`, `PortfolioClient`) are wrapped in `dynamic(() => import(...), { ssr: false })` to eliminate server-side reference errors and minimize TTI (Time to Interactive).
*   **React Portals**: The `NeuralLoader` is rendered into a portal at the `document.body` level to prevent blocking the hydration of the main component tree.

### 2. High-Frequency Interaction Loop (RAF)
*   **CSS Custom Properties**: Cursor positioning (`--cursor-x`, `--cursor-y`) and parallax effects are updated via a manual `requestAnimationFrame` loop in `usePortfolioEffects.js` rather than React State, eliminating expensive re-renders at 60Hz.
*   **Complete Cleanup**: Every event listener, `IntersectionObserver`, and `MutationObserver` is registered with a tracking registry and explicitly disconnected on component unmount, preventing memory leaks.

### 3. Visual Optimization
*   **Next.js Image (`next/image`)**: All assets are served through the Next.js optimization pipeline.
    *   **LCP Priority**: The Hero/About profile image uses `priority={true}` to maximize First Meaningful Paint.
    *   **Lazy Loading**: All project screenshots and tech icons are lazy-loaded with explicit dimensions.
*   **Hardware Acceleration**: Animated elements (Orbs, Particles, Grid) use `will-change: transform` and `translate3d` to force GPU compositing.

---

## 🛠️ Feature Deep-Dive

### 🧠 Neural Loader
*   **UX Pattern**: A non-blocking intro sequence that hydrates while playing.
*   **Animations**: Steps-based CSS keyframes for typing effects and "Reactor Ring" pulse.
*   **Hydration**: Automatically unmounts from the DOM after the exit animation to free memory.

### 🖱️ Custom Cursor System
*   **Mechanics**: A dual-layered cursor (Dot + Outline) with linearly interpolated (lerp) trailing.
*   **Reactive States**: Expands and changes color when hovering over interactive elements (buttons, links, image containers).
*   **Mobile Detection**: Automatically switches to native touch input on devices with `< 1024px` width.

### 🌊 Background Engine (The "Abyss")
*   **Grid Layer**: A CSS-based perspective grid with a moving scan-line effect.
*   **Floating Orbs**: Three high-blur floating depth-spheres with `reverse` animation cycles to avoid rhythmic repetition.
*   **Neural Grid**: A subtle particle layer providing micro-interaction depth.

### 🗺️ Panoramic Tech Stack
*   **Categorization**: Skills are split into Frontend, Backend, and Tool pillars.
*   **Interaction**: Each item features a "Tech Aura" hover effect that glows with the brand's primary color.
*   **Layout**: Panoramic horizontal scrolling on mobile with a custom swipe indicator.

### 🎭 Cinematic Lightbox
*   **Immersion**: A full-screen immersive overlay for project details.
*   **Media Support**: Dynamic switching between High-Res images and embedded auto-play YouTube/Video previews.
*   **Context System**: Displays project highlight tags (e.g., "Hackathon Winner") alongside the tech stack.

### 🌍 Multilingual Engine
*   **Assassination Observer**: A unique `MutationObserver` that actively removes Google Translate's intrusive UI banners while maintaining translation functionality.
*   **Synchronization**: Uses a shared `app_ui_lang` storage to synchronize the UI across sessions.

---

## 📂 Project Structure

```text
Portfolio/
├── app/
│   ├── components/
│   │   ├── Background.js          # Hardware-accelerated visuals
│   │   ├── CustomCursor.js        # High-frequency mouse loop
│   │   ├── NeuralLoader.js        # Portal-based intro
│   │   ├── PortfolioClient.js     # Memoized main assembly
│   │   ├── PortfolioSections.js   # Individual UI pillars
│   │   └── SmoothScroll.js        # Root Lenis engine
│   ├── hooks/
│   │   └── usePortfolioEffects.js # Central interaction bootstrap
│   ├── globals.css                # Design system & keyframes
│   └── layout.js                  # Root metadata & scripts
├── public/
│   └── images/                    # Optimized assets
└── next.config.mjs                # Image remote patterns
```

---

## 🏗️ Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/ryankeshary/portfolio.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
4.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 📜 License & Acknowledgments

*   **Engineering**: Ryan Keshary
*   **Optimization Framework**: AntiGravity AI
*   **Smooth Scroll**: [Lenis](https://github.com/studio-freight/lenis)
*   **Icons**: Font Awesome 6 + DevIcons

---

> [!TIP]
> This portfolio is best viewed in a Chromium-based browser with Hardware Acceleration enabled. For users with vestibular motion sensitivities, respects `prefers-reduced-motion` globally.
