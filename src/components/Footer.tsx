"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useGSAP(() => {
    // LAYER 1: Floating accents
    gsap.utils.toArray(".foot-float").forEach((f, i) => {
      gsap.to(f as Element, { y: `random(-40, 40)`, x: `random(-20, 20)`, rotation: `random(-15, 15)`, scale: `random(0.8, 1.3)`, duration: `random(5, 8)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i as number) * 0.6 });
    });

    // LAYER 2: Background gradient pulse
    gsap.to(".foot-bg-pulse", {
      opacity: 0.04,
      scale: 1.05,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // LAYER 3: Entrance timeline with sequential build
    const tl = gsap.timeline({ scrollTrigger: { trigger: footer.current, start: "top 80%" } });

    // Divider line draws
    tl.fromTo(".foot-divider", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut", transformOrigin: "left" }, 0);

    // Brand letters animate in one by one with 3D rotation
    tl.fromTo(".foot-brand-letter", { y: "120%", opacity: 0, rotateX: -70, skewY: 8 }, { y: "0%", opacity: 1, rotateX: 0, skewY: 0, stagger: 0.05, duration: 1, ease: "power3.out" }, 0.15);

    // Tagline fades up with blur resolve
    tl.fromTo(".foot-tagline", { y: 25, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }, 0.5);

    // Nav columns stagger in with 3D entrance
    tl.fromTo(".foot-col", { y: 50, opacity: 0, rotateX: 15 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 1, ease: "power3.out" }, 0.4);

    // Nav links stagger within each column
    gsap.utils.toArray(".foot-link").forEach((link) => {
      gsap.fromTo(link as Element, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: link as Element, start: "top 85%" } });
    });

    // Social icons pop in
    tl.fromTo(".foot-social", { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, stagger: 0.1, duration: 0.7, ease: "back.out(3)" }, 0.7);

    // Bottom bar fades up
    tl.fromTo(".foot-bottom", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.9);

    // LAYER 4: Hover effects on nav links
    gsap.utils.toArray(".foot-link").forEach((link) => {
      const el = link as HTMLElement;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { x: 8, duration: 0.4, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, duration: 0.4, ease: "power2.out" });
      });
    });

    // Social icon hover
    gsap.utils.toArray(".foot-social").forEach((icon) => {
      const el = icon as HTMLElement;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { scale: 1.15, duration: 0.4, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" });
      });
    });
  }, { scope: footer });

  return (
    <footer id="contact" ref={footer} className="relative bg-bg-2 overflow-hidden">
      {/* LAYER 0: Background pulse */}
      <div className="foot-bg-pulse absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, var(--color-accent-dim) 0%, transparent 60%)", opacity: 0, transform: "scale(1)" }} />

      {/* LAYER 1: Floating accents */}
      <div className="foot-float absolute top-[15%] right-[10%] w-16 h-16 rounded-full border border-accent/10 pointer-events-none" />
      <div className="foot-float absolute bottom-[20%] left-[8%] w-12 h-12 rounded-full bg-accent-dim pointer-events-none" />

      <div style={{ paddingTop: "clamp(6rem, 12vw, 12rem)" }}>
        <div className="wrap">
          {/* LAYER 3: Top divider */}
          <div className="foot-divider w-full h-[1px] bg-text-08 origin-left" style={{ marginBottom: "clamp(6rem, 12vw, 12rem)" }} />

          {/* Brand section */}
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(4rem, 8vw, 8rem)", marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
            <div className="lg:col-span-5">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text leading-tight" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
                {"RAW SELECT".split("").map((l, i) => (<span key={i} className="foot-brand-letter inline-block">{l === " " ? "\u00A0" : l}</span>))}
              </h2>
              <p className="foot-tagline t-body-lg text-text-30 max-w-sm">Curated materials for architects and designers who refuse to compromise.</p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(3rem, 6vw, 4rem)" }}>
              {/* Navigation */}
              <div className="foot-col">
                <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>Navigate</span>
                <div className="space-y-4">
                  {navLinks.map((link, i) => (
                    <a key={i} href={link.href} className="foot-link block text-text-50 hover:text-text transition-colors duration-300 text-sm">{link.label}</a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="foot-col">
                <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>Contact</span>
                <div className="space-y-4 text-sm text-text-50">
                  <p>hello@rawselect.com</p>
                  <p>+45 12 34 56 78</p>
                  <p>Copenhagen, Denmark</p>
                </div>
              </div>

              {/* Social */}
              <div className="foot-col">
                <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>Follow</span>
                <div className="space-y-4">
                  {["Instagram", "LinkedIn", "Pinterest"].map((s, i) => (
                    <a key={i} href="#" className="foot-link block text-text-50 hover:text-text transition-colors duration-300 text-sm">{s}</a>
                  ))}
                </div>
                <div className="flex items-center gap-3" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
                  <a href="#" className="foot-social w-9 h-9 rounded-full border border-text-08 flex items-center justify-center text-text-30 hover:text-accent hover:border-accent/30 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="foot-social w-9 h-9 rounded-full border border-text-08 flex items-center justify-center text-text-30 hover:text-accent hover:border-accent/30 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z"/></svg>
                  </a>
                  <a href="#" className="foot-social w-9 h-9 rounded-full border border-text-08 flex items-center justify-center text-text-30 hover:text-accent hover:border-accent/30 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3: Bottom bar */}
          <div className="foot-bottom flex flex-col md:flex-row justify-between items-center" style={{ paddingTop: "clamp(3rem, 6vw, 4rem)", borderTop: "1px solid var(--color-text-08)" }}>
            <div className="flex items-center" style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              {legalLinks.map((link, i) => (
                <a key={i} href={link.href} className="foot-link text-xs text-text-30 hover:text-text transition-colors duration-300">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="wrap" style={{ paddingTop: "clamp(1.5rem, 3vw, 2.5rem)", paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-30">&copy; {new Date().getFullYear()} Raw Select. All rights reserved.</p>
          <a href="#hero" className="t-label text-accent hover:text-text transition-colors duration-300 flex items-center gap-2">
            Back to top
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
