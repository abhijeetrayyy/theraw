"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Collection", href: "#collection", id: "collection" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Projects", href: "#projects", id: "projects" },
];

export default function Nav({ loaded }: { loaded: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update scroll progress
      if (progressRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      // Determine active section
      const sections = ["hero", "about", "collection", "process", "projects", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(".menu-link", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" }, 0.1);
      tl.fromTo(".menu-deco", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);
      tl.fromTo(".menu-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.4);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!loaded || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 2.4 }
    );
  }, [loaded]);

  return (
    <>
      <header
        ref={navRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-50">
          <div ref={progressRef} className="h-full bg-accent origin-left" style={{ transform: "scaleX(0)" }} />
        </div>

        {/* Background */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: scrolled ? 1 : 0,
            background: "rgba(250,248,245,0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: scrolled ? "1px solid rgba(26,26,26,0.06)" : "1px solid transparent",
          }}
        />

        <div className="wrap relative z-10 flex items-center justify-between" style={{ paddingTop: scrolled ? "clamp(0.75rem, 2vw, 1rem)" : "clamp(1.25rem, 3vw, 1.75rem)", paddingBottom: scrolled ? "clamp(0.75rem, 2vw, 1rem)" : "clamp(1.25rem, 3vw, 1.75rem)" }}>
          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-2">
            <span className="font-serif text-xl tracking-tight text-text transition-colors duration-300">
              raw<span className="text-accent">.</span>
            </span>
            <span className="hidden sm:inline-block t-label text-text-30 group-hover:text-text transition-colors duration-300">select</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`relative text-sm font-medium transition-colors duration-400 group ${activeSection === l.id ? "text-text" : "text-text-50 hover:text-text"}`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-1/2 h-[1px] bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSection === l.id ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"}`} />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-text transition-colors duration-400 group"
          >
            <span>Get in touch</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-accent/30 group-hover:border-text/30 transition-colors duration-400">
              <svg className="w-3 h-3 transition-transform duration-400 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 w-full h-[1px] bg-text transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 w-full h-[1px] bg-text transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "top-2 -rotate-45" : "top-2"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-bg md:hidden flex flex-col justify-center transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="menu-deco absolute top-[15%] right-[10%] w-24 h-24 rounded-full border border-accent/10 origin-center" style={{ transform: "scaleX(0)" }} />
          <div className="menu-deco absolute bottom-[20%] left-[8%] w-16 h-16 rounded-full bg-accent/5 origin-center" style={{ transform: "scaleX(0)" }} />
        </div>

        <div className="wrap relative z-10">
          {/* Menu links */}
          <div className="space-y-1" style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="menu-link block font-serif text-4xl text-text-50 hover:text-text transition-colors duration-300 py-3"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Decorative line */}
          <div className="menu-deco w-full h-[1px] bg-text-08 origin-left" style={{ transform: "scaleX(0)", marginBottom: "clamp(2rem, 4vw, 3rem)" }} />

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="menu-cta inline-flex items-center gap-3 text-lg font-medium text-accent"
          >
            <span>Get in touch</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
