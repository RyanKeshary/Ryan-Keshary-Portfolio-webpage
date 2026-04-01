"use client";

import { useEffect, useRef } from "react";
import { achievementData } from "@/app/data/achievements";
import { projectData } from "@/app/data/projects";
import { languages } from "@/app/data/languages";

/**
 * usePortfolioEffects - High-performance interactive bootstrap.
 * 
 * Audit Findings Fixes:
 * 1. Rule 3: All browser API calls moved into useEffect.
 * 2. Rule 7: Complete cleanup of all Intervals, Listeners, and Observers.
 */
export default function usePortfolioEffects() {
  const rafId = useRef(null);

  useEffect(() => {
    // --- Performance State ---
    let isLowEnd = false;
    const isMobile = window.innerWidth <= 768;
    const cleanups = [];
    const observers = [];

    // --- Helper: Register Listener with Cleanup ---
    const listen = (target, type, cb, options) => {
      if (!target) return;
      target.addEventListener(type, cb, options);
      cleanups.push(() => target.removeEventListener(type, cb));
    };

    // --- Helper: Register Observer with Cleanup ---
    const observe = (obs) => {
      observers.push(obs);
      return obs;
    };

    // --- Performance Check ---
    const cores = navigator.hardwareConcurrency || 4;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (cores < 2 || (connection && (connection.saveData || connection.effectiveType?.includes("2g")))) {
      isLowEnd = true;
      document.body.classList.add("reduced-animations");
    }

    // --- Theme Management ---
    const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      const themeIcon = document.querySelector(".theme-toggle i");
      if (themeIcon) themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    };
    applyTheme(systemQuery.matches ? "dark" : "light");
    listen(systemQuery, "change", (e) => {
      const t = e.matches ? "dark" : "light";
      applyTheme(t);
      localStorage.setItem("theme", t);
    });

    const toggleTheme = () => {
      const html = document.documentElement;
      const cur = html.getAttribute("data-theme");
      const next = cur === "light" ? "dark" : "light";
      const apply = () => {
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        const icon = document.querySelector(".theme-toggle i");
        if (icon) {
          icon.style.transform = "scale(0) rotate(180deg)";
          setTimeout(() => {
            icon.className = next === "light" ? "fas fa-moon" : "fas fa-sun";
            icon.style.transform = "scale(1) rotate(0deg)";
          }, 150);
        }
      };
      if (document.startViewTransition) document.startViewTransition(apply);
      else {
        document.body.classList.add("theme-transitioning");
        apply();
        setTimeout(() => document.body.classList.remove("theme-transitioning"), 600);
      }
    };
    listen(document.querySelector(".theme-toggle"), "click", toggleTheme);

    // --- Navigation & Menu ---
    const toggleMenu = () => {
      document.querySelector(".nav-links")?.classList.toggle("active");
      document.querySelector(".hamburger")?.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    };
    listen(document.querySelector(".hamburger"), "click", toggleMenu);

    listen(document, "click", (e) => {
      const nav = document.querySelector(".main-nav");
      const navLinks = document.querySelector(".nav-links");
      if (nav && !nav.contains(e.target) && navLinks?.classList.contains("active")) {
        navLinks.classList.remove("active");
        document.querySelector(".hamburger")?.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });

    // --- Smooth Scrolling Anchors ---
    const anchors = document.querySelectorAll('a[href^="#"]:not(.btn-modal-action)');
    anchors.forEach((anchor) => {
      listen(anchor, "click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (!target) return;
        if (window.lenis) {
          window.lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        } else {
          const pos = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: pos, behavior: isLowEnd ? "auto" : "smooth" });
        }
        document.querySelector(".nav-links")?.classList.remove("active");
        document.querySelector(".hamburger")?.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // --- Typing & Scramble Effects ---
    const typeText = (el, text, speed = 100) => {
      let i = 0;
      el.textContent = "";
      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          const t = setTimeout(type, speed);
          cleanups.push(() => clearTimeout(t));
        } else {
          el.classList.add("typing-cursor");
          const t = setTimeout(() => el.classList.remove("typing-cursor"), 2000);
          cleanups.push(() => clearTimeout(t));
        }
      };
      type();
    };

    const scrambleText = (el) => {
      const chars = "!<>-_\\/[]{}—=+*^?#________";
      const original = el.innerText;
      let iter = 0;
      const interval = setInterval(() => {
        el.innerText = original.split("").map((c, i) => (i < iter ? original[i] : chars[Math.floor(Math.random() * chars.length)])).join("");
        if (iter >= original.length) clearInterval(interval);
        iter += 1 / 3;
      }, 30);
      cleanups.push(() => clearInterval(interval));
    };

    // --- Intersection Observers ---
    const revealObs = observe(new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("active"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    ));
    document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

    const navObs = observe(new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            document.querySelectorAll(".nav-links a").forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" }
    ));
    document.querySelectorAll("section[id]").forEach((s) => navObs.observe(s));

    const scrambleObs = observe(new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
          scrambleText(entry.target);
          entry.target.dataset.scrambled = "true";
        }
      }),
      { threshold: 0.5 }
    ));
    document.querySelectorAll(".section-title.reveal").forEach((t) => scrambleObs.observe(t));

    // --- Hero Intro ---
    const initHero = () => {
      const typingEl = document.querySelector(".typing-text");
      const sub = document.querySelector(".hero-subtitle");
      const desc = document.querySelector(".hero-description");
      const cta = document.querySelector(".cta-button");
      if (isLowEnd) {
        if (typingEl) typingEl.textContent = "hi, ryan here";
        [sub, desc, cta].forEach((el) => { if (el) { el.style.opacity = 1; el.style.transform = "none"; } });
        return;
      }
      if (typingEl) setTimeout(() => typeText(typingEl, "hi, ryan here", 80), 400);
      if (sub) {
        sub.style.opacity = "0";
        sub.style.transform = "translateY(20px)";
        setTimeout(() => {
          sub.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
          sub.style.opacity = "1";
          sub.style.transform = "translateY(0)";
        }, 100);
      }
      if (desc) {
        desc.style.opacity = "0";
        desc.style.transform = "translateY(20px)";
        setTimeout(() => {
          desc.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
          desc.style.opacity = "1";
          desc.style.transform = "translateY(0)";
        }, 1600);
      }
      if (cta) {
        cta.style.opacity = "0";
        cta.style.transform = "translateY(20px)";
        setTimeout(() => {
          cta.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
          cta.style.opacity = "1";
          cta.style.transform = "translateY(0)";
        }, 2000);
      }
    };
    initHero();

    // --- Parallax & Scroll Handler ---
    const heroContent = document.querySelector(".hero-content");
    const particles = document.getElementById("particles");
    let ticking = false;
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight && !isMobile) {
        if (heroContent) {
          heroContent.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
          heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
        }
        if (particles) particles.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      const bar = document.getElementById("scrollProgress");
      if (bar) {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = (window.pageYOffset / height) * 100 + "%";
      }
      const nav = document.querySelector(".main-nav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
      document.body.style.setProperty("--scroll-y", window.scrollY);
      const btt = document.getElementById("backToTop");
      if (btt) btt.classList.toggle("active", window.scrollY > 500);
      if (!ticking) {
        rafId.current = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    listen(window, "scroll", handleScroll, { passive: true });

    // --- Interactives ---
    listen(document.getElementById("backToTop"), "click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Mouse Parallax
    const hs = document.querySelector(".hero-section");
    listen(hs, "mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (heroContent) {
        const mx = (x - 0.5) * 30;
        const my = (y - 0.5) * 30;
        heroContent.style.transform = `perspective(1200px) rotateY(${mx * 0.4}deg) rotateX(${-my * 0.4}deg) translateZ(20px)`;
      }
      hs.style.setProperty("--m-x", x);
      hs.style.setProperty("--m-y", y);
    });
    listen(hs, "mouseleave", () => {
      if (heroContent) heroContent.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    });

    // Magnetic Buttons
    if (!isLowEnd) {
      document.querySelectorAll(".cta-button, .social-link, .nav-link, .btn-read-more-v7, .btn-modal-action").forEach((btn) => {
        listen(btn, "mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        listen(btn, "mouseleave", () => { btn.style.transform = "translate(0, 0)"; });
      });
    }

    // Touch Ripple
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      listen(window, "touchstart", (e) => {
        const t = e.touches[0];
        const r = document.createElement("div");
        r.className = "touch-ripple";
        r.style.left = `${t.clientX}px`;
        r.style.top = `${t.clientY}px`;
        document.body.appendChild(r);
        setTimeout(() => r.remove(), 600);
      }, { passive: true });
    }

    // Odyssey Tilt
    document.querySelectorAll(".odyssey-card").forEach((card) => {
      listen(card, "mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const rx = (rect.height / 2 - (e.clientY - rect.top)) / 20;
        const ry = (e.clientX - rect.left - rect.width / 2) / 20;
        card.style.transform = `perspective(2000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(50px)`;
        card.querySelector(".card-scanline") && (card.querySelector(".card-scanline").style.opacity = "0.6");
      });
      listen(card, "mouseleave", () => {
        card.style.transform = "perspective(2000px) rotateX(0) rotateY(0) translateZ(0)";
        card.querySelector(".card-scanline") && (card.querySelector(".card-scanline").style.opacity = "0.3");
      });
    });

    // Confetti
    const createConfetti = (x, y) => {
      const colors = ["#ffd700", "#ffffff", "#ff0055", "#4361ee", "#4cc9f0"];
      for (let i = 0; i < 30; i++) {
        const c = document.createElement("div");
        c.className = "confetti-particle";
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.left = `${x}px`;
        c.style.top = `${y}px`;
        document.body.appendChild(c);
        let px = x, py = y, vx = (Math.random() - 0.5) * 10, vy = (Math.random() - 0.5) * 10, op = 1;
        const anim = () => {
          vy += 0.2; px += vx; py += vy; op -= 0.02;
          c.style.left = `${px}px`; c.style.top = `${py}px`; c.style.opacity = op;
          if (op > 0) requestAnimationFrame(anim); else c.remove();
        };
        requestAnimationFrame(anim);
      }
    };
    listen(document.body, "click", (e) => {
      const btn = e.target.closest(".btn-view-cert");
      if (btn) {
        const rect = btn.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });

    // About Video
    const ac = document.getElementById("aboutImageContainer");
    const av = document.getElementById("aboutVideo");
    const ct = document.querySelector(".click-tease");
    if (ac && av) {
      listen(ac, "click", () => {
        if (!ac.classList.contains("video-active")) {
          ac.classList.add("video-active");
          av.play();
          ct?.classList.remove("tease-visible");
        } else {
          ac.classList.remove("video-active");
          setTimeout(() => { av.pause(); av.currentTime = 0; }, 600);
        }
      });
      const tObs = observe(new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting && isMobile && ct) ct.classList.add("tease-visible"); });
      }, { threshold: 0.6 }));
      tObs.observe(ac);
    }

    // Achievement Modal
    const openAchievement = (id) => {
      const m = document.getElementById("achievementModal");
      const d = achievementData[id];
      if (!d || !m) return;
      m.querySelector(".modal-icon").textContent = d.icon;
      m.querySelector(".modal-date").textContent = d.date;
      m.querySelector(".modal-title").textContent = d.title;
      m.querySelector(".modal-body").innerHTML = d.content;
      m.classList.add("active");
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    };
    const closeAchievement = () => {
      document.getElementById("achievementModal")?.classList.remove("active");
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
    window.openAchievementModal = openAchievement;
    window.closeAchievementModal = closeAchievement;
    listen(document.getElementById("achievementModal"), "click", (e) => { if (e.target.id === "achievementModal") closeAchievement(); });

    // Project Cinematic Lighbox
    const openProject = (id) => {
      const o = document.getElementById("cinematicOverlay");
      const d = projectData[id];
      if (!d || !o) return;
      o.className = `immersive-overlay active ${d.theme ? `${d.theme}-theme` : ""}`;
      document.getElementById("modalVisualImage").src = d.image;
      document.getElementById("modalVisualTitle").textContent = d.title;
      document.getElementById("modalVisualBody").innerHTML = d.description;
      const vc = document.getElementById("modalVideoContainer");
      if (d.videoId) {
        vc.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${d.videoId}?autoplay=1&mute=1&loop=1&playlist=${d.videoId}" style="pointer-events:none;" allow="autoplay"></iframe>`;
        vc.style.display = "block";
      } else vc.style.display = "none";
      document.getElementById("modalVisualDemo").href = d.demoLink;
      document.getElementById("modalVisualCode").href = d.codeLink;
      const tc = document.getElementById("modalVisualTags");
      tc.innerHTML = `<span class="mini-tag context-highlight">${d.context}</span>` + d.tags.map(t => `<span class="mini-tag">${t}</span>`).join("");
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    };
    const closeProject = () => {
      const o = document.getElementById("cinematicOverlay");
      if (o) {
        o.classList.remove("active");
        document.getElementById("modalVideoContainer").innerHTML = "";
        document.body.style.overflow = "";
        if (window.lenis) window.lenis.start();
      }
    };
    window.openCinematicModal = openProject;
    window.closeCinematicModal = closeProject;
    listen(document.getElementById("cinematicOverlay"), "click", (e) => { if (e.target.id === "cinematicOverlay") closeProject(); });

    // Global Escape Handler
    listen(document, "keydown", (e) => {
      if (e.key === "Escape") {
        closeAchievement();
        closeProject();
        document.getElementById("mediaViewer")?.classList.remove("active");
        document.querySelector(".nav-links")?.classList.remove("active");
        document.querySelector(".hamburger")?.classList.remove("active");
      }
    });

    // --- Language & Google Translate ---
    const initLang = () => {
      let current = localStorage.getItem("app_ui_lang") || "en";
      const setGoogleCookie = (code) => {
        const d = window.location.hostname;
        document.cookie = `googtrans=/en/${code}; path=/;`;
        document.cookie = `googtrans=/en/${code}; path=/; domain=.${d};`;
      };
      
      const selectLang = (code) => {
        localStorage.setItem("app_ui_lang", code);
        setGoogleCookie(code);
        window.location.reload();
      };

      const grid = document.getElementById("langGrid");
      if (grid) {
        grid.innerHTML = languages.map(l => `<div class="lang-card ${l.code === current ? "active" : ""}" data-code="${l.code}">${l.native}</div>`).join("");
        listen(grid, "click", (e) => {
          const card = e.target.closest(".lang-card");
          if (card) selectLang(card.dataset.code);
        });
      }

      listen(document.getElementById("langFab"), "click", () => {
        document.getElementById("langModal")?.classList.add("active");
        document.getElementById("langOverlay")?.classList.add("active");
        if (window.lenis) window.lenis.stop();
      });
      listen(document.getElementById("langClose"), "click", () => {
        document.getElementById("langModal")?.classList.remove("active");
        document.getElementById("langOverlay")?.classList.remove("active");
        if (window.lenis) window.lenis.start();
      });

      // Google Translate Assassination Observer
      const killGoogle = () => {
        document.querySelectorAll(".goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame").forEach(el => el.remove());
        document.body.style.top = "0px";
      };
      const obs = observe(new MutationObserver(killGoogle));
      obs.observe(document.body, { childList: true, subtree: true });
    };
    initLang();

    // --- Cleanup ---
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      cleanups.forEach(fn => fn());
      observers.forEach(obs => obs.disconnect());
    };
  }, []);
}
