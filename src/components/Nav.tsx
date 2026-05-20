"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Collection", href: "#collection", id: "collection" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Projects", href: "#projects", id: "projects" },
];

const bottomNavItems = [
  { label: "Home", href: "#hero", icon: "home", id: "hero" },
  { label: "Collection", href: "#collection", icon: "collection", id: "collection" },
  { label: "Process", href: "#process", icon: "process", id: "process" },
  { label: "Projects", href: "#projects", icon: "projects", id: "projects" },
  { label: "Contact", href: "#contact", icon: "contact", id: "contact" },
];

function BottomNavIcon({ type, active }: { type: string; active: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    collection: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    process: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="22" />
        <circle cx="12" cy="6" r="2" fill="currentColor" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
    projects: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    contact: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  };
  return <span className={active ? "text-accent" : "text-text-50"}>{icons[type]}</span>;
}

export default function Nav({ loaded }: { loaded: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [bottomNavVisible, setBottomNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const sections = ["hero", "about", "collection", "process", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loaded]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 40);

          if (progressRef.current) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? currentY / docHeight : 0;
            progressRef.current.style.transform = `scaleX(${progress})`;
          }

          if (currentY > lastScrollY && currentY > 200) {
            setBottomNavVisible(false);
          } else {
            setBottomNavVisible(true);
          }
          setLastScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      const tl = gsap.timeline();
      tl.set(menuRef.current, { pointerEvents: "auto" });
      tl.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      tl.fromTo(menuRef.current.querySelector(".menu-top-half"), { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: "power4.inOut" }, 0);
      tl.fromTo(menuRef.current.querySelector(".menu-bottom-half"), { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "power4.inOut" }, 0);
      tl.fromTo(".menu-link", { clipPath: "inset(0 100% 0 0)", y: 60, opacity: 0, rotateX: -20 }, { clipPath: "inset(0 0% 0 0)", y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" }, 0.2);
      tl.fromTo(".menu-deco", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.inOut" }, 0.3);
      tl.fromTo(".menu-cta", { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0.45);
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { pointerEvents: "none", opacity: 0 });
          }
        }
      });
      tl.to(menuRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0);
      tl.to(".menu-cta", { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" }, 0);
      tl.to(".menu-link", { clipPath: "inset(0 0% 0 100%)", y: -30, opacity: 0, stagger: 0.04, duration: 0.4, ease: "power3.in" }, 0);
      tl.to(".menu-deco", { scaleX: 0, opacity: 0, stagger: 0.05, duration: 0.4, ease: "power2.in" }, 0);
      tl.to(menuRef.current.querySelector(".menu-top-half"), { yPercent: -100, duration: 0.5, ease: "power4.inOut" }, 0);
      tl.to(menuRef.current.querySelector(".menu-bottom-half"), { yPercent: 100, duration: 0.5, ease: "power4.inOut" }, 0);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (menuOpen) setMenuOpen(false);
  };

  const handleBottomNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="absolute top-0 left-0 right-0 z-50" style={{ height: "2px" }}>
          <div ref={progressRef} className="h-full origin-left" style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-bright) 100%)", boxShadow: "0 0 8px var(--color-accent-glow)" }} />
        </div>

        <div
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: scrolled ? 1 : 0,
            background: "rgba(250,248,245,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: scrolled ? "1px solid rgba(26,26,26,0.06)" : "1px solid transparent",
          }}
        />

        <div className="wrap relative z-10 flex items-center justify-between" style={{ paddingTop: scrolled ? "clamp(0.75rem, 2vw, 1rem)" : "clamp(1.25rem, 3vw, 1.75rem)", paddingBottom: scrolled ? "clamp(0.75rem, 2vw, 1rem)" : "clamp(1.25rem, 3vw, 1.75rem)" }}>
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="group flex items-center gap-2" style={{ minHeight: "44px", alignItems: "center" }}>
            <span className="font-serif text-xl tracking-tight text-text transition-colors duration-300 group-hover:text-accent">
              raw<span className="text-accent group-hover:text-text transition-colors duration-300">.</span>
            </span>
            <span className="hidden sm:inline-block t-label text-text-30 group-hover:text-text transition-colors duration-300">select</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`relative text-sm font-medium transition-colors duration-400 group ${activeSection === l.id ? "text-text" : "text-text-50 hover:text-text"}`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-1/2 h-[1px] bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSection === l.id ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"}`} />
              </a>
            ))}
          </nav>

          <a
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-text transition-colors duration-400 group"
          >
            <span>Get in touch</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-accent/30 group-hover:border-text/30 transition-colors duration-400">
              <svg className="w-3 h-3 transition-transform duration-400 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(5);
              setMenuOpen(!menuOpen);
            }}
            className="md:hidden relative z-50 w-11 h-11 flex items-center justify-center tap-active"
            aria-label="Menu"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 w-full h-[1.5px] bg-text transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${menuOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 w-full h-[1.5px] bg-text transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${menuOpen ? "top-2 opacity-0 scale-0" : "top-2 opacity-100 scale-100"}`} />
              <span className={`absolute left-0 w-full h-[1.5px] bg-text transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${menuOpen ? "top-2 -rotate-45" : "top-3.5"}`} />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 md:hidden flex flex-col`}
        style={{ pointerEvents: "none", opacity: 0, background: "var(--color-bg)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, var(--color-accent-dim) 0%, var(--color-bg) 70%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: "multiply" }} />
          <div className="menu-top-half absolute inset-0 top-0 h-1/2" style={{ background: "var(--color-bg)" }} />
          <div className="menu-bottom-half absolute inset-0 bottom-0 h-1/2" style={{ background: "var(--color-bg)" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="menu-deco absolute top-[20%] right-[15%] w-20 h-20 rounded-full border border-accent/10 origin-center" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="menu-deco absolute bottom-[25%] left-[10%] w-14 h-14 rounded-full bg-accent/5 origin-center" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="menu-deco absolute top-[45%] left-[20%] w-2 h-2 rounded-full bg-accent/30" style={{ transform: "scaleX(0)", opacity: 0 }} />
        </div>

        <div className="relative z-10 flex flex-col h-full px-8" style={{ paddingTop: "clamp(8rem, 15vw, 10rem)" }}>
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-2" style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              {links.map((l, i) => (
                <a
                  key={l.label}
                  ref={(el) => { menuItemsRef.current[i] = el; }}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="menu-link block font-serif text-4xl text-text-50 hover:text-text transition-colors duration-300 py-3 relative"
                  style={{ perspective: "800px" }}
                >
                  <span className={`inline-block w-2 h-2 rounded-full bg-accent mr-3 transition-transform duration-300 ${activeSection === l.id ? "scale-125" : "scale-0"}`} />
                  {l.label}
                </a>
              ))}
            </div>

            <div className="menu-deco w-full h-[1px] bg-text-08 origin-left" style={{ transform: "scaleX(0)", opacity: 0, marginBottom: "clamp(2rem, 4vw, 3rem)" }} />

            <a
              href="/contact"
              className="menu-cta inline-flex items-center gap-3 text-lg font-medium text-accent tap-active"
              style={{ padding: "clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)", borderRadius: "9999px", border: "1px solid var(--color-accent/30)", width: "fit-content" }}
            >
              <span>Get in touch</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="pb-8">
            <p className="t-label text-text-30">Best viewed on desktop</p>
          </div>
        </div>
      </div>

      <div
        ref={bottomNavRef}
        className="bottom-nav fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: bottomNavVisible ? "translateY(0)" : "translateY(100%)",
          background: "rgba(250,248,245,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(26,26,26,0.04)",
        }}
      >
        <nav className="flex items-center justify-around px-2" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
          {bottomNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleBottomNavClick(e, item.href)}
                className="flex flex-col items-center gap-1 tap-active relative"
                style={{ padding: "0.4rem 0.6rem", minWidth: "44px", minHeight: "44px", justifyContent: "center" }}
                onTouchStart={() => {
                  if (navigator.vibrate) navigator.vibrate(5);
                }}
              >
                <BottomNavIcon type={item.icon} active={isActive} />
                <span className="text-[0.6rem] tracking-wide" style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-50)" }}>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent rounded-full" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
